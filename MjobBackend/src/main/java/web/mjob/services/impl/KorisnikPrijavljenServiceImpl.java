package web.mjob.services.impl;

import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import web.mjob.exceptions.NotFoundException;
import web.mjob.models.dto.Request;
import web.mjob.models.entities.KorisnikEntity;
import web.mjob.models.entities.KorisnikPrijavljenEntity;
import web.mjob.models.entities.KorisnikStatusEntity;
import web.mjob.models.entities.OglasEntity;
import web.mjob.repositories.*;
import web.mjob.services.EmailService;
import web.mjob.services.KorisnikPrijavljenService;

import java.util.List;
@Service
@Transactional
public class KorisnikPrijavljenServiceImpl implements KorisnikPrijavljenService {

    public final KorisnikEntityRepository userRepository;
    public final OglasRepository oglasRepository;
    private final KorisnikPrijavljenRepository korisnikPrijavljenRepository;
    private final ModelMapper mapper;

    public KorisnikPrijavljenServiceImpl(KorisnikEntityRepository userRepository,OglasRepository oglasRepository,
                               KorisnikPrijavljenRepository korisnikPrijavljenRepository,
                               ModelMapper modelMapper
                               )
    {
        this.userRepository = userRepository;
        this.oglasRepository = oglasRepository;
        this.mapper=modelMapper;
        this.korisnikPrijavljenRepository=korisnikPrijavljenRepository;
    }
    @Override
    public void prijaviKorisnikaNaOglas(Long userId, Long oglasId) {

        KorisnikPrijavljenEntity user=new KorisnikPrijavljenEntity(false,oglasRepository.findOglasEntityById(oglasId),userRepository.findKorisnikEntityById(userId));
        korisnikPrijavljenRepository.saveAndFlush(user);
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
