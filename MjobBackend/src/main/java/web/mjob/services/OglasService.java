package web.mjob.services;

import web.mjob.base.CrudService;
import web.mjob.models.dto.Korisnik;
import web.mjob.models.dto.Oglas;
import java.util.List;

public interface OglasService extends CrudService<Long> {

 /*   List<Oglas> findAll();
      List<Oglas> getAll();
      void delete(Long id);
  */
    public List<Oglas> getAllOglasiByNarucilacId(Long id);

    List<Oglas> getAllJavniOglasi();

    List<Oglas> findAll();

    Oglas findById(Long id);
    void delete(Long id);

}
