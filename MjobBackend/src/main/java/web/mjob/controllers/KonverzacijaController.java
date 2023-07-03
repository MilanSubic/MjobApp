package web.mjob.controllers;

import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import web.mjob.base.CrudController;
import web.mjob.exceptions.NotFoundException;
import web.mjob.models.dto.KonverzacijaDto;
import web.mjob.models.dto.ObrazovnaUstanovaTipDto;
import web.mjob.models.dto.OpstinaDto;
import web.mjob.models.dto.Request;
import web.mjob.services.KonverzacijaService;
import web.mjob.services.OpstinaService;


@RestController
@RequestMapping("api/konverzacija")
public class KonverzacijaController extends CrudController<Long, KonverzacijaDto,KonverzacijaDto> {

    private final KonverzacijaService konverzacijaService;
    public KonverzacijaController(KonverzacijaService crudService) {
        super(KonverzacijaDto.class, crudService);
        this.konverzacijaService = crudService;
    }

    @PostMapping("/all")
    public Page<KonverzacijaDto> findWithFilter(@RequestBody Request<KonverzacijaDto> request) throws NotFoundException {
        return getCrudService().findAllFiltered(request, KonverzacijaDto.class, SecurityContextHolder.getContext().getAuthentication());
    }

    @PutMapping("/procitaj/{konverzacijaId}")
    public void procitaj(@PathVariable Long konverzacijaId){
        konverzacijaService.procitaj(konverzacijaId, SecurityContextHolder.getContext().getAuthentication());
    }
}
