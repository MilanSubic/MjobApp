package web.mjob.services;

import web.mjob.base.CrudService;
import web.mjob.exceptions.NotFoundException;
import web.mjob.models.dto.Korisnik;
import web.mjob.models.dto.Oglas;
import java.util.List;

public interface KorisnikService extends CrudService<Long> {

    Korisnik getUserByUsername(String username);
    List<Oglas> getAllUserJobs(Long id);
    void acceptRegistration(Long id, Integer brojClanskeKarte) throws Exception;
    void refuseRegistration(Long id) throws NotFoundException;
    void deleteAccount(Long id) throws NotFoundException;
    void reactivateUser(Long id) throws  NotFoundException;
    List<Korisnik> findAll();
}
