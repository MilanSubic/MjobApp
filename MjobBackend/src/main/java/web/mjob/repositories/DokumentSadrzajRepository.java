package web.mjob.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import web.mjob.models.entities.DokumentSadrzajEntity;
import web.mjob.models.entities.KorisnikEntity;

@Repository
public interface DokumentSadrzajRepository  extends JpaRepository<DokumentSadrzajEntity,Long> {
}
