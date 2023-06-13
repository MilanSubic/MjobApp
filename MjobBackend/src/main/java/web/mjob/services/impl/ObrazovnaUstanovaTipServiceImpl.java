package web.mjob.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import web.mjob.base.CrudJpaService;
import web.mjob.models.entities.KorisnikPolEntity;
import web.mjob.models.entities.ObrazovnaUstanovaTipEntity;
import web.mjob.repositories.KorisnikPolEntityRepository;
import web.mjob.repositories.ObrazovnaUstanovaTipEntityRepository;
import web.mjob.services.KorisnikPolService;
import web.mjob.services.ObrazovnaUstanovaTipService;

@Service
@Transactional
public class ObrazovnaUstanovaTipServiceImpl extends CrudJpaService<ObrazovnaUstanovaTipEntity,Long> implements ObrazovnaUstanovaTipService {

    public final ObrazovnaUstanovaTipEntityRepository repository;

    public final ModelMapper modelMapper;


    public ObrazovnaUstanovaTipServiceImpl(ObrazovnaUstanovaTipEntityRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, ObrazovnaUstanovaTipEntity.class);
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

}
