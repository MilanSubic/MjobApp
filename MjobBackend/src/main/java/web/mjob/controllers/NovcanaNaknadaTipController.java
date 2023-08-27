package web.mjob.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.mjob.base.CrudController;
import web.mjob.models.dto.NaseljenoMjestoDto;
import web.mjob.models.dto.NovcanaNaknadaDto;
import web.mjob.models.dto.NovcanaNaknadaTip;
import web.mjob.models.dto.PosaoTip;
import web.mjob.services.NarucilacService;
import web.mjob.services.NovcanaNaknadaTipService;

import java.util.List;

@RestController
@RequestMapping("api/tipoviNovcaneNaknade")
public class NovcanaNaknadaTipController extends CrudController<Long, NovcanaNaknadaDto, NovcanaNaknadaDto> {
    public NovcanaNaknadaTipController(NarucilacService crudService) {
        super(NovcanaNaknadaDto.class, crudService);
    }
}
