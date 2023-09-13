package web.mjob.controllers;

import org.springframework.web.bind.annotation.*;
import web.mjob.exceptions.NotFoundException;
import web.mjob.models.dto.Oglas;
import web.mjob.services.*;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;

import web.mjob.base.CrudController;
import web.mjob.models.dto.*;

import java.sql.Timestamp;
import java.util.List;


@RestController
@RequestMapping("api/oglas")
@CrossOrigin("*")
public class OglasController extends CrudController<Long, OglasDto,OglasDto> {

    public final OglasService oglasService;
    public final NovcanaNaknadaTipService novcanaNaknadaTipService;
    public final NarucilacService narucilacService;
    public final PosaoTipService posaoTipService;
    public final KorisnikPrijavljenService korisnikPrijavljenService;

    public OglasController( NovcanaNaknadaTipService novcanaNaknadaTipService, NarucilacService narucilacService, PosaoTipService posaoTipService, OglasService oglasService,KorisnikPrijavljenService korisnikPrijavljenService) {
        super(OglasDto.class,oglasService);

        this.novcanaNaknadaTipService = novcanaNaknadaTipService;
        this.narucilacService = narucilacService;
        this.posaoTipService = posaoTipService;
        this.oglasService = oglasService;
        this.korisnikPrijavljenService=korisnikPrijavljenService;
    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OglasDto insert( @RequestBody OglasDto oglasDto) throws NotFoundException {
        oglasDto.setDatum(new Timestamp(System.currentTimeMillis()));
        oglasDto.setAktivanDo( Timestamp.valueOf(oglasDto.getAktivanDo().toString()));
       oglasDto.setObrisan(false);
        return oglasService.insert(oglasDto, OglasDto.class, SecurityContextHolder.getContext().getAuthentication());
    }

    @PostMapping("tipoviPoslova")
    public Page<PosaoTipDto> findAllTipoviPoslova(@RequestBody Request<PosaoTipDto> request) throws NotFoundException {
        return posaoTipService.findAllFiltered(request, PosaoTipDto.class, SecurityContextHolder.getContext().getAuthentication());
    }
    @PostMapping ("novcanaNaknadaTip")
    public Page<NovcanaNaknadaDto> findAllTipoveNovcanihNaknada(@RequestBody Request<NovcanaNaknadaDto> request) throws NotFoundException {
        return novcanaNaknadaTipService.findAllFiltered(request, NovcanaNaknadaDto.class, SecurityContextHolder.getContext().getAuthentication());
    }

    @PostMapping("narucioci")
    public Page<NarucilacDto> findAllNarucioce(@RequestBody Request<NarucilacDto> request) throws NotFoundException {
        return narucilacService.findAllFiltered(request, NarucilacDto.class, SecurityContextHolder.getContext().getAuthentication());
    }

    @GetMapping("svi")
    public List<Oglas> findAll(){
        return oglasService.findAll();
    }
    @GetMapping("/mojiOglasi")
    public List<PrijavljenKorisnikDto> findMyAds(){
        return korisnikPrijavljenService.getMyAds(SecurityContextHolder.getContext().getAuthentication());
    }
    @GetMapping("users/{id}")
    public List<Oglas> findByNarucilacId(@PathVariable Long id) throws NotFoundException {
        return oglasService.getAllOglasiByNarucilacId(id);
    }

    @PostMapping("/{userId}/{oglasId}/prijava")
    public void prijaviKorisnikaNaOglas(@PathVariable Long userId,@PathVariable Long oglasId)
    {
        korisnikPrijavljenService.prijaviKorisnikaNaOglas(userId,oglasId);
    }

    @GetMapping("/javni")
    public List<Oglas> findAllJavni() throws NotFoundException {
        return oglasService.getAllJavniOglasi();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) throws NotFoundException {
        oglasService.delete(id);
    }

    @GetMapping("/{id}")
    public OglasDto findById(@PathVariable Long id) throws NotFoundException {
        return oglasService.findById(id, OglasDto.class);
    }

    @GetMapping("/oglas/{id}")
    public Oglas findByIdOglas(@PathVariable Long id) throws NotFoundException {
        return oglasService.findById(id, Oglas.class);
    }
    @GetMapping("/{id}/users")
    public List<PrijavljenKorisnikDto> getAllUserRequestsForJob(@PathVariable Long id)
    {
        return korisnikPrijavljenService.getAllUsersRequestsForAd(id);
    }
    @PutMapping("/{oglasId}/user/{korisnikId}/{accept}")
    public void reactOnRequestForJob(@PathVariable Long oglasId,@PathVariable Long korisnikId,@PathVariable Boolean accept)
    {
         korisnikPrijavljenService.acceptRequest(korisnikId,oglasId,accept);
    }
}

