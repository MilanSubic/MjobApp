package web.mjob.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import web.mjob.models.entities.PosaoTipEntity;

import java.util.List;

@Repository
public interface PosaoTipEntityRepository extends JpaRepository<PosaoTipEntity, Long> {
    List<PosaoTipEntity> findAll();
}