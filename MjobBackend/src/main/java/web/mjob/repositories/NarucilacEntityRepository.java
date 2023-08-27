package web.mjob.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import web.mjob.models.entities.NarucilacEntity;
import web.mjob.models.entities.PosaoTipEntity;

import java.util.List;

public interface NarucilacEntityRepository extends JpaRepository<NarucilacEntity, Long> {
    List<NarucilacEntity> findAll();
}
