package web.mjob.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import web.mjob.base.CrudController;
import web.mjob.models.dto.KorisnikPolDto;
import web.mjob.models.entities.KorisnikPolEntity;
import web.mjob.services.KorisnikPolService;

@RestController
@RequestMapping("api/korisnikPol1")
public class KorisnikPol1Controller extends CrudController<Long,KorisnikPolDto,KorisnikPolDto> {
    public KorisnikPol1Controller(KorisnikPolService crudService) {
        super(KorisnikPolDto.class, crudService);
    }
}