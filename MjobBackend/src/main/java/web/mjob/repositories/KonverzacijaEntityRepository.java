package web.mjob.repositories;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import web.mjob.models.entities.KonverzacijaEntity;
import web.mjob.models.entities.OpstinaEntity;

import java.util.List;

public interface KonverzacijaEntityRepository extends JpaRepository<KonverzacijaEntity, Long> {
    public Page<KonverzacijaEntity> findByKorisnikKorisnickoIme(String korisnickoIme, Pageable page);
    public Page<KonverzacijaEntity> findByKorisnikKorisnickoImeAndTemaContains(String korisnickoIme, String tema, Pageable page);

}
