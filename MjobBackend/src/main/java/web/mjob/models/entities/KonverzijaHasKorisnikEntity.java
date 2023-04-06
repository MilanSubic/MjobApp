package web.mjob.models.entities;

import lombok.*;

import javax.persistence.*;
import java.util.Objects;

@Data
@Entity
@Table(name = "konverzija_has_korisnik", schema = "mjob_database")
@IdClass(KonverzijaHasKorisnikEntityPK.class)
public class KonverzijaHasKorisnikEntity {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private Long id;
    @Id
    @Column(name = "konverzija_id", nullable = false)
    private Integer konverzijaId;
    @Id
    @Column(name = "korisnik_id", nullable = false)
    private Integer korisnikId;
    @ManyToOne
    @JoinColumn(name = "konverzija_id", referencedColumnName = "id", nullable = false)
    private KonverzijaEntity konverzijaByKonverzijaId;
    @ManyToOne
    @JoinColumn(name = "korisnik_id", referencedColumnName = "id", nullable = false)
    private KorisnikEntity korisnikByKorisnikId;


}
