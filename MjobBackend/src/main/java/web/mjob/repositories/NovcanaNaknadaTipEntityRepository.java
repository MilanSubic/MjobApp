package web.mjob.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import web.mjob.models.entities.NovcanaNaknadaTipEntity;

import java.util.List;

public interface NovcanaNaknadaTipEntityRepository extends JpaRepository<NovcanaNaknadaTipEntity, Long> {
    List<NovcanaNaknadaTipEntity> findAll();

}
