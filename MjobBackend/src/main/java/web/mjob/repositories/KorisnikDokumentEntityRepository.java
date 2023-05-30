package web.mjob.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import web.mjob.models.entities.KorisnikDokumentEntity;
import web.mjob.models.entities.KorisnikEntity;

import java.util.List;

public interface KorisnikDokumentEntityRepository  extends JpaRepository<KorisnikDokumentEntity,Long>  {
    List<KorisnikDokumentEntity> findKorisnikDokumentEntitiesByKorisnikByKorisnikId(Long userId);

}
