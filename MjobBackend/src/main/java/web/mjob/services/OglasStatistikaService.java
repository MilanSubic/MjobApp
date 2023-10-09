package web.mjob.services;

import org.springframework.security.core.Authentication;
import web.mjob.base.CrudService;
import web.mjob.models.dto.Oglas;
import web.mjob.models.dto.OglasStatistikaDto;
import web.mjob.models.entities.OglasStatistikaEntity;

import java.util.List;

public interface OglasStatistikaService extends CrudService<Long> {}
