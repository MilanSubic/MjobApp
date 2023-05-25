package web.mjob.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import web.mjob.models.entities.KorisnikDokumentEntity;
import web.mjob.models.entities.KorisnikEntity;

public interface KorisnikDokumentEntityRepository  extends JpaRepository<KorisnikDokumentEntity,Long>  {
}
