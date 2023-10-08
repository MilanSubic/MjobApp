package web.mjob.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.mjob.base.CrudController;
import web.mjob.models.dto.ObrazovnaUstanovaTipDto;
import web.mjob.models.entities.ObrazovnaUstanovaTipEntity;
import web.mjob.services.ObrazovnaUstanovaTipService;


@RestController
@RequestMapping("api/obrazovnaUstanovaTip1")
public class ObrazovnaUstanovaTip1Controller extends CrudController<Long, ObrazovnaUstanovaTipDto,ObrazovnaUstanovaTipDto> {
    public ObrazovnaUstanovaTip1Controller(ObrazovnaUstanovaTipService crudService) {
        super(ObrazovnaUstanovaTipDto.class, crudService);
    }
}
