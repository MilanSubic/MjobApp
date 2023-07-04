package web.mjob.services;

import web.mjob.base.CrudService;
import web.mjob.models.dto.PosaoTipDto;

public interface PosaoTipService extends CrudService<Long> {
    PosaoTipDto getPosaoTipById(Long id);
}
