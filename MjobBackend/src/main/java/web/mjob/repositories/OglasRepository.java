package web.mjob.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import web.mjob.models.entities.OglasEntity;

public interface OglasRepository extends JpaRepository<OglasEntity,Long> {
    OglasEntity findOglasEntityById(Long id);

}
