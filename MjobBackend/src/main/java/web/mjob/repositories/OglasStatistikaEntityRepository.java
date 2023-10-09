package web.mjob.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import web.mjob.models.entities.OglasEntity;
import web.mjob.models.entities.OglasStatistikaEntity;

import java.util.List;

public interface OglasStatistikaEntityRepository extends JpaRepository<OglasStatistikaEntity,Long> {}
