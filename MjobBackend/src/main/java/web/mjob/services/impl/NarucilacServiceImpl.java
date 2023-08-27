package web.mjob.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import web.mjob.base.CrudJpaService;
import web.mjob.models.entities.NarucilacEntity;
import web.mjob.models.entities.NovcanaNaknadaTipEntity;
import web.mjob.repositories.NarucilacRepository;
import web.mjob.repositories.NovcanaNaknadaTipEntityRepository;
import web.mjob.services.NarucilacService;
import web.mjob.services.NovcanaNaknadaTipService;

@Service
@Transactional
public class NarucilacServiceImpl  extends CrudJpaService<NarucilacEntity,Long> implements NarucilacService {

    public final NarucilacRepository repository;

    public final ModelMapper modelMapper;

    public NarucilacServiceImpl(NarucilacRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, NarucilacEntity.class);
        this.repository = repository;
        this.modelMapper = modelMapper;
    }
}

/*
    @PersistenceContext
    private EntityManager manager;

    public final NarucilacRepository repository;
    private final NarucilacEntityRepository repositoryEntity;
    private final NaseljenoMjestoRepository naseljenoMjestoRepository;

    public final ModelMapper modelMapper;

    TypeMap<NarucilacEntity, Narucilac> property;

    public NarucilacServiceImpl(NarucilacRepository repository, NarucilacEntityRepository repositoryEntity, ModelMapper modelMapper, NaseljenoMjestoRepository naseljenoMjestoRepository) {
        super(repository, modelMapper, NarucilacEntity.class);
        this.repository = repository;
        this.repositoryEntity = repositoryEntity;
        this.naseljenoMjestoRepository = naseljenoMjestoRepository;
        this.modelMapper = modelMapper;
        this.property = this.modelMapper.createTypeMap(NarucilacEntity.class, Narucilac.class);
        property.addMappings(
                m -> m.map(src -> src.getNaseljenoMjestoByNaseljenoMjestoId().getNaziv(), Narucilac::setNaseljenoMjestoByNaseljenoMjestoId)
        );
    }

    @Override
    public NarucilacEntity findById(Long id) throws NotFoundException {
        return repository.findById(id).get();

    }

    @Override
    public List<Narucilac> getAll() {
        return repository.findAll().stream().map(e -> modelMapper.map(e, Narucilac.class)).collect(Collectors.toList());
    }

 */
