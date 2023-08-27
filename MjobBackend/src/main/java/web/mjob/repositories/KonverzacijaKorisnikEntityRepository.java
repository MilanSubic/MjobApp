package web.mjob.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import web.mjob.models.entities.DokumentSadrzajEntity;
import web.mjob.models.entities.KonverzacijaKorisnikEntity;

import java.util.List;

public interface KonverzacijaKorisnikEntityRepository  extends JpaRepository<KonverzacijaKorisnikEntity,Long> {
    KonverzacijaKorisnikEntity findByKonverzacijaIdAndKorisnikKorisnickoIme(Long konverzacijaId, String korisnickoIme);
    List<KonverzacijaKorisnikEntity> findAllByKonverzacijaIdAndKorisnikKorisnickoImeNot(Long konverzacijaId, String korisnickoIme);
}
