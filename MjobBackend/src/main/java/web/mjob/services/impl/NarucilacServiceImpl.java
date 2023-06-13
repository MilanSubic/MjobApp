package web.mjob.services.impl;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.stereotype.Service;
import web.mjob.exceptions.NotFoundException;
import web.mjob.models.dto.Narucilac;
import web.mjob.models.dto.Oglas;
import web.mjob.models.entities.NarucilacEntity;
import web.mjob.models.entities.OglasEntity;
import web.mjob.repositories.NarucilacEntityRepository;
import web.mjob.repositories.NaseljenoMjestoRepository;
import web.mjob.services.NarucilacService;


import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class NarucilacServiceImpl implements NarucilacService {
    private final NarucilacEntityRepository repository;
    private final NaseljenoMjestoRepository naseljenoMjestoRepository;
    private final ModelMapper mapper;

    TypeMap<NarucilacEntity, Narucilac> property;

    @PersistenceContext
    private EntityManager manager;


    public NarucilacServiceImpl(NarucilacEntityRepository repository, ModelMapper mapper,
                                NaseljenoMjestoRepository naseljenoMjestoRepository) {
        this.repository = repository;
        this.mapper = mapper;
        this.naseljenoMjestoRepository=naseljenoMjestoRepository;

        this.property =this.mapper.createTypeMap(NarucilacEntity.class,Narucilac.class);

        property.addMappings(
                m-> m.map(src->src.getNaseljenoMjestoByNaseljenoMjestoId().getNaziv(),Narucilac::setNaseljenoMjestoByNaseljenoMjestoId)
        );
    }


    @Override
    public NarucilacEntity findById(Long id) throws NotFoundException {
        return repository.findById(id).get();

    }

    @Override
    public List<Narucilac> getAll() {
        return repository.findAll().stream().map(e->mapper.map(e, Narucilac.class)).collect(Collectors.toList());
    }
}
