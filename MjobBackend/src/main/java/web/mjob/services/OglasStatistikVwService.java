package web.mjob.services;

import org.springframework.security.core.Authentication;
import web.mjob.base.CrudService;
import web.mjob.models.dto.OglasStatistikaDto;

import java.util.List;

public interface OglasStatistikVwService {
    List<OglasStatistikaDto> getViewStatistika(Long oglasId, Long broj, Authentication authentication) throws Exception;
}
