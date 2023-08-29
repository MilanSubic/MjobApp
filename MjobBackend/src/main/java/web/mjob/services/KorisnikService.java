package web.mjob.services;

import org.springframework.security.core.Authentication;
import web.mjob.base.CrudService;
import web.mjob.models.dto.Korisnik;
import web.mjob.models.dto.Oglas;
import java.util.List;

public interface KorisnikService extends CrudService<Long> {

    Korisnik getUserByUsername(String username);
    List<Oglas> getAllUserJobs(Long id);
    void acceptRegistration(Long id, Integer brojClanskeKarte) ;
    void refuseRegistration(Long id);
    void deleteAccount(Long id) ;
    void reactivateUser(Long id);
    List<Korisnik> findAll();
    Korisnik getUser(Authentication authentication);

}
