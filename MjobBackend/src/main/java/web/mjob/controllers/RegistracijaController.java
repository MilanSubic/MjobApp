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


    @PostMapping("opstine")
    public Page<OpstinaDto> findAllOpstine(@RequestBody Request<OpstinaDto> request) throws NotFoundException {
        return opstinaService.findAllFiltered(request,OpstinaDto.class);
    }

    @PostMapping("pol")
    public Page<KorisnikPolDto> findAllKorinsikPol(@RequestBody Request<KorisnikPolDto> request) throws NotFoundException {
        return korisnikPolService.findAllFiltered(request,KorisnikPolDto.class);
    }

    @PostMapping("tipKorisnika")
    public Page<KorisnikTipDto> findAllKorinsikTip(@RequestBody Request<KorisnikTipDto> request) throws NotFoundException {
        return korisnikTipService.findAllFiltered(request, KorisnikTipDto.class);
    }

    @PostMapping("tipObrazovneUstanove")
    public Page<ObrazovnaUstanovaTipDto> findAllobrazovnaUstanovaTip(@RequestBody Request<ObrazovnaUstanovaTipDto> request) throws NotFoundException {
        return obrazovnaUstanovaTipService.findAllFiltered(request, ObrazovnaUstanovaTipDto.class);
    }

    @PostMapping("tipDokumenta")
    public Page<DokumentTipDto> findAllDokumentTip(@RequestBody Request<DokumentTipDto> request) throws NotFoundException {
        return dokumentTipService.findAllFiltered(request, DokumentTipDto.class);
    }
}
