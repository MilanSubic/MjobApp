package web.mjob.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import web.mjob.base.CrudJpaService;
import web.mjob.models.dto.Korisnik;
import web.mjob.models.dto.Oglas;
import web.mjob.models.entities.KorisnikEntity;
import web.mjob.models.entities.KorisnikPrijavljenEntity;
import web.mjob.models.entities.OglasEntity;
import web.mjob.repositories.KorisnikEntityRepository;
import web.mjob.repositories.KorisnikPrijavljenRepository;
import web.mjob.repositories.OglasEntityRepository;
import web.mjob.services.OglasService;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class OglasServiceImpl extends CrudJpaService<OglasEntity,Long> implements OglasService {

    public final OglasEntityRepository repository;
    public final KorisnikEntityRepository korisnikEntityRepository;
    public final KorisnikPrijavljenRepository korisnikPrijavljenRepository;
    public final ModelMapper modelMapper;

    public OglasServiceImpl(OglasEntityRepository repository, KorisnikEntityRepository korisnikEntityRepository, KorisnikPrijavljenRepository korisnikPrijavljenRepository, ModelMapper modelMapper) {
        super(repository, modelMapper, OglasEntity.class);
        this.repository = repository;
        this.modelMapper = modelMapper;
        this.korisnikEntityRepository=korisnikEntityRepository;
        this.korisnikPrijavljenRepository=korisnikPrijavljenRepository;
    }

    @Override
    public List<Oglas> findAll(Authentication authentication) {
        List<OglasEntity> oglasi=repository.findAllByObrisanFalseAndAktivanDoAfter(new Timestamp(new Date().getTime()));
        KorisnikEntity korisnik=korisnikEntityRepository.findKorisnikEntityByKorisnickoIme(authentication.getName());

        List<Long> oglasiIds=new ArrayList<>();
        if(korisnik!=null)
        {
            List<KorisnikPrijavljenEntity> korisnikoviOglasi=korisnikPrijavljenRepository.findKorisnikPrijavljenEntitiesByKorisnikByKorisnikIdIs(korisnik);
            korisnikoviOglasi=korisnikoviOglasi.stream().filter((el)->!el.getOdjavljen()).toList();
            for (KorisnikPrijavljenEntity prijavljenKorisnik:korisnikoviOglasi)
                oglasiIds.add(prijavljenKorisnik.getOglasByOglasId().getId());
        }
        oglasi=oglasi.stream().filter(oglas -> !oglasiIds.contains(oglas.getId())).toList();
        List<Oglas> oglasiDTO=oglasi.stream().map(e->modelMapper.map(e,Oglas.class)).collect(Collectors.toList());
        return  oglasiDTO;
    }

    @Override
    public List<Oglas> getAllJavniOglasi() {
        return repository.findAllByJavniAndObrisan(true,false).stream().map(e->modelMapper.map(e, Oglas.class)).collect(Collectors.toList());
    }

    @Override
    public List<Oglas> getAllOglasiByNarucilacId(Long id) {
        return repository.getAllOglasiByNarucilacId(id).stream().map(e->modelMapper.map(e,Oglas.class)).collect(Collectors.toList());
    }

    @Override
    public Oglas findById(Long id){
        Optional<OglasEntity> o = repository.findById(id);
        return modelMapper.map(o, Oglas.class);
    }
    @Override
    public void delete(Long id)
    {
        OglasEntity o=repository.findOglasEntityById(id);
        o.setObrisan(true);
        repository.saveAndFlush(o);
    }

}

/*
@Service
@Transactional
public class OglasServiceImpl extends CrudJpaService<OglasEntity,Long> implements OglasService {

    public final OglasEntityRepository repository;

    private final PosaoTipEntityRepository posaoTipRepo;
    private final NarucilacEntityRepository narucilacEntityRepo;
    private final NovcanaNaknadaTipEntityRepository novcanaNaknadaTipEntityRepo;

    public final ModelMapper modelMapper;

    TypeMap<OglasEntity,Oglas> property;
    TypeMap<NarucilacEntity,Oglas> property1;

    @PersistenceContext
    private EntityManager manager;

    public OglasServiceImpl(OglasEntityRepository repository, PosaoTipEntityRepository posaoTipRepo, NarucilacEntityRepository narucilacEntityRepo, NovcanaNaknadaTipEntityRepository novcanaNaknadaTipEntityRepo, ModelMapper modelMapper) {
        super(repository, modelMapper, OglasEntity.class);
        this.repository = repository;
        this.posaoTipRepo = posaoTipRepo;
        this.narucilacEntityRepo = narucilacEntityRepo;
        this.novcanaNaknadaTipEntityRepo = novcanaNaknadaTipEntityRepo;
        this.modelMapper = modelMapper;

        this.property =this.modelMapper.createTypeMap(OglasEntity.class,Oglas.class);

        property.addMappings(
                m -> m.map(src->src.getPosaoTipByPosaoTipId().getNaziv(),Oglas::setPosaoTipNaziv)
        );
        property.addMappings(
                m->m.map(src->src.getNovcanaNaknadaTipByNovcanaNaknadaTipId().getNaziv(),Oglas::setNovcanaNaknadaTipNaziv)
        );
    }

    @Override
    public List<Oglas> findAll() {
        List<OglasEntity> oglasi=repository.findAll();
        List<Oglas> oglasiDTO=oglasi.stream().map(e->modelMapper.map(e,Oglas.class)).collect(Collectors.toList());
        return  oglasiDTO;
    }

    @Override
    public List<Oglas> getAll() {
        return repository.findAll().stream().map(e->modelMapper.map(e,Oglas.class)).collect(Collectors.toList());
    }


    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }


}

 */

