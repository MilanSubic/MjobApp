package web.mjob.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.mjob.base.CrudController;
import web.mjob.models.dto.NarucilacDto;
import web.mjob.services.NarucilacService;

@RestController
@RequestMapping("api/narucioci")
public class NarucilacController extends CrudController<Long, NarucilacDto, NarucilacDto> {
    public NarucilacController(NarucilacService crudService) {
        super(NarucilacDto.class, crudService);
    }
}
