package web.mjob.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import web.mjob.base.CrudJpaService;
import web.mjob.models.entities.KorisnikPolEntity;
import web.mjob.repositories.KorisnikPolEntityRepository;
import web.mjob.services.KorisnikPolService;

@Service
@Transactional
public class KorisnikPolServiceImpl extends CrudJpaService<KorisnikPolEntity,Long> implements KorisnikPolService {

    public final KorisnikPolEntityRepository repository;

    public final ModelMapper modelMapper;


    public KorisnikPolServiceImpl(KorisnikPolEntityRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, KorisnikPolEntity.class);
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

}
