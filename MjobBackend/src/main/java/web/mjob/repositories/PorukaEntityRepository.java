package web.mjob.repositories;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import web.mjob.models.entities.KonverzacijaEntity;
import web.mjob.models.entities.PorukaEntity;

public interface PorukaEntityRepository extends JpaRepository<PorukaEntity, Long> {
    public Page<PorukaEntity> findByKonverzacijaId(long konverzacijaId, Pageable page);
    public Page<PorukaEntity> findByKonverzacijaKorisnikKorisnickoImeAndKonverzacijaId(String korisnickoIme, long konverzacijaId, Pageable page);
    public Page<PorukaEntity> findByKonverzacijaKorisnikKorisnickoIme(String korisnickoIme, Pageable page);

    @Query(nativeQuery = true,
    value = "select * from poruka where konverzacija_id = :konverzacijaId and " +
            "konverzacija_id in (select konverzacija_id from konverzacija_korisnik where korisnik_id = :korisnikId)",
    countQuery = "select count(*) from poruka where konverzacija_id = :konverzacijaId and " +
            "konverzacija_id in (select konverzacija_id from konverzacija_korisnik where korisnik_id = :korisnikId)")
    public Page<PorukaEntity> findByKonverzacijaAndKorisnik(@Param("konverzacijaId") long konverzacijaId, @Param("korisnikId") long korinsikId, Pageable page);
}
