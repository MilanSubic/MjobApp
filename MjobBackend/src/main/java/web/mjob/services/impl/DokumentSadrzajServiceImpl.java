package web.mjob.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import web.mjob.base.CrudJpaService;
import web.mjob.exceptions.NotFoundException;
import web.mjob.models.dto.DokumentSadrzajDto;
import web.mjob.models.entities.DokumentSadrzajEntity;
import web.mjob.models.entities.DokumentTipEntity;
import web.mjob.repositories.DokumentSadrzajEntityRepository;
import web.mjob.repositories.DokumentTipEntityRepository;
import web.mjob.services.DokumentSadrzajService;
import web.mjob.services.DokumentTipService;

@Service
@Transactional
public class DokumentSadrzajServiceImpl extends CrudJpaService<DokumentSadrzajEntity,Long> implements DokumentSadrzajService {

    public final DokumentSadrzajEntityRepository repository;

    public final ModelMapper modelMapper;


    public DokumentSadrzajServiceImpl(DokumentSadrzajEntityRepository repository, ModelMapper modelMapper) {
        super(repository, modelMapper, DokumentSadrzajEntity.class);
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

    @Override
    public DokumentSadrzajDto findByDokumentId(Long dokumentId, Class<DokumentSadrzajDto> resultDtoClass) throws NotFoundException {
        return modelMapper.map(repository.findByDokumentByDokumentIdId(dokumentId), resultDtoClass);
    }
}
