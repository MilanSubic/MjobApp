package web.mjob.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Controller;
import web.mjob.exceptions.NotFoundException;
import web.mjob.models.dto.PorukaDto;
import web.mjob.repositories.KonverzacijaKorisnikEntityRepository;
import web.mjob.services.PorukaService;

import java.io.Console;
import java.security.Principal;
import java.util.Collection;

@Controller
public class PorukeWsController {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final PorukaService porukaService;
    private final KonverzacijaKorisnikEntityRepository kkRepository;

    public PorukeWsController(SimpMessagingTemplate simpMessagingTemplate, PorukaService porukaService, KonverzacijaKorisnikEntityRepository kkRepository) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.porukaService = porukaService;
        this.kkRepository = kkRepository;
    }

    @MessageMapping("/poruka")
    public PorukaDto recMessage(@Payload PorukaDto message, Principal principal) throws NotFoundException {
        var auth = new Authentication() {
            @Override
            public Collection<? extends GrantedAuthority> getAuthorities() {
                return null;
            }

            @Override
            public Object getCredentials() {
                return null;
            }

            @Override
            public Object getDetails() {
                return null;
            }

            @Override
            public Object getPrincipal() {
                return principal;
            }

            @Override
            public boolean isAuthenticated() {
                return false;
            }

            @Override
            public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {

            }

            @Override
            public String getName() {
                return principal.getName();
            }
        };

        var res = porukaService.insert(message, PorukaDto.class, auth);
        simpMessagingTemplate.convertAndSendToUser(message.getKonverzacijaId().toString(),"/poruke",res);

        var kk = kkRepository.findAllByKonverzacijaIdAndKorisnikKorisnickoImeNot(message.getKonverzacijaId(), principal.getName());

        kk.forEach(x->
                simpMessagingTemplate.convertAndSendToUser(x.getKorisnik().getKorisnickoIme(), "/obavjestenje",true));
        return res;
    }
}
