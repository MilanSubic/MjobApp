package web.mjob.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import web.mjob.base.CrudJpaService;
import web.mjob.models.entities.ObrazovnaUstanovaTipEntity;
import web.mjob.models.entities.OglasEntity;
import web.mjob.repositories.ObrazovnaUstanovaTipEntityRepository;
import web.mjob.repositories.OglasEntityRepository;
import web.mjob.services.OglasService;

@Service
@Transactional
public class OglasServiceImpl extends CrudJpaService<OglasEntity,Long> implements OglasService {

    public final OglasEntityRepository repository;

    public final ModelMapper modelMapper;

    public OglasServiceImpl(OglasEntityRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, OglasEntity.class);
        this.repository = repository;
        this.modelMapper = modelMapper;
    }
}
