package web.mjob.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import web.mjob.base.CrudJpaService;
import web.mjob.models.dto.NovcanaNaknadaTip;
import web.mjob.models.dto.Oglas;
import web.mjob.models.entities.NovcanaNaknadaTipEntity;
import web.mjob.models.entities.OglasEntity;
import web.mjob.repositories.NovcanaNaknadaTipEntityRepository;
import web.mjob.services.NovcanaNaknadaTipService;

import java.util.List;
import java.util.stream.Collectors;


@Service
@Transactional
public class NovcanaNaknadaTipServiceImpl extends CrudJpaService<NovcanaNaknadaTipEntity,Long> implements NovcanaNaknadaTipService {

    public final NovcanaNaknadaTipEntityRepository repository;

    public final ModelMapper modelMapper;

    public NovcanaNaknadaTipServiceImpl(NovcanaNaknadaTipEntityRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, NovcanaNaknadaTipEntity.class);
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<NovcanaNaknadaTip> getAll() {
        List<NovcanaNaknadaTipEntity> tipovi=repository.findAll();
        List<NovcanaNaknadaTip> tipoviDto=tipovi.stream().map(e->modelMapper.map(e,NovcanaNaknadaTip.class)).collect(Collectors.toList());
        return  tipoviDto;
    }
}

/*
@Service
@Transactional
public class NovcanaNaknadaTipServiceImpl extends CrudJpaService<NovcanaNaknadaTipEntity,Long> implements NovcanaNaknadaTipService {

    public final NovcanaNaknadaTipEntityRepository repository;

    public final ModelMapper modelMapper;

    public NovcanaNaknadaTipServiceImpl(NovcanaNaknadaTipEntityRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, NovcanaNaknadaTipEntity.class);
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

    @Override
    public NovcanaNaknadaTipEntity findById(Long id) throws NotFoundException {
        return repository.findById(id).get();

    }

    @Override
    public List<NovcanaNaknadaTip> getAll() {
        return repository.findAll().stream().map(e -> modelMapper.map(e, NovcanaNaknadaTip.class)).collect(Collectors.toList());
    }
}

 */
