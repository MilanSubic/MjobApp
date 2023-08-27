package web.mjob.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.mjob.base.CrudController;
import web.mjob.models.entities.KorisnikPolEntity;
import web.mjob.models.entities.KorisnikTipEntity;
import web.mjob.services.KorisnikPolService;
import web.mjob.services.KorisnikTipService;

@RestController
@RequestMapping("api/korisnikTip")
public class KorisnikTipController extends CrudController<Long, KorisnikTipEntity, KorisnikTipEntity> {
    public KorisnikTipController(KorisnikTipService crudService) {
        super(KorisnikTipEntity.class, crudService);
    }
}
