package web.mjob.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import web.mjob.base.CrudController;
import web.mjob.models.dto.KorisnikStatusDto;
import web.mjob.services.KorisnikStatusService;

@RestController
@RequestMapping("api/korisnikStatus1")
public class KorisnikStatusController extends CrudController<Long,KorisnikStatusDto,KorisnikStatusDto> {
    public KorisnikStatusController(KorisnikStatusService crudService) {
        super(KorisnikStatusDto.class, crudService);
    }
}