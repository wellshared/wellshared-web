package com.wellshared.controller;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.net.RequestOptions;
import com.wellshared.mailer.BookDto;
import com.wellshared.model.Book;
import com.wellshared.model.Center;
import com.wellshared.model.Collegiate;
import com.wellshared.model.RoomTimeIntervalDetail;
import com.wellshared.repository.BookRepository;
import com.wellshared.repository.BookStatusRepository;
import com.wellshared.repository.CenterRepository;
import com.wellshared.repository.CollegiateRepository;
import com.wellshared.repository.RoomTimeIntervalDetailRepository;
import com.wellshared.service.MailerService;

@RestController
@RequestMapping("api/book")
public class BookController {
	@Autowired
	private BookRepository bookRepository;
	@Autowired
	private CollegiateRepository collegiateRepository;
	@Autowired
	private BookStatusRepository bookStatusRepository;
	@Autowired
	private RoomTimeIntervalDetailRepository roomTimeIntervalDetailRepository;
	@Autowired
	private CenterRepository centerRepository;
	@Autowired
	private MailerService mailerService;
	@RequestMapping(path = "/", method = RequestMethod.GET)
    public ResponseEntity<Object> getBooks() {
		return ResponseEntity.ok(this.bookRepository.findAll());
    }
	
	@RequestMapping(path = "/center/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> getBooksByCenter(@PathVariable Long id) {
		Optional<Center> center = centerRepository.findById(id);
		if(center.isPresent()) {
			return ResponseEntity.ok(bookRepository.findAllByCenter(center.get()));
		} else {
			return ResponseEntity.ok(new ArrayList<Object>());
		}
    }
	
	@RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deleteCenters(@PathVariable Long id) {
		Book book = this.bookRepository.findOne(id);
		if (book != null) {
			this.bookRepository.delete(id);
			return ResponseEntity.ok("Registro eliminado correctamente");
		} else {
			return new ResponseEntity<Object>("El registro no existe", null, HttpStatus.NOT_ACCEPTABLE);
		}
    }
	
	@RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> findById(@PathVariable Long id) {
		Book book = this.bookRepository.findOne(id);
		if(book == null) {
			return ResponseEntity.ok("La reserva consultada no existe");
		}
		return ResponseEntity.ok(book);
    }
	
	@RequestMapping(path = "/status", method = RequestMethod.GET)
    public ResponseEntity<Object> findStatus() {
		return ResponseEntity.ok(bookStatusRepository.findAll());
    }
	
	
	@RequestMapping(path = "/create", method = RequestMethod.POST)
    public ResponseEntity<Object> saveBook(@RequestBody BookDto bookData) {
		Center center = centerRepository.findById(bookData.getCenterId()).get();
		Optional<Collegiate> col = collegiateRepository.findByNumber(bookData.getNumber());
		try {
			Calendar cal = Calendar.getInstance();
			cal.setTime(bookData.getDate());	
			if(cal.get(Calendar.DAY_OF_WEEK)== 1) {
				return new ResponseEntity<Object>("No es posible hacer reservas para el día indicado", null, HttpStatus.NOT_ACCEPTABLE);	
			}
		}catch (Exception e) {
			return new ResponseEntity<Object>("El formato de fecha enviado no es válido", null, HttpStatus.NOT_ACCEPTABLE);
		}
		
		if(bookData.getTimeFrom().equals(bookData.getTimeTo())) {
			return new ResponseEntity<Object>("La hora de inicio y de fin no pueden coincidir", null, HttpStatus.NOT_ACCEPTABLE);
		
		}
		if(!col.isPresent()) {
			return new ResponseEntity<Object>("El número de colegiado no es válido", null, HttpStatus.NOT_ACCEPTABLE);
		}
		Optional<RoomTimeIntervalDetail> freeBook = roomTimeIntervalDetailRepository.findFreeByDateAndCenterAndTimeFrom(center.getId(), bookData.getDate(), bookData.getTimeFrom(), bookData.getTimeTo());
		if(!freeBook.isPresent()) {
			return new ResponseEntity<Object>("La franja horaria indicada no está disponible", null, HttpStatus.NOT_ACCEPTABLE);
		} else {
			int bookFromInt = Integer.parseInt(bookData.getTimeFrom().substring(0, 2));
			int bookToInt = Integer.parseInt(bookData.getTimeTo().substring(0, 2));
			if(bookFromInt > bookToInt) {
				return new ResponseEntity<Object>("La fecha final no puede ser superior a la inicial", null, HttpStatus.NOT_ACCEPTABLE);
			}
				Optional<Book> book = bookRepository.findByDateAndCenterAndTimeFrom(center.getId(), bookData.getDate(), bookData.getTimeFrom(), bookData.getTimeTo());
				if(book.isPresent()) {
					return new ResponseEntity<Object>("La hora indicada de reserva ya está ocupada", null, HttpStatus.NOT_ACCEPTABLE);
				} else {
					Book newBook = new Book();
					newBook.setCenter(center);
					newBook.setDate(bookData.getDate());
					newBook.setTimeFrom(bookData.getTimeFrom());
					newBook.setTimeTo(bookData.getTimeTo());
					newBook.setEmail(bookData.getEmail());
					newBook.setName(bookData.getName());
					newBook.setSname(bookData.getSname());
					newBook.setPhone(bookData.getPhone());
					newBook.setBookStatus(bookStatusRepository.getOne(3L));
					newBook = bookRepository.save(newBook);
					try {
			    		Map<String, Object> chargeParams = new HashMap<>();
			            chargeParams.put("amount", bookData.getAmount() * 100);
			            chargeParams.put("currency", bookData.getCurrency());
			            chargeParams.put("description", "Wellshared - Espacios sanitarios por horas");
			            chargeParams.put("source", bookData.getStripeToken());
			            RequestOptions requestOptions = RequestOptions.builder()
			            		  .setApiKey("sk_test_o4odb7JTdH1MCiY9FmhYT7TP00jPfNBRsU")
			            		  .build();
			            Charge.create(chargeParams, requestOptions);
			            newBook.setBookStatus(bookStatusRepository.getOne(1L));
			            bookRepository.save(newBook);
			            mailerService.sendBook(center, bookData);
			    	} catch(StripeException e) {
			    		e.printStackTrace();
			    	} catch(Exception e) {
			    		e.printStackTrace();
			    	}
				}
		}		
		
		return ResponseEntity.ok("Correo enviado correctamente");
	}
	
	@RequestMapping(path = "/", method = RequestMethod.POST)
    public ResponseEntity<Object> addCenter(@RequestBody Book book) {
		if(book.getId() == null) {
			this.bookRepository.save(book);
		} else {
			Book b = this.bookRepository.findOne(book.getId());
			b.setBookStatus(book.getBookStatus());
			b.setCenter(book.getCenter());
			b.setDate(book.getDate());
			b.setTimeFrom(book.getTimeFrom());
			b.setTimeTo(book.getTimeTo());
		}
		this.bookRepository.save(book);
		return ResponseEntity.ok("Reserva guardado correctamente");
    }
	
}
