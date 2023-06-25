package web.mjob.services.impl;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import web.mjob.exceptions.ConflictException;
import web.mjob.models.dto.RegistracijaDto;
import web.mjob.models.entities.*;
import web.mjob.repositories.*;
import web.mjob.services.RegistracijaService;

@Service
@Transactional
public class RegistracijaServiceImpl implements RegistracijaService {

    private final KorisnikEntityRepository korisnikEntityRepository;
    private final DokumentEntityRepository dokumentEntityRepository;
    private final DokumentSadrzajEntityRepository dokumentSadrzajEntityRepository;
    private final KorisnikDokumentEntityRepository korisnikDokumentEntityRepository;
    public final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

    @PersistenceContext
    private EntityManager entityManager;
    private KorisnikStatusEntityRepository korisnikStatusRepository;

    public RegistracijaServiceImpl(KorisnikEntityRepository korisnikEntityRepository, DokumentEntityRepository dokumentEntityRepository,
                                   DokumentSadrzajEntityRepository dokumentSadrzajEntityRepository,KorisnikStatusEntityRepository korisnikStatusRepository, KorisnikDokumentEntityRepository korisnikDokumentEntityRepository, ModelMapper modelMapper, PasswordEncoder passwordEncoder){
        this.korisnikEntityRepository=korisnikEntityRepository;
        this.dokumentEntityRepository=dokumentEntityRepository;
        this.dokumentSadrzajEntityRepository = dokumentSadrzajEntityRepository;
        this.korisnikDokumentEntityRepository=korisnikDokumentEntityRepository;
        this.korisnikStatusRepository=korisnikStatusRepository;
        this.modelMapper=modelMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public boolean signup(RegistracijaDto korisnik) throws ConflictException {
        if(korisnikEntityRepository.findKorisnikEntityByKorisnickoIme(korisnik.getEmail()) != null)
            throw new ConflictException("Korisnicko ime je zauzeto");
        KorisnikEntity entity = modelMapper.map(korisnik, KorisnikEntity.class);
        entity.setId(null);
        KorisnikStatusEntity status= korisnikStatusRepository.findKorisnikStatusEntityByNaziv("neobradjen");
        entity.setKorisnikStatusId(status);
        entity.setKorisnickoIme(entity.getEmail());
        entity.setLozinka(passwordEncoder.encode(entity.getLozinka()));
        entity = korisnikEntityRepository.saveAndFlush(entity);
        //entityManager.refresh(entity);

        KorisnikEntity finalEntity = entity;
        korisnik.getDokumenti().forEach(d->{
            DokumentEntity dokument = modelMapper.map(d, DokumentEntity.class);
            dokument.setId(null);
            dokumentEntityRepository.saveAndFlush(dokument);

            DokumentSadrzajEntity sadrzaj = new DokumentSadrzajEntity();
            sadrzaj.setDokumentByDokumentId(dokument);
            sadrzaj.setSadrzaj(d.getSadrzaj());
            sadrzaj.setId(null);
            dokumentSadrzajEntityRepository.saveAndFlush(sadrzaj);

            KorisnikDokumentEntity korisnikDokument=new KorisnikDokumentEntity();
            korisnikDokument.setDokumentByDokumentId(dokument);
            korisnikDokument.setKorisnikByKorisnikId(finalEntity);
            korisnikDokument.setId(null);
            korisnikDokumentEntityRepository.saveAndFlush(korisnikDokument);

        });

        return true;
    }
}
