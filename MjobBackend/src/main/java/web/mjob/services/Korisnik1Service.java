package web.mjob.services;

import java.beans.JavaBean;

import org.springframework.stereotype.Service;

import web.mjob.base.CrudService;
import web.mjob.models.entities.KorisnikEntity;

public interface Korisnik1Service extends CrudService<Long> {

    KorisnikEntity getUserByUsername(String username);
}
