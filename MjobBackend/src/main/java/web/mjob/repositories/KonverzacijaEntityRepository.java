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
    value = "SELECT k.* from konverzacija k \n" +
            "left join (select konverzacija_id, max(kreirana) as datum from poruka where konverzacija_id in (select konverzacija_id from konverzacija_korisnik where korisnik_id = :korisnikId)\n" +
            " group by konverzacija_id) as p on p.konverzacija_id = k.id\n" +
            "            where k.id in (select konverzacija_id from konverzacija_korisnik where korisnik_id = :korisnikId)  \n" +
            "            and case when isnull(:tem) then true else k.tema like %:tem% end\n" +
            "            order by p.datum desc",
    countQuery = "SELECT count(*)  from konverzacija k \n" +
            "left join (select konverzacija_id, max(kreirana) as datum from poruka where konverzacija_id in (select konverzacija_id from konverzacija_korisnik where korisnik_id = :korisnikId)\n" +
            " group by konverzacija_id) as p on p.konverzacija_id = k.id\n" +
            "            where k.id in (select konverzacija_id from konverzacija_korisnik where korisnik_id = :korisnikId)  \n" +
            "            and case when isnull(:tem) then true else k.tema like %:tem% end")
    public Page<KonverzacijaEntity> findAllByKornikUkonverzaciji(@Param("korisnikId") long korisnikId, @Param("tem")String tema, Pageable page);
}
