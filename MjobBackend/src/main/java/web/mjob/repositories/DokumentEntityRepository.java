package web.mjob.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import web.mjob.models.entities.DokumentEntity;

public interface DokumentEntityRepository extends JpaRepository<DokumentEntity,Long> {
}
