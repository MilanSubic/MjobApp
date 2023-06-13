package web.mjob.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.mjob.models.dto.Narucilac;
import web.mjob.services.NarucilacService;

import java.util.List;

@RestController
@RequestMapping("/narucioci")
public class NarucilacController {
    private final NarucilacService narucilacService;

    public NarucilacController(NarucilacService narucilacService) {
        this.narucilacService=narucilacService;
    }
    @GetMapping
    List<Narucilac> getAll()
    {
        return narucilacService.getAll();
    }
}
