package web.mjob.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import web.mjob.base.CrudJpaService;
import web.mjob.models.dto.Korisnik;
import web.mjob.models.dto.PosaoTipDto;
import web.mjob.models.entities.PosaoTipEntity;
import web.mjob.repositories.PosaoTipRepository;
import web.mjob.services.PosaoTipService;

@Service
@Transactional
public class PosaoTipServiceImpl extends CrudJpaService<PosaoTipEntity,Long>  implements PosaoTipService {
    public final PosaoTipRepository repository;
    public final ModelMapper modelMapper;

    public PosaoTipServiceImpl(PosaoTipRepository repository, ModelMapper modelMapper) {
        super(repository,modelMapper,PosaoTipEntity.class);
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

    @Override
    public PosaoTipDto getPosaoTipById(Long id) {

        return modelMapper.map(repository.findPosaoTipEntityById(id),PosaoTipDto.class);

    }
}
/*
public class PosaoTipServiceImpl extends CrudJpaService<PosaoTipEntity,Long>  implements PosaoTipService {
    public final PosaoTipRepository repository;
    public final ModelMapper modelMapper;
    @PersistenceContext
    private EntityManager manager;

    public PosaoTipServiceImpl(PosaoTipRepository repository, ModelMapper modelMapper) {
        super(repository,modelMapper,PosaoTipEntity.class);
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

    @Override
    public PosaoTipDto getPosaoTipById(Long id) {

        return modelMapper.map(repository.findPosaoTipEntityById(id),PosaoTipDto.class);

    }
    @Override
    public PosaoTipEntity findById(Long id) throws NotFoundException {
        return repository.findById(id).get();
    }

    @Override
    public List<PosaoTip> getAll() {
        return repository.findAll().stream().map(e->modelMapper.map(e, PosaoTip.class)).collect(Collectors.toList());
    }
}

 */
