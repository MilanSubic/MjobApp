package web.mjob.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import web.mjob.models.entities.KorisnikEntity;


public interface KorisnikEntityRepository extends JpaRepository<KorisnikEntity,Long> {
   // @Query("select u from KorisnikEntity u where u.korisnickoIme = :username")
    KorisnikEntity findKorisnikEntityByKorisnickoIme(String username);

   // KorisnikEntity getKorisnikEntityByKorisnickoIme(String username);
}
