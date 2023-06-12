package web.mjob.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import web.mjob.base.CrudController;
import web.mjob.models.dto.KorisnikTipDto;
import web.mjob.models.entities.KorisnikTipEntity;
import web.mjob.services.KorisnikTipService;

@RestController
@RequestMapping("api/korisnikTip1")
public class KorisnikTip1Controller extends CrudController<Long, KorisnikTipDto,KorisnikTipDto> {
    public KorisnikTip1Controller(KorisnikTipService crudService) {
        super(KorisnikTipDto.class, crudService);
    }
}
