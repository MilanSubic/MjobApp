package web.mjob.controllers;

import org.springframework.web.bind.annotation.*;
import web.mjob.exceptions.NotFoundException;
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
        return oglasService.getAllOglasiByNarucilacId(id, Oglas.class);
    }

     */

    @GetMapping("users/{id}")
    public List<Oglas> findByNarucilacId(@PathVariable Long id) throws NotFoundException {
        return oglasService.getAllOglasiByNarucilacId(id);
    }

    @GetMapping("/javni")
    public List<Oglas> findAllJavni() throws NotFoundException {
        return oglasService.getAllJavniOglasi();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) throws Exception {
        oglasService.delete(id);
    }
}