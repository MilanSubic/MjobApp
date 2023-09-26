package web.mjob.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import web.mjob.models.entities.KorisnikTipEntity;


public interface KorisnikTipEntityRepository extends JpaRepository<KorisnikTipEntity,Long> {

    KorisnikTipEntity findKorisnikTipEntityById(Long id);
    KorisnikTipEntity findKorisnikTipEntityByNaziv(String naziv);
}
