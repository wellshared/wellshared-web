package com.wellshared.config;

import java.util.ArrayList;
import java.util.Arrays;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import groovyjarjarantlr.collections.List;

@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	Environment env;

	@Autowired
	DataSource datasource;

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.jdbcAuthentication().dataSource(this.datasource)
				.usersByUsernameQuery("select username, password, enabled from user where username = ? ")
				.passwordEncoder(new BCryptPasswordEncoder());
	}
	
	@Override
	public void configure(WebSecurity web) throws Exception {
//		web.addFilterAfter(
//	             new SecurityConfig(){
//	            	 
//	             }, BasicAuthenticationFilter.class);
		web
			.ignoring()
			.antMatchers("/")
			.antMatchers("/assets/**/*")
			.antMatchers("/*.{js,html,ico,js.map}");
	}

	protected void configure(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable().authorizeRequests()
		.antMatchers("/").permitAll()
		.antMatchers("/api/mailer/**").permitAll()
		.antMatchers("/api/book/center/{id}").permitAll()
		.antMatchers("/user/session").permitAll()
		.antMatchers("/api/center/").permitAll()
		.antMatchers("/api/center/img/{id}").permitAll()
		.antMatchers("/api/center/location/{locationId}").permitAll()
		.antMatchers("/api/center/{id}").permitAll()
        .anyRequest().authenticated().and()
        .formLogin()
        .successHandler((req,resp,exp) -> resp.setStatus(HttpStatus.OK.value()))
        .failureHandler((req,resp,exp) -> resp.setStatus(HttpStatus.UNAUTHORIZED.value()))
        .permitAll()
        .and()
        .exceptionHandling()
        	.accessDeniedHandler((req,resp,exp) -> resp.setStatus(HttpStatus.UNAUTHORIZED.value()))
        	.authenticationEntryPoint((req,resp,exp) -> resp.setStatus(HttpStatus.UNAUTHORIZED.value()))
        .and()
        .logout()
        .deleteCookies("JSESSIONID")
        .logoutSuccessHandler((req,resp,exp) -> resp.setStatus(HttpStatus.OK.value()))
        .logoutSuccessUrl("/")
        .and()
        .sessionManagement()
        	.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
        .and()
        .httpBasic();

	}

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		ArrayList<String> corsOrigin = new ArrayList<String>();
		corsOrigin.add("https://www.wellshared.es");
		corsOrigin.add("http://www.wellshared.es");
		corsOrigin.add("www.wellshared.es");
		corsOrigin.add("wellshared.es");
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(corsOrigin);
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "OPTIONS", "DELETE"));
		configuration.setAllowedHeaders(Arrays.asList("*"));
		configuration.setAllowCredentials(true);
		configuration.addExposedHeader("Content-Disposition");
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
}