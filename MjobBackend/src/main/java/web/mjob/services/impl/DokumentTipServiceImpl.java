package web.mjob.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import web.mjob.base.CrudJpaService;
import web.mjob.models.entities.DokumentTipEntity;
import web.mjob.models.entities.OpstinaEntity;
import web.mjob.repositories.DokumentTipEntityRepository;
import web.mjob.repositories.OpstinaEntityRepository;
import web.mjob.services.DokumentTipService;
import web.mjob.services.OpstinaService;

@Service
@Transactional
public class DokumentTipServiceImpl extends CrudJpaService<DokumentTipEntity,Long> implements DokumentTipService {

    public final DokumentTipEntityRepository repository;

    public final ModelMapper modelMapper;


    public DokumentTipServiceImpl(DokumentTipEntityRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, DokumentTipEntity.class);
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

}
