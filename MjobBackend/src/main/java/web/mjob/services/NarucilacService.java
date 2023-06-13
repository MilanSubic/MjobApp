package web.mjob.services;

import web.mjob.exceptions.NotFoundException;
import web.mjob.models.dto.Narucilac;
import web.mjob.models.dto.PosaoTip;
import web.mjob.models.entities.NarucilacEntity;
import web.mjob.models.entities.PosaoTipEntity;

import java.util.List;

public interface NarucilacService {
    NarucilacEntity findById(Long id) throws NotFoundException;
    List<Narucilac> getAll();
}
