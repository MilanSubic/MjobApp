package web.mjob.controllers;

import org.springframework.web.bind.annotation.*;
import web.mjob.exceptions.NotFoundException;
import web.mjob.models.dto.Oglas;
import web.mjob.services.OglasService;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;

import web.mjob.base.CrudController;
import web.mjob.models.dto.*;

import web.mjob.services.NarucilacService;
import web.mjob.services.NovcanaNaknadaTipService;
import web.mjob.services.PosaoTipService;

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

    public OglasController( NovcanaNaknadaTipService novcanaNaknadaTipService, NarucilacService narucilacService, PosaoTipService posaoTipService, OglasService oglasService) {
        super(OglasDto.class,oglasService);

        this.novcanaNaknadaTipService = novcanaNaknadaTipService;
        this.narucilacService = narucilacService;
        this.posaoTipService = posaoTipService;
        this.oglasService = oglasService;
    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OglasDto insert( @RequestBody OglasDto oglasDto) throws NotFoundException {
        oglasDto.setDatum(new Timestamp(System.currentTimeMillis()));
        oglasDto.setAktivanDo( Timestamp.valueOf(oglasDto.getAktivanDo().toString()));
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

    @GetMapping("users/{id}")
    public List<Oglas> findByNarucilacId(@PathVariable Long id) throws NotFoundException {
        return oglasService.getAllOglasiByNarucilacId(id);
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

}

