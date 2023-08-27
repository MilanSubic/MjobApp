package web.mjob.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import web.mjob.base.CrudJpaService;
import web.mjob.base.CrudService;
import web.mjob.models.dto.Korisnik;
import web.mjob.models.entities.KorisnikEntity;
import web.mjob.repositories.KorisnikEntityRepository;
import web.mjob.services.Korisnik1Service;

@Service
@Transactional
public class Korisnik1ServiceImpl extends CrudJpaService<KorisnikEntity,Long> implements Korisnik1Service {

    public final KorisnikEntityRepository repository;

    public final ModelMapper modelMapper;


    public Korisnik1ServiceImpl(KorisnikEntityRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, KorisnikEntity.class);
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

    @Override
    public KorisnikEntity getUserByUsername(String username) {

        return repository.findKorisnikEntityByKorisnickoIme(username);
    }
}
