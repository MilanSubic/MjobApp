package web.mjob.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import web.mjob.models.entities.KorisnikEntity;
import web.mjob.models.entities.KorisnikPrijavljenEntity;
import  java.util.List;
public interface KorisnikPrijavljenRepository extends JpaRepository<KorisnikPrijavljenEntity, Long> {
    List<KorisnikPrijavljenEntity> findKorisnikPrijavljenEntitiesByKorisnikByKorisnikId(KorisnikEntity korisnik);

}
