package com.wellshared.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.wellshared.model.Book;
import com.wellshared.repository.BookRepository;
import com.wellshared.repository.BookStatusRepository;

@RestController
@RequestMapping("api/book")
public class BookController {
	@Autowired
	private BookRepository bookRepository;
	@Autowired
	private BookStatusRepository bookStatusRepository;
	@RequestMapping(path = "/", method = RequestMethod.GET)
    public ResponseEntity<Object> getBooks() {
		return ResponseEntity.ok(this.bookRepository.findAll());
    }
	
	@RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deleteCenters(@PathVariable Long id) {
		this.bookRepository.delete(id);
		return ResponseEntity.ok("Registro eliminado correctamente");
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
