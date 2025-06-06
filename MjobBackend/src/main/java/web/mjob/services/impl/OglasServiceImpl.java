package web.mjob.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import web.mjob.base.CrudJpaService;
import web.mjob.models.dto.Oglas;
import web.mjob.models.dto.OglasFilterDto;
import web.mjob.models.dto.OglasListDto;
import web.mjob.models.dto.Request;
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

import java.lang.reflect.Field;
import java.sql.Timestamp;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class OglasServiceImpl extends CrudJpaService<OglasEntity,Long> implements OglasService {

    public final OglasEntityRepository repository;
    public final KorisnikEntityRepository korisnikEntityRepository;
    public final KorisnikPrijavljenRepository korisnikPrijavljenRepository;
    public final ModelMapper modelMapper;

    public final OglasStatistikaEntityRepository oglasStatRepository;

    public OglasServiceImpl(OglasEntityRepository repository, KorisnikEntityRepository korisnikEntityRepository, KorisnikPrijavljenRepository korisnikPrijavljenRepository, ModelMapper modelMapper, OglasStatistikaEntityRepository oglasStatRepository) {
        super(repository, modelMapper, OglasEntity.class);
        this.repository = repository;
        this.modelMapper = modelMapper;
        this.korisnikEntityRepository=korisnikEntityRepository;
        this.korisnikPrijavljenRepository=korisnikPrijavljenRepository;
        this.oglasStatRepository = oglasStatRepository;
    }

    @Override
    public OglasListDto findAll(Request<OglasFilterDto> request, Authentication authentication) {
        KorisnikEntity korisnik=korisnikEntityRepository.findKorisnikEntityByKorisnickoIme(authentication.getName());
        List<OglasEntity> oglasi=new ArrayList<>();

        if(korisnik==null || korisnik.getKorisnikTipId().getNaziv().equals("korisnik"))
            oglasi=repository.findAllByObrisanFalseAndAktivanDoAfter(new Timestamp(new Date().getTime()));
        else if(korisnik.getKorisnikTipId().getNaziv().equals("admin"))
        {
            oglasi=repository.findAllByObrisanFalse();
        }
        if(korisnik!=null && korisnik.getKorisnikTipId().getNaziv().equals("korisnik"))
        {
            oglasi=oglasi.stream().filter((el)->{
                List<KorisnikPrijavljenEntity> prijavljeniKorisnici=el.getKorisnikPrijavljensById();
                prijavljeniKorisnici=prijavljeniKorisnici.stream().filter(kor->kor.getOdobren()==true).toList();
                if(el.getBrojLjudi()>prijavljeniKorisnici.size())
                    return true;
                return false;
            }).toList();
            List<Long> oglasiIds=new ArrayList<>();
            List<KorisnikPrijavljenEntity> korisnikoviOglasi=korisnikPrijavljenRepository.findKorisnikPrijavljenEntitiesByKorisnikByKorisnikIdIs(korisnik);
            korisnikoviOglasi=korisnikoviOglasi.stream().filter((el)->!el.getOdjavljen()).toList();
            for (KorisnikPrijavljenEntity prijavljenKorisnik:korisnikoviOglasi)
                oglasiIds.add(prijavljenKorisnik.getOglasByOglasId().getId());
            oglasi=oglasi.stream().filter(oglas -> !oglasiIds.contains(oglas.getId())).toList();

        }
        var pageSize = request.getPageSize();
        var pageNum = request.getCurrent();

        var stream = oglasi.stream();
        var countStream = oglasi.stream();

        if(request.getFilter() != null) {
            var min = request.getFilter().getMin();
            var max = request.getFilter().getMax();
            var mjesto = request.getFilter().getMjesto();
            var tipoviPosla = request.getFilter().getPosaoTip();
            var minList = Arrays.asList(0, -1);
            var maxList = Arrays.asList(0, 1);
            if (min != null) {
                stream = stream.filter(x-> minList.contains(min.compareTo(x.getSatnica())));
                countStream = countStream.filter(x-> minList.contains(min.compareTo(x.getSatnica())));
            }
            if(max != null){
                stream = stream.filter(x-> maxList.contains(max.compareTo(x.getSatnica())));
                countStream = countStream.filter(x-> maxList.contains(max.compareTo(x.getSatnica())));
            }
            if(mjesto != null) {
                stream = stream.filter(x -> x.getMjesto().contains(mjesto));
                countStream = countStream.filter(x -> x.getMjesto().contains(mjesto));
            }
            if(tipoviPosla != null && !tipoviPosla.isEmpty()) {
                stream = stream.filter(x -> tipoviPosla.contains(x.getPosaoTipByPosaoTipId().getNaziv()));
                countStream = countStream.filter(x -> tipoviPosla.contains(x.getPosaoTipByPosaoTipId().getNaziv()));
            }
            var property = request.getProperty();
            var direction = request.getDirection();
            if(property != null && direction != null){
                stream = stream.sorted((a,b) -> {
                    if(direction.isAscending()) {
                        if (a.getDatum().compareTo(b.getDatum()) >= 0) return 1;
                        return -1;
                    } else{
                        if (a.getDatum().compareTo(b.getDatum()) >= 0) return -1;
                        return 1;
                    }
                });
                countStream = countStream.sorted((a,b) -> {
                    if(direction.isAscending()) {
                        if (a.getDatum().compareTo(b.getDatum()) >= 0) return 1;
                        return -1;
                    } else{
                        if (a.getDatum().compareTo(b.getDatum()) >= 0) return -1;
                        return 1;
                    }
                });
            }
        }

        List<Oglas> oglasiDTO=stream.skip(pageNum * pageSize).limit(pageSize).map(e->modelMapper.map(e,Oglas.class)).collect(Collectors.toList());
        var count = countStream.count();
        var totalPages = (count/pageSize) % pageSize != 0 ? count/pageSize + 1 : count/pageSize;

        return  new OglasListDto(totalPages, count, pageNum, pageSize, oglasiDTO);
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

    @Override
    public void view(Long id, Authentication authentication) {
        var name = authentication.getName();
        KorisnikEntity korisnik=korisnikEntityRepository.findKorisnikEntityByKorisnickoIme(authentication.getName());
        Optional<OglasEntity> o = repository.findById(id);

        if(o.isPresent() && (korisnik == null || !korisnik.getKorisnikTipId().getNaziv().equals(KorisnikTipEnum.Admin))){

            OglasStatistikaEntity os = new OglasStatistikaEntity();
            os.setOglas(o.get());
            os.setKorisnik(korisnik);
            os.setVrijeme(new Date());

            os.setId(null);
            oglasStatRepository.saveAndFlush(os);
        }
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

