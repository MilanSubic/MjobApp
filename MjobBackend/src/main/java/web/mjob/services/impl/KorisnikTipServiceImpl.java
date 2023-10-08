package web.mjob.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import web.mjob.base.CrudJpaService;
import web.mjob.models.entities.KorisnikTipEntity;
import web.mjob.repositories.KorisnikTipEntityRepository;
import web.mjob.services.KorisnikTipService;

@Service
@Transactional
public class KorisnikTipServiceImpl extends CrudJpaService<KorisnikTipEntity,Long> implements KorisnikTipService {

    public final KorisnikTipEntityRepository repository;

    public final ModelMapper modelMapper;


    public KorisnikTipServiceImpl(KorisnikTipEntityRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, KorisnikTipEntity.class);
        this.repository = repository;
        this.modelMapper = modelMapper;
    }
}
