package web.mjob.services;

import web.mjob.base.CrudService;
import web.mjob.models.dto.Oglas;

import java.util.List;

public interface OglasService extends CrudService<Long> {

    List<Oglas> findAll();
}
