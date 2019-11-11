package com.wellshared.controller;

import java.nio.charset.StandardCharsets;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Optional;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
import com.wellshared.model.Book;
import com.wellshared.model.Center;
import com.wellshared.model.Collegiate;
import com.wellshared.model.Image;
import com.wellshared.repository.BookRepository;
import com.wellshared.repository.BookStatusRepository;
import com.wellshared.repository.CenterRepository;
import com.wellshared.repository.CollegiateRepository;

import groovyjarjarcommonscli.ParseException;

@Controller
@RequestMapping("api/mailer")
public class MailerController {
	@Autowired
	private JavaMailSender emailSender;

	@Autowired
	private SpringTemplateEngine templateEngine;
	
	@Autowired
	private CenterRepository centerRepository;
	
	@Autowired
	private BookRepository bookRepository;

	@Autowired
	private CollegiateRepository collegiateRepository;
	
	@Autowired
	private BookStatusRepository bookStatusRepository;
	
	@RequestMapping(path = "/booking", method = RequestMethod.POST)
	public ResponseEntity<Object> book(@RequestBody BookDto bookData) {
		Context context = new Context();
		Center center = centerRepository.findById(bookData.getCenterId()).get();
		Optional<Collegiate> col = collegiateRepository.findByNumber(bookData.getNumber());
		try {
			DateFormat sourceFormat = new SimpleDateFormat("dd-MM-yyyy");
			Date date = sourceFormat.parse(bookData.getDate());
			Calendar cal = Calendar.getInstance();
			cal.setTime(date);	
			if(cal.get(Calendar.DAY_OF_WEEK)== 1) {
				return new ResponseEntity<Object>("No es posible hacer reservas para el día indicado", null, HttpStatus.NOT_ACCEPTABLE);	
			}
		}catch (Exception e) {
			return new ResponseEntity<Object>("El formato de fecha enviado no es válido", null, HttpStatus.NOT_ACCEPTABLE);
		}
		
		if(bookData.getTimeFrom().equals(bookData.getTimeTo())) {
			return new ResponseEntity<Object>("La hora de inicio y de fin no pueden coincidir", null, HttpStatus.NOT_ACCEPTABLE);
		
		}
		if(bookData.getTimeFrom().equals(bookData.getTimeTo())) {
			return new ResponseEntity<Object>("La hora de inicio y de fin no pueden coincidir", null, HttpStatus.NOT_ACCEPTABLE);
		
		}
		if(!col.isPresent()) {
			return new ResponseEntity<Object>("El número de colegiado no es válido", null, HttpStatus.NOT_ACCEPTABLE);
		
		}
		Optional<Book> bookTmp = bookRepository.findByDateAndCenterAndTimeFrom(bookData.getDate(), center, bookData.getTimeFrom());
		if(bookTmp.isPresent()) {
			return new ResponseEntity<Object>("La hora indicada ya está ocupada", null, HttpStatus.NOT_ACCEPTABLE);
		}
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
		context.getVariables().put("image", "http://wellshared-assets.s3.eu-west-3.amazonaws.com/centers/"+center.getId()+"/"+center.getMainImage());
		Book book = new Book();
		book.setBookStatus(bookStatusRepository.findOne(1L));
		book.setCenter(center);
		book.setName(bookData.getName());
		book.setSname(bookData.getSname());
		book.setDate(bookData.getDate());
		book.setEmail(bookData.getEmail());
		book.setPhone(bookData.getPhone());
		book.setTimeFrom(bookData.getTimeFrom());
		book.setTimeTo(bookData.getTimeTo());
		bookRepository.save(book);
		Mail mail = new Mail("info@wellshared.es", bookData.getEmail(), "Wellshared - Salas de fisioterapia", "");
		this.prepareAndSend(mail, context, "book");
		mail = new Mail("info@wellshared.es", "info@wellshared.es", "Peticion reserva Wellshared", "");
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
		Mail mail = new Mail("info@wellshared.es", "info@wellshared.es", "Petición alquiler de sala Wellshared", "");
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
		Mail mail = new Mail("info@wellshared.es", "info@wellshared.es", "Contacto Wellshared", "");
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
