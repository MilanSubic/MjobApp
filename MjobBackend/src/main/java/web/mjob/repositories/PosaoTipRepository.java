package web.mjob.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import web.mjob.models.entities.PosaoTipEntity;

public interface PosaoTipRepository extends JpaRepository<PosaoTipEntity,Long> {

    PosaoTipEntity findPosaoTipEntityById(Long id);
    PosaoTipEntity findPosaoTipEntityByNaziv(String naziv);
}
