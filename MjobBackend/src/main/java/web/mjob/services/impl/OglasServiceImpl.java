package web.mjob.services.impl;

import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import web.mjob.models.dto.Oglas;
import web.mjob.repositories.OglasEntityRepository;
import web.mjob.services.OglasService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class OglasServiceImpl implements OglasService {
    private final ModelMapper modelMapper;
    private final OglasEntityRepository repository;

    public OglasServiceImpl(ModelMapper modelMapper, OglasEntityRepository repository) {
        this.modelMapper = modelMapper;
        this.repository = repository;
    }

    @Override
    public List<Oglas> findAll() {
        return repository.findAll().stream().map(a -> modelMapper.map(a, Oglas.class)).collect(Collectors.toList());
    }
}