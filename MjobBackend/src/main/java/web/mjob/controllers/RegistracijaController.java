package web.mjob.controllers;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import web.mjob.exceptions.ConflictException;
import web.mjob.exceptions.NotFoundException;
import web.mjob.models.dto.*;
import web.mjob.services.*;

import java.security.Principal;

@RestController
@RequestMapping("api/registracija")
@CrossOrigin("*")
public class RegistracijaController {

    public final RegistracijaService registracijaService;
    public final KorisnikTipService korisnikTipService;
    public final KorisnikPolService korisnikPolService;
    public final ObrazovnaUstanovaTipService obrazovnaUstanovaTipService;
    public final OpstinaService opstinaService;
    public final DokumentTipService dokumentTipService;
    public RegistracijaController(RegistracijaService registracijaService, KorisnikTipService korisnikTipService, KorisnikPolService korisnikPolService, ObrazovnaUstanovaTipService obrazovnaUstanovaTipService, OpstinaService opstinaService, DokumentTipService dokumentTipService){
        this.registracijaService = registracijaService;
        this.korisnikTipService = korisnikTipService;
        this.korisnikPolService = korisnikPolService;
        this.obrazovnaUstanovaTipService = obrazovnaUstanovaTipService;
        this.opstinaService = opstinaService;
        this.dokumentTipService = dokumentTipService;
    }

    @PostMapping("signup")
    @ResponseStatus(HttpStatus.CREATED)
    public boolean signup(@RequestBody RegistracijaDto korisnik) throws ConflictException {
        return registracijaService.signup(korisnik);
    }


    @PostMapping("opstine")
    public Page<OpstinaDto> findAllOpstine(@RequestBody Request<OpstinaDto> request, Principal principal) throws NotFoundException {
        return opstinaService.findAllFiltered(request,OpstinaDto.class, SecurityContextHolder.getContext().getAuthentication());
    }

    @PostMapping("pol")
    public Page<KorisnikPolDto> findAllKorinsikPol(@RequestBody Request<KorisnikPolDto> request, Principal principal) throws NotFoundException {
        return korisnikPolService.findAllFiltered(request,KorisnikPolDto.class, SecurityContextHolder.getContext().getAuthentication());
    }

    @PostMapping("tipKorisnika")
    public Page<KorisnikTipDto> findAllKorinsikTip(@RequestBody Request<KorisnikTipDto> request, Principal principal) throws NotFoundException {
        return korisnikTipService.findAllFiltered(request, KorisnikTipDto.class, SecurityContextHolder.getContext().getAuthentication());
    }

    @PostMapping("tipObrazovneUstanove")
    public Page<ObrazovnaUstanovaTipDto> findAllobrazovnaUstanovaTip(@RequestBody Request<ObrazovnaUstanovaTipDto> request, Principal principal) throws NotFoundException {
        return obrazovnaUstanovaTipService.findAllFiltered(request, ObrazovnaUstanovaTipDto.class, SecurityContextHolder.getContext().getAuthentication());
    }

    @PostMapping("tipDokumenta")
    public Page<DokumentTipDto> findAllDokumentTip(@RequestBody Request<DokumentTipDto> request, Principal principal) throws NotFoundException {
        return dokumentTipService.findAllFiltered(request, DokumentTipDto.class, SecurityContextHolder.getContext().getAuthentication());
    }
}
