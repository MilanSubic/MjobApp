package web.mjob.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import web.mjob.models.entities.OglasEntity;

import java.util.List;

public interface OglasRepository extends JpaRepository<OglasEntity,Long> {

    @Override
    List<OglasEntity> findAll();

    OglasEntity findOglasEntityById(Long id);

}
