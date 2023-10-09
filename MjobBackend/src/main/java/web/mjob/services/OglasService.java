package web.mjob.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import web.mjob.base.CrudService;
import web.mjob.models.dto.*;

import java.util.List;

public interface OglasService extends CrudService<Long> {

 /*   List<Oglas> findAll();
      List<Oglas> getAll();
      void delete(Long id);
  */
    public List<Oglas> getAllOglasiByNarucilacId(Long id);

    OglasListDto findAll(Request<OglasFilterDto> request, Authentication authentication);

    List<Oglas> getAllJavniOglasi();

    Oglas findById(Long id);
    void delete(Long id);

    void view(Long id, Authentication authentication);

}
