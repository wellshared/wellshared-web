package com.wellshared.controller;

import java.nio.charset.StandardCharsets;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring4.SpringTemplateEngine;

import com.wellshared.mailer.BookDto;
import com.wellshared.mailer.ContactDto;
import com.wellshared.mailer.Mail;
import com.wellshared.mailer.RentDto;
import com.wellshared.model.Center;
import com.wellshared.repository.CenterRepository;

@Controller
@RequestMapping("api/mailer")
public class MailerController {
	@Autowired
	private JavaMailSender emailSender;

	@Autowired
	private SpringTemplateEngine templateEngine;
	
	@Autowired
	private CenterRepository centerRepository;

	@RequestMapping(path = "/booking", method = RequestMethod.POST)
	public ResponseEntity<Object> book(@RequestBody BookDto bookData) {
		Context context = new Context();
		Center center = centerRepository.findById(bookData.getCenterId()).get();
		context.getVariables().put("center", center.getName());
		context.getVariables().put("adress", center.getAdress());
		context.getVariables().put("name", bookData.getName());
		context.getVariables().put("sname", bookData.getSname());
		context.getVariables().put("phone", bookData.getPhone());
		context.getVariables().put("number", bookData.getNumber());
		context.getVariables().put("email", bookData.getEmail());
		context.getVariables().put("date", bookData.getDate());
		context.getVariables().put("timeFrom", bookData.getTimeFrom());
		context.getVariables().put("timeTo", bookData.getTimeTo());
		Mail mail = new Mail("Wellshared <info@wellshared.es>", "gorteganel@gmail.com", "Reserva Wellshared", "");
		this.prepareAndSend(mail, context, "book");
		mail = new Mail("Wellshared <info@wellshared.es>", "gorteganel@gmail.com", "Peticion reserva Wellshared", "");
		this.prepareAndSend(mail, context, "book-ws");
		return ResponseEntity.ok("Correo enviado correctamente");
	}

	@RequestMapping(path = "/rent", method = RequestMethod.POST)
	public ResponseEntity<Object> rent(@RequestBody RentDto rentData) {
		Context context = new Context();
		context.getVariables().put("center", rentData.getCenter());
		context.getVariables().put("name", rentData.getName());
		context.getVariables().put("phone", rentData.getPhone());
		context.getVariables().put("email", rentData.getEmail());
		context.getVariables().put("message", rentData.getMessage());
		Mail mail = new Mail("Wellshared <info@wellshared.es>", "gorteganel@gmail.com", "Peticón alquiler de sala Wellshared", "");
		this.prepareAndSend(mail, context, "rent");
		return ResponseEntity.ok("Correo enviado correctamente");
	}

	@RequestMapping(path = "/contact", method = RequestMethod.POST)
	public ResponseEntity<Object> contact(@RequestBody ContactDto contactData) {
		Context context = new Context();
		context.getVariables().put("name", contactData.getName());
		context.getVariables().put("phone", contactData.getPhone());
		context.getVariables().put("email", contactData.getEmail());
		context.getVariables().put("message", contactData.getMessage());
		Mail mail = new Mail("Wellshared <info@wellshared.es>", "gorteganel@gmail.com", "Contacto Wellshared", "");
		this.prepareAndSend(mail, context, "contact");
		return ResponseEntity.ok("Correo enviado correctamente");
	}

	public void prepareAndSend(Mail mail, Context context, String template) {
		try {
			MimeMessage message = emailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
					StandardCharsets.UTF_8.name());
			String html = templateEngine.process(template, context);
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
