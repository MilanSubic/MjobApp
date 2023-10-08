package web.mjob.services.impl;

import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import web.mjob.config.WebSocketConfig;
import web.mjob.exceptions.NotFoundException;
import web.mjob.models.dto.Korisnik;
import web.mjob.models.dto.Oglas;
import web.mjob.models.dto.PrijavljenKorisnikDto;
import web.mjob.models.dto.Request;
import web.mjob.models.entities.KorisnikEntity;
import web.mjob.models.entities.KorisnikPrijavljenEntity;
import web.mjob.models.entities.KorisnikStatusEntity;
import web.mjob.models.entities.OglasEntity;
import web.mjob.repositories.*;

import web.mjob.services.EmailService;
import web.mjob.services.KorisnikPrijavljenService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
@Service
@Transactional
public class KorisnikPrijavljenServiceImpl implements KorisnikPrijavljenService {

    public final KorisnikEntityRepository userRepository;
    public final OglasRepository oglasRepository;
    private final KorisnikPrijavljenRepository korisnikPrijavljenRepository;
    private final ModelMapper mapper;
    
    private final SimpMessagingTemplate messagingTemplate;
    

    public KorisnikPrijavljenServiceImpl(KorisnikEntityRepository userRepository,OglasRepository oglasRepository,
                               KorisnikPrijavljenRepository korisnikPrijavljenRepository,
                               ModelMapper modelMapper,SimpMessagingTemplate simpMessagingTemplate
                              )
    {
        this.userRepository = userRepository;
        this.oglasRepository = oglasRepository;
        this.mapper=modelMapper;
        this.korisnikPrijavljenRepository=korisnikPrijavljenRepository;
		
		this.messagingTemplate = simpMessagingTemplate;
    }
    @Override
    public void prijaviKorisnikaNaOglas(Long userId, Long oglasId) {
        KorisnikPrijavljenEntity user=korisnikPrijavljenRepository.findKorisnikPrijavljenEntityByKorisnikByKorisnikIdAndOglasByOglasId(userRepository.findKorisnikEntityById(userId),oglasRepository.findOglasEntityById(oglasId));
        if(user==null) {
            user = new KorisnikPrijavljenEntity(false, oglasRepository.findOglasEntityById(oglasId), userRepository.findKorisnikEntityById(userId));
            user.setPrijavljen(true);
            user.setOdjavljen(false);
            user.setOdbijen(false);
            korisnikPrijavljenRepository.saveAndFlush(user);
        }else
        {
            user.setPrijavljen(true);
            user.setOdjavljen(false);
            user.setOdbijen(false);
            korisnikPrijavljenRepository.saveAndFlush(user);
        }
        //if(!getAllUsersForAd(oglasId).contains( mapper.map(userRepository.findKorisnikEntityById(userId),Korisnik.class)))
        
        messagingTemplate.convertAndSend("/oglas/*/prijava", "Korisnik se prijavio na oglas!");
    }

    
    
    @Override
    public void potvrdiUplatu(Long userId, Long oglasId,Boolean accept) {
        KorisnikPrijavljenEntity user=korisnikPrijavljenRepository.findKorisnikPrijavljenEntityByKorisnikByKorisnikIdAndOglasByOglasId(userRepository.findKorisnikEntityById(userId),oglasRepository.findOglasEntityById(oglasId));
       
        
        
            user.setUplata(accept);
           
            korisnikPrijavljenRepository.saveAndFlush(user);
          
            messagingTemplate.convertAndSend("/oglas/*/usersUplata/*", "Uplata je promjenjena!");
           
    
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
    @Override
    public  List<PrijavljenKorisnikDto> getAllUsersRequestsForAd(Long id)
    {
        OglasEntity oglas=oglasRepository.findOglasEntityById(id);
        List<KorisnikPrijavljenEntity> prijavljeniKorisnici=korisnikPrijavljenRepository.findKorisnikPrijavljenEntitiesByOglasByOglasId(oglas);


        return prijavljeniKorisnici.stream().map(e->mapper.map(e, PrijavljenKorisnikDto.class)).collect(Collectors.toList());
    }
    private List<Korisnik> getAllUsersForAd(Long id)
    {
        OglasEntity oglas=oglasRepository.findOglasEntityById(id);
        List<KorisnikPrijavljenEntity> prijavljenikorisnici=korisnikPrijavljenRepository.findKorisnikPrijavljenEntitiesByOglasByOglasId(oglas);

        List<KorisnikEntity> korisnikEntities=new ArrayList<>();
        for (KorisnikPrijavljenEntity korisnikPrijavljen: prijavljenikorisnici.stream().toList()) {
            if(!korisnikPrijavljen.getOdjavljen())
            korisnikEntities.add(korisnikPrijavljen.getKorisnikByKorisnikId());
        }
        return korisnikEntities.stream().map(e->mapper.map(e, Korisnik.class)).collect(Collectors.toList());

    }
    @Override
    public void acceptRequest(Long korisnikId,Long oglasId,Boolean accept)
    {
        KorisnikPrijavljenEntity korisnikPrijavljenEntity=korisnikPrijavljenRepository.findKorisnikPrijavljenEntityByKorisnikByKorisnikIdAndOglasByOglasId(userRepository.findKorisnikEntityById(korisnikId),oglasRepository.findOglasEntityById(oglasId));
        if(korisnikPrijavljenEntity!=null)
        {
            if(accept)
            {
                korisnikPrijavljenEntity.setOdobren(accept);
                korisnikPrijavljenEntity.setOdbijen(!accept);
                messagingTemplate.convertAndSend("/oglas/*/user/*", "Zahtjev je prihvacen!");
            }
            else
            {
                korisnikPrijavljenEntity.setOdbijen(!accept);
                korisnikPrijavljenEntity.setOdobren(accept);
              korisnikPrijavljenEntity.setUplata(false);
              messagingTemplate.convertAndSend("/oglas/*/user/*", "Zahtjev je odbijen!");
            }
            korisnikPrijavljenRepository.saveAndFlush(korisnikPrijavljenEntity);
           // messagingTemplate.convertAndSend("/oglas", "ponovo ucitaj!");
        }
    }
    @Override
    public  List<PrijavljenKorisnikDto> getMyAds(Authentication authentication)
    {
        KorisnikEntity korisnik= userRepository.findKorisnikEntityByKorisnickoIme(authentication.getName());
        List<KorisnikPrijavljenEntity> prijavljenikorisnici=korisnikPrijavljenRepository.findKorisnikPrijavljenEntitiesByKorisnikByKorisnikId(korisnik);
        List<PrijavljenKorisnikDto> lista=prijavljenikorisnici.stream().map(e->mapper.map(e, PrijavljenKorisnikDto.class)).collect(Collectors.toList());
      
        return lista.stream().filter((el)->!el.getOglasByOglasId().getObrisan()).toList();

    }
    

    @Override
    public boolean refuseRequest(Long id) {
        KorisnikPrijavljenEntity korisnikPrijavljenEntity=korisnikPrijavljenRepository.findKorisnikPrijavljenEntityById(id);
        if(korisnikPrijavljenEntity!=null && !korisnikPrijavljenEntity.getOdbijen())
        {
            korisnikPrijavljenEntity.setOdjavljen(true);
            korisnikPrijavljenEntity.setPrijavljen(false);
            if(korisnikPrijavljenEntity.getOdobren())
                korisnikPrijavljenEntity.setOdobren(false);
            korisnikPrijavljenEntity.setUplata(false);
           
            korisnikPrijavljenRepository.saveAndFlush(korisnikPrijavljenEntity);
            messagingTemplate.convertAndSend("/oglas/*/refuse", "Korisnik se odjavio sa posla!");
            return true;
        }
        return false;
    }
}
