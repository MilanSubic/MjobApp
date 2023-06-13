package web.mjob.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import web.mjob.models.entities.KorisnikEntity;
import web.mjob.models.entities.KorisnikPolEntity;
import web.mjob.models.entities.KorisnikStatusEntity;

public interface KorisnikStatusEntityRepository extends JpaRepository<KorisnikStatusEntity, Long> {
    KorisnikStatusEntity findKorisnikStatusEntityByNaziv(String username);

}
