package web.mjob.services;

import web.mjob.exceptions.NotFoundException;
import web.mjob.models.dto.NovcanaNaknadaTip;
import web.mjob.models.entities.NovcanaNaknadaTipEntity;

import java.util.List;



import web.mjob.base.CrudService;

public interface NovcanaNaknadaTipService extends CrudService<Long> {
   /* NovcanaNaknadaTipEntity findById(Long id) throws NotFoundException;

    */
   List<NovcanaNaknadaTip> getAll();

}
