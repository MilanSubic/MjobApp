package web.mjob.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import web.mjob.models.entities.OglasEntity;

import java.util.List;

@Repository
public interface OglasEntityRepository extends JpaRepository<OglasEntity, Long> {
    List<OglasEntity> findAll();

}