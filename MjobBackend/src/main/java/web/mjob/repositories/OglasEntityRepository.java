package web.mjob.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import web.mjob.models.entities.OglasEntity;

import java.util.List;
import java.util.Optional;

@Repository
public interface OglasEntityRepository extends JpaRepository<OglasEntity, Long> {
   // List<OglasEntity> findAll();

    List<OglasEntity> findAllByJavni(Boolean javni);

    void deleteById(Long id);

    Optional<OglasEntity> findById(Long id);

    @Query("SELECT o from OglasEntity o where o.narucilacByNarucilacId.id=:id")
    List<OglasEntity> getAllOglasiByNarucilacId(Long id);

}