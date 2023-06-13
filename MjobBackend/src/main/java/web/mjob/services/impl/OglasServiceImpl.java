package web.mjob.services.impl;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;

import org.modelmapper.TypeMap;
import org.springframework.stereotype.Service;

import web.mjob.models.dto.Narucilac;
import web.mjob.models.dto.Oglas;

import web.mjob.models.entities.NarucilacEntity;
import web.mjob.models.entities.OglasEntity;
import web.mjob.repositories.NarucilacEntityRepository;
import web.mjob.repositories.NovcanaNaknadaTipEntityRepository;
import web.mjob.repositories.OglasEntityRepository;
import web.mjob.repositories.PosaoTipEntityRepository;
import web.mjob.services.OglasService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class OglasServiceImpl implements OglasService {
    private final ModelMapper modelMapper;
    private final OglasEntityRepository repository;

    private final PosaoTipEntityRepository posaoTipRepo;

    private final NarucilacEntityRepository narucilacEntityRepo;
    private final NovcanaNaknadaTipEntityRepository novcanaNaknadaTipEntityRepo;

    TypeMap<OglasEntity,Oglas> property;
    TypeMap<NarucilacEntity,Oglas> property1;

    @PersistenceContext
    private EntityManager manager;

    public OglasServiceImpl(ModelMapper modelMapper, OglasEntityRepository repository, PosaoTipEntityRepository posaoTipRepo,
                            NarucilacEntityRepository narucilacEntityRepository, NovcanaNaknadaTipEntityRepository novcanaNaknadaTipEntityRepository) {
        this.modelMapper = modelMapper;
        this.repository = repository;
        this.posaoTipRepo=posaoTipRepo;
        this.narucilacEntityRepo=narucilacEntityRepository;
        this.novcanaNaknadaTipEntityRepo=novcanaNaknadaTipEntityRepository;

        this.property =this.modelMapper.createTypeMap(OglasEntity.class,Oglas.class);

        property.addMappings(
                m -> m.map(src->src.getPosaoTipByPosaoTipId().getNaziv(),Oglas::setPosaoTipById)
        );
        /*

        property.addMappings(
                m -> m.map(src->src.getNarucilacByNarucilacId(),Oglas::setNarucilacById)
        );

         */

        property.addMappings(
                m->m.map(src->src.getNovcanaNaknadaTipByNovcanaNaknadaTipId().getNaziv(),Oglas::setNovcanaNaknadaTipById)
        );
    }

    @Override
    public List<Oglas> getAll() {
        return repository.findAll().stream().map(e->modelMapper.map(e,Oglas.class)).collect(Collectors.toList());
    }

}