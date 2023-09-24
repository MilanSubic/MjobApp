package web.mjob.services;

import web.mjob.base.CrudService;
import web.mjob.exceptions.NotFoundException;
import web.mjob.models.dto.PosaoTip;
import web.mjob.models.dto.PosaoTipDto;
import web.mjob.models.entities.PosaoTipEntity;

import java.util.List;

public interface PosaoTipService extends CrudService<Long> {
  /*  PosaoTipDto getPosaoTipById(Long id);
    PosaoTipEntity findById(Long id) throws NotFoundException;
    List<PosaoTip> getAll();

   */
  PosaoTipDto getPosaoTipById(Long id);

    List<PosaoTipDto> getAll();
}
