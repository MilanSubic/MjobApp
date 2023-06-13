package web.mjob.controllers;

import org.springframework.web.bind.annotation.*;
import web.mjob.models.dto.Oglas;
import web.mjob.services.OglasService;

import java.util.List;


@RestController
@RequestMapping("/oglasi")
public class OglasController {

    private final OglasService oglasService;

    public OglasController(OglasService oglasService) {
        this.oglasService = oglasService;
    }

    @GetMapping
    List<Oglas> getAll() {
        return oglasService.getAll();
    }
/*
    @GetMapping("/{id}")
    public Oglas findById(@PathVariable Long id) throws NotFoundException {
        return oglasService.findById(id, Oglas.class);
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        oglasService.delete(id);
    }

*/
}