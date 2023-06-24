package web.mjob.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import web.mjob.base.CrudController;
import web.mjob.exceptions.ConflictException;
import web.mjob.exceptions.NotFoundException;
import web.mjob.models.dto.*;
import web.mjob.models.entities.KorisnikEntity;
import web.mjob.services.NarucilacService;
import web.mjob.services.NovcanaNaknadaTipService;
import web.mjob.services.OglasService;
import web.mjob.services.PosaoTipService;

import java.sql.Timestamp;


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
        return oglasService.insert(oglasDto, OglasDto.class);
    }


    @PostMapping("tipoviPoslova")
    public Page<PosaoTipDto> findAllTipoviPoslova(@RequestBody Request<PosaoTipDto> request) throws NotFoundException {
        return posaoTipService.findAllFiltered(request, PosaoTipDto.class);
    }
    @PostMapping ("novcanaNaknadaTip")
    public Page<NovcanaNaknadaDto> findAllTipoveNovcanihNaknada(@RequestBody Request<NovcanaNaknadaDto> request) throws NotFoundException {
        return novcanaNaknadaTipService.findAllFiltered(request, NovcanaNaknadaDto.class);
    }

    @PostMapping("narucioci")
    public Page<NarucilacDto> findAllNarucioce(@RequestBody Request<NarucilacDto> request) throws NotFoundException {
        return narucilacService.findAllFiltered(request, NarucilacDto.class);
    }


}
