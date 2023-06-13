package web.mjob.services.impl;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import web.mjob.exceptions.NotFoundException;
import web.mjob.models.dto.NovcanaNaknadaTip;
import web.mjob.models.entities.NovcanaNaknadaTipEntity;
import web.mjob.repositories.NovcanaNaknadaTipEntityRepository;
import web.mjob.services.NovcanaNaknadaTipService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional

public class NovcanaNaknadaTipServiceImpl implements NovcanaNaknadaTipService {
    private final NovcanaNaknadaTipEntityRepository repository;
    private final ModelMapper mapper;
    @PersistenceContext
    private EntityManager manager;

    public NovcanaNaknadaTipServiceImpl(NovcanaNaknadaTipEntityRepository repository, ModelMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }


    @Override
    public NovcanaNaknadaTipEntity findById(Long id) throws NotFoundException {
        return repository.findById(id).get();

    }

    @Override
    public List<NovcanaNaknadaTip> getAll() {
        return repository.findAll().stream().map(e->mapper.map(e, NovcanaNaknadaTip.class)).collect(Collectors.toList());
    }
}
