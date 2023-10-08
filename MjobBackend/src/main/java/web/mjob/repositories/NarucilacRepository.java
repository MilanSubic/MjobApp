package web.mjob.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import web.mjob.models.dto.NarucilacDto;
import web.mjob.models.entities.NarucilacEntity;

import java.util.List;


public interface NarucilacRepository extends JpaRepository<NarucilacEntity, Long> {


}
