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
