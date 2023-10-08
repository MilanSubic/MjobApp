package web.mjob.services;

import web.mjob.base.CrudService;
import web.mjob.exceptions.NotFoundException;
import web.mjob.models.dto.DokumentSadrzajDto;

public interface DokumentSadrzajService extends CrudService<Long> {
    DokumentSadrzajDto findByDokumentId(Long dokumentId, Class<DokumentSadrzajDto> resultDtoClass) throws NotFoundException;
}
