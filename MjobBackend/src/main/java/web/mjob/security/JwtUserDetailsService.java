package web.mjob.security;

import java.util.ArrayList;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import web.mjob.models.entities.KorisnikEntity;
import web.mjob.models.entities.KorisnikTipEntity;
import web.mjob.repositories.KorisnikEntityRepository;
import web.mjob.repositories.KorisnikTipEntityRepository;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    public KorisnikEntityRepository userRepository;


    @Autowired
    public JwtUserDetailsService(KorisnikEntityRepository userRepository,KorisnikTipEntityRepository rolesRepository){
        this.userRepository=userRepository;

    }
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        if ("javainuse".equals(username)) {
//            return new User("javainuse", "$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlWXx2lPk1C3G6",
//                    new ArrayList<>());
//        } else {
//            throw new UsernameNotFoundException("User not found with username: " + username);
//        }
//    }

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{

        try
        {
            KorisnikEntity user=userRepository.findKorisnikEntityByKorisnickoIme(username);
            String userRole=user.getKorisnikTipId().getNaziv();
            System.out.println("userRole:"+userRole+" username:"+user.getKorisnickoIme()+" password:"+user.getLozinka());
            SimpleGrantedAuthority role=new SimpleGrantedAuthority("ROLE_"+userRole);
            return new User(user.getKorisnickoIme(),user.getLozinka(), Collections.singleton(role));
        }catch(Exception e){throw new UsernameNotFoundException("username is not found");}

    }
}