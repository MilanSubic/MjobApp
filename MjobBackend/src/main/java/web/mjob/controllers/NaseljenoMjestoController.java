package web.mjob.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.mjob.models.dto.Narucilac;
import web.mjob.models.dto.NaseljenoMjesto;
import web.mjob.services.NarucilacService;
import web.mjob.services.NaseljenoMjestoService;

import java.util.List;

@RestController
@RequestMapping("/naseljenaMjesta")
public class NaseljenoMjestoController {
    private final NaseljenoMjestoService naseljenoMjestoService;

    public NaseljenoMjestoController(NaseljenoMjestoService naseljenoMjestoService) {
        this.naseljenoMjestoService=naseljenoMjestoService;
    }
    @GetMapping
    List<NaseljenoMjesto> getAll()
    {
        return naseljenoMjestoService.getAll();
    }
}