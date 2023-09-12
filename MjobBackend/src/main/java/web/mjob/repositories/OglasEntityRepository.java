package web.mjob.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import web.mjob.models.entities.OglasEntity;

import java.util.List;
import java.util.Optional;

@Repository
public interface OglasEntityRepository extends JpaRepository<OglasEntity, Long> {
    @Query("SELECT o from OglasEntity o where o.obrisan=false ")
    List<OglasEntity> findAll();

    List<OglasEntity> findAllByJavniAndObrisan(Boolean javni,Boolean obrisan);

    void deleteById(Long id);

    Optional<OglasEntity> findById(Long id);
    OglasEntity findOglasEntityById(Long id);

    @Query("SELECT o from OglasEntity o where o.narucilacByNarucilacId.id=:id and o.obrisan=false ")
    List<OglasEntity> getAllOglasiByNarucilacId(Long id);

}