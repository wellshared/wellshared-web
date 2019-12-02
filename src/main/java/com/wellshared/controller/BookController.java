package com.wellshared.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
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

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.wellshared.mailer.BookDto;
import com.wellshared.model.Book;
import com.wellshared.model.Center;
import com.wellshared.model.Collegiate;
import com.wellshared.repository.BookRepository;
import com.wellshared.repository.BookStatusRepository;
import com.wellshared.repository.CenterRepository;
import com.wellshared.repository.CollegiateRepository;
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
		Date date;
		try {
			DateFormat sourceFormat = new SimpleDateFormat("dd-MM-yyyy");
			 date = sourceFormat.parse(bookData.getDate());
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
		

		Optional<Book> freeBook = bookRepository.findFreeByDateAndCenterAndTimeFrom(center.getId(), bookData.getDate(), bookData.getTimeFrom(), bookData.getTimeTo());
		if(!freeBook.isPresent()) {
			return new ResponseEntity<Object>("La franja horaria indicada no está disponible", null, HttpStatus.NOT_ACCEPTABLE);
		} else {
			int freeFromInt = Integer.parseInt(freeBook.get().getTimeFrom().substring(0, 2));
			int bookFromInt = Integer.parseInt(bookData.getTimeFrom().substring(0, 2));
			int freeToInt = Integer.parseInt(freeBook.get().getTimeTo().substring(0, 2));
			int bookToInt = Integer.parseInt(bookData.getTimeTo().substring(0, 2));
			if(bookFromInt > bookToInt) {
				return new ResponseEntity<Object>("La fecha final no puede ser superior a la inicial", null, HttpStatus.NOT_ACCEPTABLE);
			}
			if(freeFromInt == bookFromInt && freeToInt == bookToInt) {
				bookRepository.delete(freeBook.get());
			}else if(freeFromInt == bookFromInt) {
				freeBook.get().setTimeFrom(bookData.getTimeTo());
			} else if (freeToInt == bookToInt) {
				freeBook.get().setTimeTo(bookData.getTimeFrom());
			}else if(freeToInt > bookToInt) {
				Book newBook = new Book();
				newBook.setBookStatus(freeBook.get().getBookStatus());
				newBook.setCenter(center);
				newBook.setDate(freeBook.get().getDate());
				newBook.setTimeFrom(bookData.getTimeTo());
				newBook.setTimeTo(freeBook.get().getTimeTo());
				newBook.setEmail(freeBook.get().getEmail());
				newBook.setName(freeBook.get().getName());
				newBook.setSname(freeBook.get().getSname());
				newBook.setPhone(freeBook.get().getPhone());
				bookRepository.save(newBook);
				freeBook.get().setTimeTo(bookData.getTimeFrom());
			}	
		}		
		try {
			Stripe.apiKey = "pk_test_aeUUjYYcx4XNfKVW60pmHTtI";
    		Map<String, Object> chargeParams = new HashMap<>();
            chargeParams.put("amount", bookData.getAmount());
            chargeParams.put("currency", bookData.getCurrency());
            chargeParams.put("description", "Cargo test centro " + center.getName());
            chargeParams.put("source", bookData.getStripeToken());
            Charge charge = Charge.create(chargeParams);
            mailerService.sendBook(center, bookData);
    	} catch(StripeException e) {
    		e.printStackTrace();
    	} catch(Exception e) {
    		e.printStackTrace();
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
