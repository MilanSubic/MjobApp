package web.mjob.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import web.mjob.base.CrudJpaService;
import web.mjob.models.dto.NaseljenoMjesto;
import web.mjob.models.entities.NarucilacEntity;
import web.mjob.models.entities.NaseljenoMjestoEntity;
import web.mjob.repositories.NarucilacRepository;
import web.mjob.repositories.NaseljenoMjestoRepository;
import web.mjob.services.NarucilacService;
import web.mjob.services.NaseljenoMjestoService;

@Service
@Transactional
public class NaseljenoMjestoServiceImpl  extends CrudJpaService<NaseljenoMjestoEntity,Long> implements NaseljenoMjestoService {

    public final NaseljenoMjestoRepository repository;

    public final ModelMapper modelMapper;

    public NaseljenoMjestoServiceImpl(NaseljenoMjestoRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, NaseljenoMjestoEntity.class);
        this.repository = repository;
        this.modelMapper = modelMapper;
    }
}

/*
@Service
@Transactional
public class NaseljenoMjestoServiceImpl implements NaseljenoMjestoService {
    private final NaseljenoMjestoRepository repository;
    private final ModelMapper mapper;

    @PersistenceContext
    private EntityManager manager;

    public NaseljenoMjestoServiceImpl(NaseljenoMjestoRepository repository, ModelMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public NaseljenoMjestoEntity findById(Long id) throws NotFoundException {
        return repository.findById(id).get();
    }

    @Override
    public List<NaseljenoMjesto> getAll() {
        return repository.findAll().stream().map(e->mapper.map(e, NaseljenoMjesto.class)).collect(Collectors.toList());
    }
}*/

