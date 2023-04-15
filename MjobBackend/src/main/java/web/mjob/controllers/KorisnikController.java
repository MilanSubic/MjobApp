package web.mjob.controllers;

import org.springframework.web.bind.annotation.*;
import web.mjob.exceptions.NotFoundException;
import web.mjob.models.dto.Korisnik;
import web.mjob.services.KorisnikService;

import java.util.List;

@RestController
@RequestMapping("/users")

public class KorisnikController {
    KorisnikService korisnikService;
    public KorisnikController(KorisnikService service) {
        this.korisnikService = service;
    }
    @GetMapping
    public List<Korisnik> getAll()
    {
        return korisnikService.findAll();
    }
    @PostMapping
    public void insert() throws Exception
    {
        korisnikService.insert();
    }

    @PutMapping("/{id}")
    public Korisnik update(@PathVariable Long id) throws Exception {
        return korisnikService.update(id);
    }
}
