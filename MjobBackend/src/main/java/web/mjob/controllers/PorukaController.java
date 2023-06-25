package web.mjob.controllers;

import io.jsonwebtoken.Claims;
import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.mjob.base.CrudController;
import web.mjob.exceptions.NotFoundException;
import web.mjob.models.dto.KonverzacijaDto;
import web.mjob.models.dto.PorukaDto;
import web.mjob.models.dto.Request;
import web.mjob.services.KonverzacijaService;
import web.mjob.services.PorukaService;

import java.security.Principal;


@RestController
@RequestMapping("api/poruke")
public class PorukaController extends CrudController<Long, PorukaDto,PorukaDto> {
    public PorukaController(PorukaService crudService) {
        super(PorukaDto.class, crudService);
    }

    @PostMapping("all")
    public Page<PorukaDto> findWithFilter(@RequestBody Request<PorukaDto> request) throws NotFoundException {
        return getCrudService().findAllFiltered(request, PorukaDto.class, SecurityContextHolder.getContext().getAuthentication());
    }

}
