package web.mjob.services.impl;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import web.mjob.exceptions.NotFoundException;
import web.mjob.models.dto.NaseljenoMjesto;
import web.mjob.models.entities.NaseljenoMjestoEntity;
import web.mjob.repositories.NaseljenoMjestoRepository;
import web.mjob.services.NaseljenoMjestoService;

import java.util.List;
import java.util.stream.Collectors;
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
}
