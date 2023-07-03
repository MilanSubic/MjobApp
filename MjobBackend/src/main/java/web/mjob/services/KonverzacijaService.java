package web.mjob.services;

import org.springframework.security.core.Authentication;
import web.mjob.base.CrudService;

public interface KonverzacijaService extends CrudService<Long> {

    void procitaj(Long konverzacijaId, Authentication authentication);
}
