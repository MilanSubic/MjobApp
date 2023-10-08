package web.mjob.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;
import web.mjob.base.CrudJpaService;
import web.mjob.models.dto.Oglas;
import web.mjob.models.dto.OglasStatistikaDto;
import web.mjob.models.entities.KorisnikEntity;
import web.mjob.models.entities.KorisnikPrijavljenEntity;
import web.mjob.models.entities.OglasEntity;
import web.mjob.models.entities.OglasStatistikaEntity;
import web.mjob.models.enums.KorisnikTipEnum;
import web.mjob.repositories.KorisnikEntityRepository;
import web.mjob.repositories.KorisnikPrijavljenRepository;
import web.mjob.repositories.OglasEntityRepository;
import web.mjob.repositories.OglasStatistikaEntityRepository;
import web.mjob.services.OglasService;
import web.mjob.services.OglasStatistikaService;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class OglasStatistikaServiceImpl extends CrudJpaService<OglasStatistikaEntity,Long> implements OglasStatistikaService {

    public final OglasStatistikaEntityRepository repository;
    public final KorisnikEntityRepository korisnikEntityRepository;
    public final ModelMapper modelMapper;

    public OglasStatistikaServiceImpl(OglasStatistikaEntityRepository repository, KorisnikEntityRepository korisnikEntityRepository, ModelMapper modelMapper) {
        super(repository, modelMapper, OglasStatistikaEntity.class);
        this.repository = repository;
        this.modelMapper = modelMapper;
        this.korisnikEntityRepository=korisnikEntityRepository;
    }
}