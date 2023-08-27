package web.mjob.controllers;


import java.util.List;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import web.mjob.base.CrudController;
import web.mjob.models.dto.Korisnik;
import web.mjob.models.dto.Korisnik1;
import web.mjob.models.dto.KorisnikRequest;
import web.mjob.models.entities.KorisnikEntity;
import web.mjob.repositories.KorisnikEntityRepository;
import web.mjob.services.Korisnik1Service;


@RestController
 @RequestMapping("api/korisnici1")
@CrossOrigin(origins = "http://localhost:3000")
public class Korisnik1Controller extends CrudController<Long,Korisnik1,Korisnik1>{

	public Korisnik1Controller(Korisnik1Service ser) {
		super(Korisnik1.class,ser);
		
		
	}
	
	
	
	//@GetMapping("/{username}")
	@RequestMapping("/{username}")
	KorisnikEntity getUserByUsername(String username) {
		
		return this.getUserByUsername(username);
		
	}
	

}
