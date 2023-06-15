package web.mjob.services;

import web.mjob.base.CrudService;
import web.mjob.models.dto.Oglas;
import web.mjob.models.entities.OglasEntity;

import java.util.List;

public interface OglasService{

    List<Oglas> getAll();

    public List<Oglas> getAllOglasiByNarucilacId(Long id);

    void delete(Long id) throws Exception;

    List<Oglas> getAllJavniOglasi();
}
