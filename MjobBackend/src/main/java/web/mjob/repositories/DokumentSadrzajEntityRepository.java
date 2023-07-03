package web.mjob.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import web.mjob.exceptions.NotFoundException;
import web.mjob.models.entities.DokumentSadrzajEntity;

public interface DokumentSadrzajEntityRepository extends JpaRepository<DokumentSadrzajEntity,Long> {
    DokumentSadrzajEntity findByDokumentByDokumentIdId(Long dokumentId) throws NotFoundException;
}
