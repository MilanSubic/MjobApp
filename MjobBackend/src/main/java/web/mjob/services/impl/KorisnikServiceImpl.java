package web.mjob.services.impl;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import web.mjob.exceptions.NotFoundException;
import web.mjob.models.dto.DokumentSadrzaj;
import web.mjob.models.dto.Korisnik;
import web.mjob.models.entities.DokumentEntity;
import web.mjob.models.entities.DokumentSadrzajEntity;
import web.mjob.models.entities.KorisnikEntity;
import web.mjob.repositories.DokumentSadrzajRepository;
import web.mjob.repositories.KorisnikEntityRepository;
import web.mjob.services.KorisnikService;

import javax.persistence.criteria.CriteriaBuilder;
import java.io.FileInputStream;
import java.io.InputStream;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class KorisnikServiceImpl implements KorisnikService {

    public final KorisnikEntityRepository repository;
    public  final DokumentSadrzajRepository dokumentSadrzajRepository;
    private final ModelMapper mapper;
    @PersistenceContext
    private EntityManager manager;
    public KorisnikServiceImpl(KorisnikEntityRepository repository,DokumentSadrzajRepository dokumentSadrzajRepository ,ModelMapper modelMapper)
    {
        this.repository = repository;
        this.mapper=modelMapper;
        this.dokumentSadrzajRepository=dokumentSadrzajRepository;
    }

    @Override
    public KorisnikEntity getUserByUsername(String username) {

        return repository.findKorisnikEntityByKorisnickoIme(username);
    }
    @Override
    public List<Korisnik> findAll()
    {
        List<KorisnikEntity> korisnici=repository.findAll();
        List<Korisnik>korisniciDTO=korisnici.stream().map(e->mapper.map(e,Korisnik.class)).collect(Collectors.toList());

        return  korisniciDTO;
    }
    @Override
    public void insert() throws Exception {
        DokumentSadrzajEntity entity=new DokumentSadrzajEntity();

        entity.setContentType("sadrzaj");
        entity.setDokumentByDokumentId(new DokumentEntity());
        InputStream in = new FileInputStream("C:\\Users\\Korisnik\\Desktop\\slika.jpg");

        entity.setSadrzaj(in.readAllBytes());
        entity=dokumentSadrzajRepository.saveAndFlush(entity);
        manager.refresh(entity);
    }
    @Override
    public Korisnik update(Long id)throws NotFoundException
    {
        List<KorisnikEntity>li=repository.findAll();
        KorisnikEntity korisnik=repository.getById(id);
        korisnik.setDatumUclanjenja(new Timestamp(new Date().getTime()));
        korisnik = repository.saveAndFlush(korisnik);
        manager.refresh(korisnik);
        return mapper.map(korisnik,Korisnik.class);
    }
    @Override
    public <T> List<T> findAll(Class<T> resultDtoClass) throws NotFoundException {
        return null;
    }

    @Override
    public <T> T findById(Long aLong, Class<T> resultDtoClass) throws NotFoundException {
        return null;
    }

    @Override
    public <T, U> T insert(U object, Class<T> resultDtoClass) throws NotFoundException {
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
