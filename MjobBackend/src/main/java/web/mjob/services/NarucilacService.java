package web.mjob.services;

import web.mjob.exceptions.NotFoundException;
import web.mjob.models.dto.Narucilac;
import web.mjob.models.dto.NarucilacDto;
import web.mjob.models.dto.PosaoTip;
import web.mjob.models.entities.NarucilacEntity;
import web.mjob.models.entities.PosaoTipEntity;

import java.util.List;

import web.mjob.base.CrudService;

public interface NarucilacService extends CrudService<Long> {
    List<NarucilacDto> getAll();
  /*  NarucilacEntity findById(Long id) throws NotFoundException;
    List<Narucilac> getAll();

   */

}
