package com.wellshared.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring4.SpringTemplateEngine;

import com.wellshared.mailer.Mail;
import com.wellshared.mailer.RentDto;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@Controller
@RequestMapping("api/mailer")
public class MailerController {
	@Autowired
	private JavaMailSender emailSender;

	@Autowired
	private SpringTemplateEngine templateEngine;

	@RequestMapping(path = "/booking", method = RequestMethod.POST)
	public @ResponseBody String book() {
		return "Welcome to Spring Boot Server!";
	}

	@RequestMapping(path = "/rent", method = RequestMethod.POST)
	public @ResponseBody String rent(RentDto rentData) {
		Context context = new Context();
		context.getVariables().put("center", rentData.getCenterId());
		context.getVariables().put("name", rentData.getName());
		context.getVariables().put("phone", rentData.getPhone());
		context.getVariables().put("email", rentData.getEmail());
		context.getVariables().put("message", rentData.getMessage());
		Mail mail = new Mail("Wellshared <info@wellshared.es>", "gorteganel@gmail.com", "Reserva Wellshared", "Content prueba");
		this.prepareAndSend(mail, context);
		return "Welcome to Spring Boot Server!";
	}

	@RequestMapping(path = "/contact", method = RequestMethod.POST)
	public @ResponseBody String contact() {
		return "Welcome to Spring Boot Server!";
	}

	public void prepareAndSend(Mail mail, Context context) {
		try {
			MimeMessage message = emailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
					StandardCharsets.UTF_8.name());
			String html = templateEngine.process("rent", context);
			helper.setTo(mail.getTo());
			helper.setFrom(mail.getFrom());
			helper.setText(html, true);
			helper.setSubject(mail.getSubject());
			helper.setFrom(mail.getFrom());
			emailSender.send(message);
		} catch (MailException mailEx) {
			System.out.print(mailEx.getMessage());
		} catch(MessagingException mesEx) {
			System.out.print(mesEx.getMessage());
		} catch (Exception e) {
			System.out.print(e.getMessage());
		}
		
 
	}
}
