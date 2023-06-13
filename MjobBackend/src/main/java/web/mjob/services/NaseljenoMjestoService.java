package web.mjob.services;

import web.mjob.exceptions.NotFoundException;
import web.mjob.models.dto.NaseljenoMjesto;
import web.mjob.models.entities.NaseljenoMjestoEntity;


import java.util.List;

public interface NaseljenoMjestoService {
    NaseljenoMjestoEntity findById(Long id) throws NotFoundException;
    List<NaseljenoMjesto> getAll();
}
