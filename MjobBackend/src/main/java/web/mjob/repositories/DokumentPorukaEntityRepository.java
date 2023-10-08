package web.mjob.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import web.mjob.models.entities.DokumentPorukaEntity;
import web.mjob.models.entities.OpstinaEntity;

public interface DokumentPorukaEntityRepository extends JpaRepository<DokumentPorukaEntity, Long> {
}
