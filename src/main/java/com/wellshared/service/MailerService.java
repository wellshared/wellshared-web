package com.wellshared.service;

import java.nio.charset.StandardCharsets;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring4.SpringTemplateEngine;

import com.wellshared.mailer.BookDto;
import com.wellshared.mailer.Mail;
import com.wellshared.model.Book;
import com.wellshared.model.Center;
import com.wellshared.repository.BookRepository;
import com.wellshared.repository.BookStatusRepository;

@Service
public class MailerService {

	@Autowired
	private JavaMailSender emailSender;
	@Autowired
	private SpringTemplateEngine templateEngine;
	@Autowired
	private BookRepository bookRepository;
	@Autowired
	private BookStatusRepository bookStatusRepository;
	
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
	
	public void sendBook(Center center, BookDto bookData) {
		Context context = new Context();
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
	}
}
