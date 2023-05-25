package web.mjob.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import web.mjob.base.CrudJpaService;
import web.mjob.models.entities.KorisnikPolEntity;
import web.mjob.models.entities.NaseljenoMjestoEntity;
import web.mjob.repositories.KorisnikPolEntityRepository;
import web.mjob.repositories.NaseljenoMjestoEntityRepository;
import web.mjob.services.KorisnikPolService;
import web.mjob.services.NaseljenoMjestoService;

@Service
@Transactional
public class NaseljenoMjestoServiceImpl extends CrudJpaService<NaseljenoMjestoEntity,Long> implements NaseljenoMjestoService {

    public final NaseljenoMjestoEntityRepository repository;

    public final ModelMapper modelMapper;


    public NaseljenoMjestoServiceImpl(NaseljenoMjestoEntityRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, NaseljenoMjestoEntity.class);
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

}
