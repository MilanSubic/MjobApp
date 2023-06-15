package web.mjob.services.impl;

import jakarta.transaction.Transactional;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import web.mjob.exceptions.NotFoundException;
import web.mjob.models.dto.PosaoTip;
import web.mjob.models.entities.PosaoTipEntity;
import web.mjob.repositories.PosaoTipEntityRepository;
import web.mjob.services.PosaoTipService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PosaoTipServiceImpl implements PosaoTipService {
    private final PosaoTipEntityRepository repository;
    private final ModelMapper mapper;

    @PersistenceContext
    private EntityManager manager;


    public PosaoTipServiceImpl(PosaoTipEntityRepository repository, ModelMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public PosaoTipEntity findById(Long id) throws NotFoundException {
        return repository.findById(id).get();
    }

    @Override
    public List<PosaoTip> getAll() {
        return repository.findAll().stream().map(e->mapper.map(e, PosaoTip.class)).collect(Collectors.toList());
    }
}