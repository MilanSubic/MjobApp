package web.mjob.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.mjob.models.dto.PosaoTipDto;
import web.mjob.services.PosaoTipService;


@RestController
@RequestMapping("api/posaoTip")
public class PosaoTipController  {
    PosaoTipService posaoTipService;

    public PosaoTipController(PosaoTipService service) {

        this.posaoTipService=service;
    }

    @GetMapping("{id}")
    public PosaoTipDto getById(@PathVariable Long id)
    {
        return posaoTipService.getPosaoTipById(id);
    }

}

