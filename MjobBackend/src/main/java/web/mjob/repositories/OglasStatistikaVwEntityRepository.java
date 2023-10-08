package web.mjob.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import web.mjob.models.entities.OglasStatistikaEntity;
import web.mjob.models.entities.OglasStatistikaVwEntity;

import java.util.List;

public interface OglasStatistikaVwEntityRepository extends JpaRepository<OglasStatistikaVwEntity,Long> {

    @Query(value = "select oglas_id, DATE_FORMAT(vrijeme, '%d.%m.%Y.') as dan, max(vrijeme) as vrijeme, count(*) as broj_pregleda " +
            "from oglas_statistika where oglas_id = :oglasId\n" +
            "group by oglas_id, DATE_FORMAT(vrijeme, '%d.%m.%Y.')\n" +
            "order by vrijeme desc",
    nativeQuery = true)
    List<OglasStatistikaVwEntity> getViewStatistika(@Param("oglasId") Long oglasId);
}
