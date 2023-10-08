package web.mjob.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import web.mjob.base.CrudJpaService;
import web.mjob.models.dto.OglasStatistikaDto;
import web.mjob.models.entities.OglasStatistikaEntity;
import web.mjob.models.entities.OglasStatistikaVwEntity;
import web.mjob.models.enums.KorisnikTipEnum;
import web.mjob.repositories.KorisnikEntityRepository;
import web.mjob.repositories.OglasStatistikaEntityRepository;
import web.mjob.repositories.OglasStatistikaVwEntityRepository;
import web.mjob.services.OglasStatistikVwService;
import web.mjob.services.OglasStatistikaService;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class OglasStatistikaVwServiceImpl implements OglasStatistikVwService {

    public final OglasStatistikaVwEntityRepository repository;
    public final KorisnikEntityRepository korisnikEntityRepository;
    public final ModelMapper modelMapper;

    public OglasStatistikaVwServiceImpl(OglasStatistikaVwEntityRepository repository, KorisnikEntityRepository korisnikEntityRepository, ModelMapper modelMapper) {
        this.repository = repository;
        this.modelMapper = modelMapper;
        this.korisnikEntityRepository=korisnikEntityRepository;
    }

    @Override
    public List<OglasStatistikaDto> getViewStatistika(Long oglasId, Long broj, Authentication authentication) throws Exception
    {
        if(authentication.getAuthorities().stream().anyMatch(x-> KorisnikTipEnum.ROLE_admin.toString().equals(x.getAuthority()))){
            Comparator<OglasStatistikaVwEntity> customComparator = new Comparator<OglasStatistikaVwEntity>() {
                @Override
                public int compare(OglasStatistikaVwEntity a, OglasStatistikaVwEntity b) {
                    return a.getVrijeme().compareTo(b.getVrijeme());
                }
            };

            var list = repository.getViewStatistika(oglasId);
            return list.stream().limit(broj).sorted(customComparator).map(e->modelMapper.map(e, OglasStatistikaDto.class)).collect(Collectors.toList());
        }
        throw new Exception("Unauthorized");
    }
}