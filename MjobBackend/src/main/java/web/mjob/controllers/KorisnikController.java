package web.mjob.controllers;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import web.mjob.exceptions.NotFoundException;
import web.mjob.models.dto.Korisnik;
import web.mjob.models.dto.Oglas;
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
    @GetMapping("{id}/jobs")
    public List<Oglas> getAllUserJobs(@PathVariable Long id)
    {
        return korisnikService.getAllUserJobs(id);
    }
    @GetMapping("{username}")
    public Korisnik getByUsername(@PathVariable String username)
    {
     return korisnikService.getUserByUsername(username);
    }
    @GetMapping("/user")
    public Korisnik getUser()
    {
        return korisnikService.getUser( SecurityContextHolder.getContext().getAuthentication());
    }
    @PutMapping("{id}/acceptRegistration/{brojClanskeKarte}")
    public void acceptRegistration(@PathVariable Long id, @PathVariable Integer brojClanskeKarte) throws Exception {
         korisnikService.acceptRegistration(id, brojClanskeKarte);
    }
    @PutMapping("{id}/refuseRegistration")
    public void refuseRegistration(@PathVariable Long id) throws Exception {
         korisnikService.refuseRegistration(id);
    }
    @PutMapping("{id}/deleteAccount")
    public void deleteAccount(@PathVariable Long id) throws Exception {
        korisnikService.deleteAccount(id);
    }
    @PutMapping("{id}/reactivateUser")
    public void reactivateUser(@PathVariable Long id) throws Exception {
        korisnikService.reactivateUser(id);
    }
}
