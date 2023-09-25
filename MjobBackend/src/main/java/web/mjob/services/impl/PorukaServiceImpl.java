package web.mjob.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import web.mjob.base.CrudJpaService;
import web.mjob.exceptions.NotFoundException;
import web.mjob.models.dto.DokumentPorukaDto;
import web.mjob.models.dto.PorukaDto;
import web.mjob.models.dto.Request;
import web.mjob.models.entities.*;
import web.mjob.models.enums.KorisnikTipEnum;
import web.mjob.repositories.*;
import web.mjob.services.PorukaService;
import web.mjob.util.UnpagedSorted;

import java.util.ArrayList;
import java.util.Date;

@Service
@Transactional
public class PorukaServiceImpl extends CrudJpaService<PorukaEntity,Long> implements PorukaService {

    public final PorukaEntityRepository repository;
    private final KonverzacijaKorisnikEntityRepository konverzacijaKorisniRepo;
    private final KorisnikEntityRepository korisniRepo;
    private final DokumentEntityRepository dokumentEntityRepository;
    private final DokumentSadrzajEntityRepository dokumentSadrzajEntityRepository;
    private final DokumentPorukaEntityRepository dokumentPorukaEntityRepository;
    private final KorisnikEntityRepository korisnikEntityRepository;

    public final ModelMapper modelMapper;


    public PorukaServiceImpl(PorukaEntityRepository repository, KonverzacijaKorisnikEntityRepository konverzacijaKorisniRepo,
                             KorisnikEntityRepository korisniRepo, DokumentEntityRepository dokumentEntityRepository,
                             DokumentSadrzajEntityRepository dokumentSadrzajEntityRepository, DokumentPorukaEntityRepository dokumentPorukaEntityRepository,
                             KorisnikEntityRepository korisnikEntityRepository, ModelMapper modelMapper) {
        super(repository, modelMapper, PorukaEntity.class);
        this.repository = repository;
        this.konverzacijaKorisniRepo = konverzacijaKorisniRepo;
        this.korisniRepo = korisniRepo;
        this.dokumentEntityRepository = dokumentEntityRepository;
        this.dokumentSadrzajEntityRepository = dokumentSadrzajEntityRepository;
        this.dokumentPorukaEntityRepository = dokumentPorukaEntityRepository;
        this.korisnikEntityRepository = korisnikEntityRepository;
        this.modelMapper = modelMapper;
    }

    public <T, F> Page<T> findAllFiltered(Request<T> request, Class<T> resultDtoClass, Authentication authentication) throws NotFoundException {
        var sort = Sort.unsorted();
        var name = authentication.getName();

        if(request.getProperty() != null){
            sort = Sort.by(request.getDirection(),request.getProperty());
        }
        var page = request.getPageSize() > 0 ? PageRequest.of(request.getCurrent(), request.getPageSize(), sort) : new UnpagedSorted(sort);

        if (request.getFilter() != null) {
            var f = getModelMapper().map(request.getFilter(), PorukaEntity.class);
            var korisnik = korisniRepo.findKorisnikEntityByKorisnickoIme(name);
            var konverzacijaKorisnik = konverzacijaKorisniRepo.findByKonverzacijaIdAndKorisnikKorisnickoIme(f.getKonverzacija().getId(),name);
            if(konverzacijaKorisnik != null){
                konverzacijaKorisnik.setProcitana(true);
            } else {
                konverzacijaKorisnik = new KonverzacijaKorisnikEntity();
                konverzacijaKorisnik.setKonverzacija(f.getKonverzacija());
                konverzacijaKorisnik.setKorisnik(korisnik);
                konverzacijaKorisnik.setProcitana(true);
            }
            konverzacijaKorisniRepo.saveAndFlush(konverzacijaKorisnik);

            return repository.findByKonverzacijaAndKorisnik(f.getKonverzacija().getId(), korisnik.getId(), page).map(e -> getModelMapper().map(e, resultDtoClass));
        }
        throw new NotFoundException("Nije specifikovana konverzacija");
    }

    @Override
    public <T, U> T insert(U object, Class<T> resultDtoClass, Authentication authentication) {
        var obj = (PorukaDto) object;
        obj.setKreirana(new Date());
        obj.setKorisnikId(korisnikEntityRepository.findKorisnikEntityByKorisnickoIme(authentication.getName()).getId());
        var dto = super.insert(object, resultDtoClass, authentication);

        var konverzacijaKorisnici =
                konverzacijaKorisniRepo.findAllByKonverzacijaIdAndKorisnikKorisnickoImeNot(obj.getKonverzacijaId(), authentication.getName());

        var vrijeme = new Date();
        konverzacijaKorisnici.forEach(k -> {
            k.setProcitana(false);
            k.setVrijeme(vrijeme);
            konverzacijaKorisniRepo.saveAndFlush(k);
        });

        var dokumenti = new ArrayList<DokumentPorukaEntity>();

        obj.getDokumenti().forEach(x -> {
            DokumentEntity dokument = modelMapper.map(x.getDokument(), DokumentEntity.class);
            dokument.setId(null);
            dokumentEntityRepository.saveAndFlush(dokument);

            DokumentSadrzajEntity sadrzaj = new DokumentSadrzajEntity();
            sadrzaj.setDokumentByDokumentId(dokument);
            sadrzaj.setSadrzaj(x.getDokument().getSadrzaj());
            sadrzaj.setId(null);
            dokumentSadrzajEntityRepository.saveAndFlush(sadrzaj);

            DokumentPorukaEntity dokumentPoruka = new DokumentPorukaEntity();
            dokumentPoruka.setDokumentEntity(dokument);
            dokumentPoruka.setPorukaEntity(modelMapper.map(dto, PorukaEntity.class));
            dokumentPoruka.setId(null);
            dokumentPorukaEntityRepository.saveAndFlush(dokumentPoruka);

            dokumenti.add(dokumentPoruka);
        });

        ((PorukaDto)dto).setDokumenti(dokumenti.stream().map(x->getModelMapper().map(x, DokumentPorukaDto.class)).toList());

        return dto;
    }
}
