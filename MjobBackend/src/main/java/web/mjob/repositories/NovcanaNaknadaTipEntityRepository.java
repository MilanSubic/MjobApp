package web.mjob.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import web.mjob.models.entities.NovcanaNaknadaTipEntity;
import web.mjob.models.entities.OglasEntity;

public interface NovcanaNaknadaTipEntityRepository extends JpaRepository<NovcanaNaknadaTipEntity, Long> {
}
