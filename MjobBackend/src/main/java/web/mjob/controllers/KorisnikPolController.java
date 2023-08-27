package web.mjob.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.mjob.base.CrudController;
import web.mjob.models.entities.KorisnikPolEntity;
import web.mjob.services.KorisnikPolService;

@RestController
@RequestMapping("api/korisnikPol")
public class KorisnikPolController extends CrudController<Long, KorisnikPolEntity,KorisnikPolEntity> {
    public KorisnikPolController(KorisnikPolService crudService) {
        super(KorisnikPolEntity.class, crudService);
    }
}
