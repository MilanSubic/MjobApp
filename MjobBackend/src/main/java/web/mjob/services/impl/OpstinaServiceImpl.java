package web.mjob.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import web.mjob.base.CrudJpaService;
import web.mjob.models.entities.OpstinaEntity;
import web.mjob.repositories.OpstinaEntityRepository;
import web.mjob.services.OpstinaService;

@Service
@Transactional
public class OpstinaServiceImpl extends CrudJpaService<OpstinaEntity,Long> implements OpstinaService {

    public final OpstinaEntityRepository repository;

    public final ModelMapper modelMapper;


    public OpstinaServiceImpl(OpstinaEntityRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, OpstinaEntity.class);
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

}
