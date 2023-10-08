package web.mjob.models.entities;

import lombok.*;

import jakarta.persistence.*;
import java.util.Objects;

@Data
@Entity
@Table(name = "korisnik_dokument", schema = "mjob_database")
public class KorisnikDokumentEntity {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "dokument_id", referencedColumnName = "id", nullable = false)
    private DokumentEntity dokumentByDokumentId;
    @ManyToOne
    @JoinColumn(name = "korisnik_id", referencedColumnName = "id", nullable = false)
    private KorisnikEntity korisnikByKorisnikId;


}
