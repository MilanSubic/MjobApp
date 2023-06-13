package web.mjob.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.mjob.models.dto.PosaoTip;
import web.mjob.services.PosaoTipService;

import java.util.List;

@RestController
@RequestMapping("/tipoviPosla")
public class PosaoTipController {

    private final PosaoTipService posaoTipService;

    public PosaoTipController(PosaoTipService posaoTipService) {
        this.posaoTipService = posaoTipService;
    }

    @GetMapping
    List<PosaoTip> getAll()
    {
        return posaoTipService.getAll();
    }
}
