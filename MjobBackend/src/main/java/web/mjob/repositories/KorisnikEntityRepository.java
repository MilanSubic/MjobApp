package web.mjob.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import web.mjob.models.entities.KorisnikEntity;

import java.util.List;

@Repository
public interface KorisnikEntityRepository extends JpaRepository<KorisnikEntity,Long> {
   // @Query("select u from KorisnikEntity u where u.korisnickoIme = :username")
    KorisnikEntity findKorisnikEntityByKorisnickoIme(String username);
    KorisnikEntity findKorisnikEntityById(Long id);

    @Override
    List<KorisnikEntity> findAll();

}
