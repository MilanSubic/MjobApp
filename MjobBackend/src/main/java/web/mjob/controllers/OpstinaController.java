package web.mjob.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.mjob.base.CrudController;
import web.mjob.models.dto.OpstinaDto;
import web.mjob.models.entities.OpstinaEntity;
import web.mjob.services.OpstinaService;


@RestController
@RequestMapping("api/opstina")
public class OpstinaController extends CrudController<Long, OpstinaDto,OpstinaDto> {
    public OpstinaController(OpstinaService crudService) {
        super(OpstinaDto.class, crudService);
    }
}
