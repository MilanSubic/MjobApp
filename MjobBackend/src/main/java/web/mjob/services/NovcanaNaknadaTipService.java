package web.mjob.services;

import web.mjob.exceptions.NotFoundException;
import web.mjob.models.dto.NovcanaNaknadaTip;
import web.mjob.models.dto.PosaoTip;
import web.mjob.models.entities.NovcanaNaknadaTipEntity;

import java.util.List;

public interface NovcanaNaknadaTipService {
    NovcanaNaknadaTipEntity findById(Long id) throws NotFoundException;
    List<NovcanaNaknadaTip> getAll();
}
