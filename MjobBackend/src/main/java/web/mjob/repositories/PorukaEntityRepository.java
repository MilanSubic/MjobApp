package web.mjob.repositories;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import web.mjob.models.entities.KonverzacijaEntity;
import web.mjob.models.entities.PorukaEntity;

public interface PorukaEntityRepository extends JpaRepository<PorukaEntity, Long> {
    public Page<PorukaEntity> findByKonverzacijaId(long konverzacijaId, Pageable page);
    public Page<PorukaEntity> findByKonverzacijaKorisnikKorisnickoImeAndKonverzacijaId(String korisnickoIme, long konverzacijaId, Pageable page);
    public Page<PorukaEntity> findByKonverzacijaKorisnikKorisnickoIme(String korisnickoIme, Pageable page);
}
