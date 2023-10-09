package web.mjob.services;

import org.springframework.security.core.Authentication;
import web.mjob.base.CrudService;
import web.mjob.models.dto.Korisnik;
import web.mjob.models.dto.Oglas;
import web.mjob.models.dto.PrijavljenKorisnikDto;

import java.util.List;

public interface KorisnikPrijavljenService extends CrudService<Long>{


    void prijaviKorisnikaNaOglas(Long userId,Long oglasId);
    List<PrijavljenKorisnikDto> getAllUsersRequestsForAd(Long id);
    void acceptRequest(Long korisnikId,Long oglasId, Boolean accept);
    List<PrijavljenKorisnikDto> getMyAds(Authentication authentication);

    Integer numberAllUserRequest(Long id);
    boolean refuseRequest(Long oglasId);
	
	void potvrdiUplatu(Long userId, Long oglasId, Boolean accept);

    Integer numberAcceptedUserRequest(Long id);
}