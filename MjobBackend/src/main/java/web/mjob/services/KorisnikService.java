package web.mjob.services;

import web.mjob.base.CrudService;
import web.mjob.models.entities.KorisnikEntity;

public interface KorisnikService extends CrudService<Long> {

    KorisnikEntity getUserByUsername(String username);
}
