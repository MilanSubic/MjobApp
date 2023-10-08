package web.mjob.controllers;

import org.springframework.web.bind.annotation.*;
import web.mjob.models.dto.PosaoTipDto;
import web.mjob.services.PosaoTipService;

import java.util.List;


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
    @GetMapping("/tipoviPoslova")
    public List<PosaoTipDto> getAll()
    {
        return posaoTipService.getAll();
    }
    @GetMapping("/posao/{naziv}")
    public PosaoTipDto getByNaziv(@PathVariable String naziv)
    {
        return posaoTipService.getPosaoTipByNaziv(naziv);
    }

}

