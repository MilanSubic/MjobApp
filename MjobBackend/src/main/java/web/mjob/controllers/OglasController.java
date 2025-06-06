package web.mjob.controllers;

import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import web.mjob.exceptions.NotFoundException;
import web.mjob.models.dto.Oglas;
import web.mjob.services.*;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;

import web.mjob.base.CrudController;
import web.mjob.models.dto.*;

import javax.persistence.criteria.CriteriaBuilder;
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
    private final OglasStatistikVwService oglasStatistikaVwService;

    public OglasController(NovcanaNaknadaTipService novcanaNaknadaTipService, NarucilacService narucilacService, PosaoTipService posaoTipService, OglasService oglasService, KorisnikPrijavljenService korisnikPrijavljenService, OglasStatistikVwService oglasStatistikVwService) {
        super(OglasDto.class,oglasService);

        this.novcanaNaknadaTipService = novcanaNaknadaTipService;
        this.narucilacService = narucilacService;
        this.posaoTipService = posaoTipService;
        this.oglasService = oglasService;
        this.korisnikPrijavljenService=korisnikPrijavljenService;
        this.oglasStatistikaVwService = oglasStatistikVwService;
    }



    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OglasDto insert( @RequestBody OglasDto oglasDto) throws NotFoundException {
        oglasDto.setDatum(new Timestamp(System.currentTimeMillis()));
        oglasDto.setAktivanDo( Timestamp.valueOf(oglasDto.getAktivanDo().toString()));
       oglasDto.setObrisan(false);
        return oglasService.insert(oglasDto, OglasDto.class, SecurityContextHolder.getContext().getAuthentication());
    }
    @PutMapping("/{id}")
    public OglasDto update(@PathVariable Long id,@RequestBody OglasDto oglasDto) throws NotFoundException
    {
        oglasDto.setDatum(new Timestamp(System.currentTimeMillis()));
        oglasDto.setAktivanDo( Timestamp.valueOf(oglasDto.getAktivanDo().toString()));
        oglasDto.setObrisan(false);
        return oglasService.update(id,oglasDto, OglasDto.class);

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

    @PostMapping(value = "svi")
    public OglasListDto findAll(@RequestBody Request<OglasFilterDto> request){
        return oglasService.findAll(request, SecurityContextHolder.getContext().getAuthentication());
    }
    @GetMapping("/novcanaNaknadaTip")
    public List<NovcanaNaknadaTip> findAllNovcanaNaknada()
    {
        return novcanaNaknadaTipService.getAll();
    }
    @GetMapping("/narucioci")
    public List<NarucilacDto> findAllNarucioci()
    {
        return narucilacService.getAll();
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
    @PutMapping("/{oglasId}/usersUplata/{korisnikId}/{accept}")
    public void reactOnUplata(@PathVariable Long oglasId,@PathVariable Long korisnikId,@PathVariable Boolean accept)
    {
    	
         korisnikPrijavljenService.potvrdiUplatu(korisnikId,oglasId,accept);
    }
    @PutMapping("/{oglasId}/refuse")
    public boolean refuseRequestForJob(@PathVariable Long oglasId)
    {
       return korisnikPrijavljenService.refuseRequest(oglasId);
    }

    @GetMapping("/numUsers/{id}")
    public Integer getNumberAllUserRequestsForJob(@PathVariable Long id)
    {
        return korisnikPrijavljenService.numberAllUserRequest(id);
    }

    @GetMapping("/numAcceptUsers/{id}")
    public Integer getNumberAcceptedRequestsForJob(@PathVariable Long id)
    {
        return korisnikPrijavljenService.numberAcceptedUserRequest(id);
    }

    @PutMapping("/{id}/view")
    public void view(@PathVariable Long id){
        oglasService.view(id, SecurityContextHolder.getContext().getAuthentication());
    }

    @GetMapping("/{id}/statistika/{broj}")
    public List<OglasStatistikaDto> getViewStatistika(@PathVariable Long id, @PathVariable Long broj) throws Exception {
        return oglasStatistikaVwService.getViewStatistika(id, broj, SecurityContextHolder.getContext().getAuthentication());
    }
}

