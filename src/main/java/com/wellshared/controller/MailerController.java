package com.wellshared.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.thymeleaf.context.Context;

import com.wellshared.mailer.ContactDto;
import com.wellshared.mailer.Mail;
import com.wellshared.mailer.RentDto;
import com.wellshared.service.MailerService;

@Controller
@RequestMapping("api/mailer")
public class MailerController {	
	
	@Autowired
	private MailerService mailerService;


	@RequestMapping(path = "/rent", method = RequestMethod.POST)
	public ResponseEntity<Object> rent(@RequestBody RentDto rentData) {
		Context context = new Context();
		context.getVariables().put("center", rentData.getCenter());
		context.getVariables().put("name", rentData.getName());
		context.getVariables().put("phone", rentData.getPhone());
		context.getVariables().put("email", rentData.getEmail());
		context.getVariables().put("message", rentData.getMessage());
		Mail mail = new Mail("info@wellshared.es", "info@wellshared.es", "Petición alquiler de sala Wellshared", "");
		mailerService.prepareAndSend(mail, context, "rent");
		return ResponseEntity.ok("Correo enviado correctamente");
	}

	@RequestMapping(path = "/contact", method = RequestMethod.POST)
	public ResponseEntity<Object> contact(@RequestBody ContactDto contactData) {
		Context context = new Context();
		context.getVariables().put("name", contactData.getName());
		context.getVariables().put("phone", contactData.getPhone());
		context.getVariables().put("email", contactData.getEmail());
		context.getVariables().put("message", contactData.getMessage());
		Mail mail = new Mail("info@wellshared.es", "info@wellshared.es", "Contacto Wellshared", "");
		mailerService.prepareAndSend(mail, context, "contact");
		return ResponseEntity.ok("Correo enviado correctamente");
	}

}
