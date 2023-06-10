package web.mjob.models.entities;

import lombok.*;

import jakarta.persistence.*;
import java.util.Objects;

@Data
@Entity
@Table(name = "konverzija_has_korisnik", schema = "mjob_database")
public class KonverzijaHasKorisnikEntity {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "konverzija_id", referencedColumnName = "id", nullable = false)
    private KonverzijaEntity konverzijaByKonverzijaId;
    @ManyToOne
    @JoinColumn(name = "korisnik_id", referencedColumnName = "id", nullable = false)
    private KorisnikEntity korisnikByKorisnikId;


}
