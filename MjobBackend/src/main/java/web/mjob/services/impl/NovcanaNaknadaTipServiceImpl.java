package web.mjob.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import web.mjob.base.CrudJpaService;
import web.mjob.models.entities.NovcanaNaknadaTipEntity;
import web.mjob.repositories.NovcanaNaknadaTipEntityRepository;
import web.mjob.services.NovcanaNaknadaTipService;


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
}
