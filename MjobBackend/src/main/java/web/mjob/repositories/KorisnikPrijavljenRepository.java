package web.mjob.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import web.mjob.models.entities.KorisnikEntity;
import web.mjob.models.entities.KorisnikPrijavljenEntity;
import web.mjob.models.entities.OglasEntity;

import  java.util.List;
public interface KorisnikPrijavljenRepository extends JpaRepository<KorisnikPrijavljenEntity, Long> {
    List<KorisnikPrijavljenEntity> findKorisnikPrijavljenEntitiesByKorisnikByKorisnikId(KorisnikEntity korisnik);
    List<KorisnikPrijavljenEntity> findKorisnikPrijavljenEntitiesByOglasByOglasId(OglasEntity oglas);
    KorisnikPrijavljenEntity findKorisnikPrijavljenEntityByKorisnikByKorisnikIdAndOglasByOglasId(KorisnikEntity korisnik,OglasEntity oglas);
    List<KorisnikPrijavljenEntity> findKorisnikPrijavljenEntitiesByKorisnikByKorisnikIdIs(KorisnikEntity korisnik);
    KorisnikPrijavljenEntity findKorisnikPrijavljenEntityById(Long id);

    @Query(nativeQuery = true,
            value = "select  * from korisnik_prijavljen where  odobren=true and oglas_id=:id")
   List <KorisnikPrijavljenEntity> findAcceptedKorisnikPrijavljenEntityById(@Param("id")Long id);

}
