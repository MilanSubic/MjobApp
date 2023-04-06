package web.mjob.models.entities;

import lombok.*;

import javax.persistence.*;
import java.util.Objects;

@Data
@Entity
@Table(name = "korisnik_dokument", schema = "mjob_database")
@IdClass(KorisnikDokumentEntityPK.class)
public class KorisnikDokumentEntity {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private Long id;
    @Id
    @Column(name = "dokument_id", nullable = false)
    private Integer dokumentId;
    @Id
    @Column(name = "korisnik_id", nullable = false)
    private Integer korisnikId;
    @ManyToOne
    @JoinColumn(name = "dokument_id", referencedColumnName = "id", nullable = false)
    private DokumentEntity dokumentByDokumentId;
    @ManyToOne
    @JoinColumn(name = "korisnik_id", referencedColumnName = "id", nullable = false)
    private KorisnikEntity korisnikByKorisnikId;


}
