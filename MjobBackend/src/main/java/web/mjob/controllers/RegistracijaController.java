package web.mjob.controllers;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import web.mjob.exceptions.ConflictException;
import web.mjob.exceptions.NotFoundException;
import web.mjob.models.dto.*;
import web.mjob.services.*;

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


    @GetMapping("opstine")
    public Page<OpstinaDto> findAllOpstine(Pageable page) throws NotFoundException {
        return opstinaService.findAll(page,OpstinaDto.class);
    }

    @GetMapping("pol")
    public Page<KorisnikPolDto> findAllKorinsikPol(Pageable page) throws NotFoundException {
        return korisnikPolService.findAll(page,KorisnikPolDto.class);
    }

    @GetMapping("tipKorisnika")
    public Page<KorisnikTipDto> findAllKorinsikTip(Pageable page) throws NotFoundException {
        return korisnikTipService.findAll(page, KorisnikTipDto.class);
    }

    @GetMapping("tipObrazovneUstanove")
    public Page<ObrazovnaUstanovaTipDto> findAllobrazovnaUstanovaTip(Pageable page) throws NotFoundException {
        return obrazovnaUstanovaTipService.findAll(page, ObrazovnaUstanovaTipDto.class);
    }

    @GetMapping("tipDokumenta")
    public Page<DokumentTipDto> findAllDokumentTip(Pageable page) throws NotFoundException {
        return dokumentTipService.findAll(page, DokumentTipDto.class);
    }
}
