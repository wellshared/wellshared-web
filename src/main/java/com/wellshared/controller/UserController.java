package com.wellshared.controller;

import java.security.Principal;
import java.util.Base64;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wellshared.model.User;
import com.wellshared.repository.UserRepository;

@RestController
@CrossOrigin
public class UserController {
 
	@Autowired
	private UserRepository userRepository;
	
	
    @RequestMapping("/login")
    public boolean login(@RequestBody User user) {
        return
          user.getUsername().equals("user") && user.getPassword().equals("password");
    }
    @GetMapping("/user/session")
    public ResponseEntity<Object> getConnectedUser() {
    	if("ROLE_ANONYMOUS".equals(SecurityContextHolder.getContext().getAuthentication().getAuthorities().toArray()[0].toString())) {
    		return new ResponseEntity<Object>(null, HttpStatus.OK);	
    	}
    	return new ResponseEntity<Object>(SecurityContextHolder.getContext().getAuthentication(), HttpStatus.OK);
    }
    
    @RequestMapping("/user/add")
    public void add(@RequestBody User user) {
    	BCryptPasswordEncoder crypt = new BCryptPasswordEncoder();
    	user.setPassword(crypt.encode(user.getPassword()));
    	userRepository.save(user);
    }
     
    @RequestMapping("/user")
    public Principal user(HttpServletRequest request) {
        String authToken = request.getHeader("Authorization")
          .substring("Basic".length()).trim();
        return () ->  new String(Base64.getDecoder()
          .decode(authToken)).split(":")[0];
    }
}