package web.mjob.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Controller;
import web.mjob.exceptions.NotFoundException;
import web.mjob.models.dto.PorukaDto;
import web.mjob.services.PorukaService;

import java.security.Principal;
import java.util.Collection;

@Controller
public class PorukeWsController {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final PorukaService porukaService;

    public PorukeWsController(SimpMessagingTemplate simpMessagingTemplate, PorukaService porukaService) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.porukaService = porukaService;
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
        return res;
    }
}
