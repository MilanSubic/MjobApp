package web.mjob.repositories;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import web.mjob.models.entities.KonverzacijaEntity;
import web.mjob.models.entities.OpstinaEntity;

import java.util.List;

public interface KonverzacijaEntityRepository extends JpaRepository<KonverzacijaEntity, Long> {
    public Page<KonverzacijaEntity> findByKorisnikKorisnickoIme(String korisnickoIme, Pageable page);
    public Page<KonverzacijaEntity> findByKorisnikKorisnickoImeAndTemaContains(String korisnickoIme, String tema, Pageable page);

    @Query(nativeQuery = true,
    value = "SELECT * from konverzacija " +
            "where id in (select konverzacija_id from konverzacija_korisnik where korisnik_id = :korisnikId) " +
            "and case when isnull(:tem) then true else tema like %:tem% end",
    countQuery = "SELECT count(*) from konverzacija " +
            "where id in (select konverzacija_id from konverzacija_korisnik where korisnik_id = :korisnikId) " +
            "and case when isnull(:tem) then true else tema like %:tem% end")
    public Page<KonverzacijaEntity> findAllByKornikUkonverzaciji(@Param("korisnikId") long korisnikId, @Param("tem")String tema, Pageable page);
}
