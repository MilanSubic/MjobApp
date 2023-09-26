package web.mjob.services.impl;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import web.mjob.exceptions.NotFoundException;
import web.mjob.models.dto.Korisnik;
import web.mjob.models.dto.Oglas;
import web.mjob.models.dto.Request;
import web.mjob.models.entities.*;
import web.mjob.repositories.*;
import web.mjob.services.EmailService;
import web.mjob.services.KorisnikService;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class KorisnikServiceImpl implements KorisnikService {

    public final KorisnikEntityRepository repository;
    public final KorisnikDokumentEntityRepository korisnikDokumentEntityRepository;
    public  final DokumentSadrzajRepository dokumentSadrzajRepository;
    public  final KorisnikStatusEntityRepository korisnikStatusRepository;
    private final KorisnikPrijavljenRepository korisnikPrijavljenRepository;
    private final ModelMapper mapper;
    private final EmailService emailService;
    private  final KorisnikTipEntityRepository korisnikTipEntityRepository;
    public KorisnikServiceImpl(KorisnikEntityRepository repository,
                               KorisnikPrijavljenRepository korisnikPrijavljenRepository,
                               DokumentSadrzajRepository dokumentSadrzajRepository,
                               KorisnikStatusEntityRepository korisnikStatusRepository,
                               KorisnikDokumentEntityRepository korisnikDokumentEntityRepository,
                               ModelMapper modelMapper,
                               EmailService emailService,
                               KorisnikTipEntityRepository korisnikTipEntityRepository)
    {
        this.repository = repository;
        this.mapper=modelMapper;
        this.dokumentSadrzajRepository=dokumentSadrzajRepository;
        this.korisnikDokumentEntityRepository=korisnikDokumentEntityRepository;
        this.korisnikStatusRepository=korisnikStatusRepository;
        this.korisnikPrijavljenRepository=korisnikPrijavljenRepository;
        this.emailService=emailService;
        this.korisnikTipEntityRepository=korisnikTipEntityRepository;
    }
    @Override
    public Korisnik getUser(Authentication authentication)
    {
        return mapper.map(repository.findKorisnikEntityByKorisnickoIme(authentication.getName()),Korisnik.class);
    }
    @Override
    public Korisnik getUserByUsername(String username) {

        return mapper.map(repository.findKorisnikEntityByKorisnickoIme(username),Korisnik.class);
    }
    @Override
    public List<Korisnik> findAll()
    {
        List<KorisnikEntity> korisnici=repository.findAll();
        KorisnikTipEntity tip=korisnikTipEntityRepository.findKorisnikTipEntityByNaziv("admin");
        korisnici=korisnici.stream().filter(korisnik -> korisnik.getKorisnikTipId()!=tip).toList();
        List<Korisnik>korisniciDTO=korisnici.stream().map(e->mapper.map(e,Korisnik.class)).collect(Collectors.toList());
       return  korisniciDTO;
    }
    public List<Oglas> getAllUserJobs(Long id)
    {
        KorisnikEntity korisnik=repository.getReferenceById(id);
        List<KorisnikPrijavljenEntity> oglasi=korisnikPrijavljenRepository.findKorisnikPrijavljenEntitiesByKorisnikByKorisnikId(korisnik);

        List<OglasEntity> oglasEntities=new ArrayList<>();
        for (KorisnikPrijavljenEntity oglas: oglasi.stream().filter(KorisnikPrijavljenEntity::getOdobren).toList()) {
            oglasEntities.add(oglas.getOglasByOglasId());
        }
        return oglasEntities.stream().map(e->mapper.map(e,Oglas.class)).collect(Collectors.toList());
    }

    @Override
    public void acceptRegistration(Long id, Integer brojClanskeKarte)
    {
        KorisnikEntity korisnik=repository.findKorisnikEntityById(id);
        korisnik.setDatumUclanjenja(new Timestamp(new Date().getTime()));
        KorisnikStatusEntity status= korisnikStatusRepository.findKorisnikStatusEntityByNaziv("aktivan");
        korisnik.setKorisnikStatusId(status);
        korisnik.setBrojClanskeKarte(brojClanskeKarte);
        korisnik = repository.saveAndFlush(korisnik);
        emailService.sendSimpleMailApproved(korisnik.getEmail(),brojClanskeKarte);
    }
    @Override
    public void refuseRegistration(Long id)
    {
        KorisnikEntity korisnik=repository.findKorisnikEntityById(id);
        KorisnikStatusEntity status= korisnikStatusRepository.findKorisnikStatusEntityByNaziv("odbijen");
        korisnik.setKorisnikStatusId(status);
        repository.saveAndFlush(korisnik);
        emailService.sendSimpleMailNotApproved(korisnik.getEmail());
    }
    @Override
    public void deleteAccount(Long id)
    {
        KorisnikEntity korisnik=repository.findKorisnikEntityById(id);
        KorisnikStatusEntity status= korisnikStatusRepository.findKorisnikStatusEntityByNaziv("obrisan");
        korisnik.setKorisnikStatusId(status);
        repository.saveAndFlush(korisnik);
        emailService.sendSimpleMailDeleted(korisnik.getEmail());
    }
    @Override
    public void reactivateUser(Long id)
    {
        KorisnikEntity korisnik=repository.findKorisnikEntityById(id);
        KorisnikStatusEntity status= korisnikStatusRepository.findKorisnikStatusEntityByNaziv("aktivan");
        korisnik.setKorisnikStatusId(status);
        korisnik = repository.saveAndFlush(korisnik);
        emailService.sendSimpleMailAboutReactivation(korisnik.getEmail());
    }
    @Override
    public <T> List<T> findAll(Class<T> resultDtoClass) throws NotFoundException {
        return null;
    }

    @Override
    public <T> Page<T> findAll(Pageable page, Class<T> resultDtoClass) throws NotFoundException {
        return null;
    }

    @Override
    public <T, F> Page<T> findAllFiltered(Request<T> request, Class<T> resultDtoClass, Authentication authentication) {
        return null;
    }

    @Override
    public <T> T findById(Long aLong, Class<T> resultDtoClass) throws NotFoundException {
        return null;
    }

    @Override
    public <T, U> T insert(U object, Class<T> resultDtoClass, Authentication authentication) throws NotFoundException {
        return null;
    }

    @Override
    public <T, U> T update(Long aLong, U object, Class<T> resultDtoClass) throws NotFoundException {
        return null;
    }

    @Override
    public void delete(Long aLong) throws NotFoundException {

    }
}
