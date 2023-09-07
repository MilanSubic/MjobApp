package web.mjob.services;

import org.springframework.security.core.Authentication;
import web.mjob.base.CrudService;
import web.mjob.models.dto.Korisnik;
import web.mjob.models.dto.Oglas;

import java.util.List;

public interface KorisnikPrijavljenService extends CrudService<Long>{


    void prijaviKorisnikaNaOglas(Long userId,Long oglasId);

}