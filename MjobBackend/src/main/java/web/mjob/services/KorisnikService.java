package web.mjob.services;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import web.mjob.base.CrudService;
import web.mjob.exceptions.NotFoundException;
import web.mjob.models.dto.Korisnik;
import web.mjob.models.entities.KorisnikEntity;

import java.util.List;

public interface KorisnikService extends CrudService<Long> {

    KorisnikEntity getUserByUsername(String username);
     void insert() throws Exception;
    Korisnik update(Long id) throws NotFoundException;

    List<Korisnik> findAll();
}
