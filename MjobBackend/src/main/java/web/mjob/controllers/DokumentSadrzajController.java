package web.mjob.controllers;

import org.springframework.data.domain.Page;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import web.mjob.base.CrudController;
import web.mjob.exceptions.NotFoundException;
import web.mjob.models.dto.DokumentSadrzajDto;
import web.mjob.models.dto.KonverzacijaDto;
import web.mjob.models.dto.Korisnik;
import web.mjob.models.dto.Request;
import web.mjob.services.DokumentSadrzajService;
import web.mjob.services.KonverzacijaService;

@RestController
@RequestMapping("api/dokumentSadrzaj")
public class DokumentSadrzajController extends CrudController<Long, DokumentSadrzajDto,DokumentSadrzajDto> {

    private final DokumentSadrzajService service;
    public DokumentSadrzajController(DokumentSadrzajService crudService) {
        super(DokumentSadrzajDto.class, crudService);

        this.service = crudService;
    }

    @GetMapping("/dokument/{dokumentId}")
    public DokumentSadrzajDto findByDokumentId(@PathVariable Long dokumentId) throws NotFoundException {
        return service.findByDokumentId(dokumentId,getRespClass());
    }
}
