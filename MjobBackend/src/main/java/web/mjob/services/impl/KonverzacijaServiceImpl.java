package web.mjob.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import web.mjob.base.CrudJpaService;
import web.mjob.models.dto.KonverzacijaDto;
import web.mjob.models.dto.Request;
import web.mjob.models.entities.KonverzacijaEntity;
import web.mjob.models.entities.KonverzacijaKorisnikEntity;
import web.mjob.models.enums.KorisnikTipIdEnum;
import web.mjob.repositories.KonverzacijaEntityRepository;
import web.mjob.repositories.KonverzacijaKorisnikEntityRepository;
import web.mjob.repositories.KorisnikEntityRepository;
import web.mjob.services.KonverzacijaService;
import web.mjob.models.enums.KorisnikTipEnum;
import web.mjob.util.UnpagedSorted;

import java.util.Date;

@Service
@Transactional
public class KonverzacijaServiceImpl extends CrudJpaService<KonverzacijaEntity,Long> implements KonverzacijaService {
    private final KonverzacijaEntityRepository repository;
    private final KorisnikEntityRepository korisniciRepo;
    private final KonverzacijaKorisnikEntityRepository konverzacijaKOrisnikRepo;
    public KonverzacijaServiceImpl(KonverzacijaEntityRepository repository, ModelMapper modelMapper, KorisnikEntityRepository korisniciRepo, KonverzacijaKorisnikEntityRepository konverzacijaKOrisnikRepo) {
        super(repository, modelMapper, KonverzacijaEntity.class);
        this.repository = repository;
        this.korisniciRepo = korisniciRepo;
        this.konverzacijaKOrisnikRepo = konverzacijaKOrisnikRepo;
    }

    @Override
    public <T, F> Page<T> findAllFiltered(Request<T> request, Class<T> resultDtoClass, Authentication authentication) {

        var sort = Sort.by(Sort.Direction.DESC, "id");
        var name = authentication.getName();

        var korisnik = korisniciRepo.findKorisnikEntityByKorisnickoIme(name);
        if(request.getProperty() != null){
            sort = Sort.by(request.getDirection(),request.getProperty());
        }
        var page = request.getPageSize() > 0 ? PageRequest.of(request.getCurrent(), request.getPageSize(), sort) : new UnpagedSorted(sort);

        if (request.getFilter() != null) {
            var f = getModelMapper().map(request.getFilter(), KonverzacijaEntity.class);

            return repository.findAllByKornikUkonverzaciji(korisnik.getId(), f.getTema(), page).map(e -> map(name, e));
        }
        return repository.findAllByKornikUkonverzaciji(korisnik.getId(), null, page).map(e -> map(name, e));
    }

    private <T> T map (String name, KonverzacijaEntity entity) {
        var dto = new KonverzacijaDto();

        dto.setId(entity.getId());
        dto.setTema(entity.getTema());
        dto.setKorisnikIme(entity.getKorisnik().getIme());
        dto.setKorisnikPrezime(entity.getKorisnik().getPrezime());
        dto.setProcitana(entity.getKonverzacijaKorisniks().stream().anyMatch(x->x.getKorisnik().getKorisnickoIme().equals(name) && x.isProcitana()));

        return (T) dto;
    }

    @Override
    public <T, U> T insert(U object, Class<T> resultDtoClass, Authentication authentication) {

        var korisnik = korisniciRepo.findKorisnikEntityByKorisnickoIme(authentication.getName());
        ((KonverzacijaDto) object).setKorisnikId(korisnik.getId());
        var entity = super.insert(object, resultDtoClass, authentication);

        var korisnici = korisniciRepo.findAllByKorisnikTipIdNaziv(KorisnikTipEnum.Admin.name());
        if(!authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals(KorisnikTipEnum.ROLE_Admin.name())))
            korisnici.add(korisnik);
        var konverzacija = getModelMapper().map(entity, KonverzacijaEntity.class);

        ((KonverzacijaDto) entity).setProcitana(true);
        korisnici.forEach(k -> {

            var kk = new KonverzacijaKorisnikEntity();
            kk.setId(null);
            kk.setProcitana(false);
            kk.setKorisnik(k);
            kk.setKonverzacija(konverzacija);

            konverzacijaKOrisnikRepo.saveAndFlush(kk);
        });

        return entity;
    }


    @Override
    public void procitaj(Long konverzacijaId, Authentication authentication) {
        var konverzacijaKorisnik = konverzacijaKOrisnikRepo.findByKonverzacijaIdAndKorisnikKorisnickoIme(konverzacijaId,authentication.getName());
        if(konverzacijaKorisnik!=null){
            konverzacijaKorisnik.setProcitana(true);
            konverzacijaKorisnik.setVrijeme(new Date());

            konverzacijaKOrisnikRepo.saveAndFlush(konverzacijaKorisnik);
        }

    }

    @Override
    public boolean sveProcitane(Authentication authentication) {
        return konverzacijaKOrisnikRepo.existsKonverzacijaKorisnikEntityByProcitanaAndKorisnikKorisnickoIme(false, authentication.getName());
    }
}
