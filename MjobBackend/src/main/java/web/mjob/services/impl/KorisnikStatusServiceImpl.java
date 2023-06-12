package web.mjob.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import web.mjob.base.CrudJpaService;
import web.mjob.models.entities.KorisnikPolEntity;
import web.mjob.models.entities.KorisnikStatusEntity;
import web.mjob.repositories.KorisnikPolEntityRepository;
import web.mjob.repositories.KorisnikStatusEntityRepository;
import web.mjob.services.KorisnikPolService;
import web.mjob.services.KorisnikStatusService;

@Service
@Transactional
public class KorisnikStatusServiceImpl extends CrudJpaService<KorisnikStatusEntity,Long> implements KorisnikStatusService {

    public final KorisnikStatusEntityRepository repository;

    public final ModelMapper modelMapper;


    public KorisnikStatusServiceImpl(KorisnikStatusEntityRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper,KorisnikStatusEntity.class);
        this.repository = repository;
        this.modelMapper = modelMapper;
    }


}
