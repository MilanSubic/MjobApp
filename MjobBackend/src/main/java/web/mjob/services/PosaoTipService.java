package web.mjob.services;

import web.mjob.exceptions.NotFoundException;
import web.mjob.models.dto.PosaoTip;
import web.mjob.models.entities.PosaoTipEntity;

import java.util.List;

public interface PosaoTipService {
    PosaoTipEntity findById(Long id) throws NotFoundException;
    List<PosaoTip> getAll();
}
