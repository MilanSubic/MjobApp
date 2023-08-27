package web.mjob.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.mjob.base.CrudController;
import web.mjob.models.entities.ObrazovnaUstanovaTipEntity;
import web.mjob.services.ObrazovnaUstanovaTipService;


@RestController
@RequestMapping("api/obrazovnaUstanovaTip")
public class ObrazovnaUstanovaTipController extends CrudController<Long, ObrazovnaUstanovaTipEntity,ObrazovnaUstanovaTipEntity> {
    public ObrazovnaUstanovaTipController(ObrazovnaUstanovaTipService crudService) {
        super(ObrazovnaUstanovaTipEntity.class, crudService);
    }
}
