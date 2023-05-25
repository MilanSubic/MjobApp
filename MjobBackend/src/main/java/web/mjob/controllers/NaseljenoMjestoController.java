package web.mjob.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.mjob.base.CrudController;
import web.mjob.models.dto.NaseljenoMjestoDto;
import web.mjob.models.entities.KorisnikPolEntity;
import web.mjob.models.entities.NaseljenoMjestoEntity;
import web.mjob.services.KorisnikPolService;
import web.mjob.services.NaseljenoMjestoService;


@RestController
@RequestMapping("api/naseljenoMjesto")
public class NaseljenoMjestoController extends CrudController<Long, NaseljenoMjestoDto, NaseljenoMjestoDto> {
    public NaseljenoMjestoController(NaseljenoMjestoService crudService) {
        super(NaseljenoMjestoDto.class, crudService);
    }
}
