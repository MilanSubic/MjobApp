package web.mjob.models.entities;

import lombok.*;

import jakarta.persistence.*;
import java.util.Objects;

@Data
@Entity
@Table(name = "korisnik_prijavljen", schema = "mydb")

public class KorisnikPrijavljenEntity {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Basic
    @Column(name = "odobren", nullable = false)
    private Boolean odobren;
    @ManyToOne
    @JoinColumn(name = "oglas_id", referencedColumnName = "id", nullable = false)
    private OglasEntity oglasByOglasId;
    @ManyToOne
    @JoinColumn(name = "korisnik_id", referencedColumnName = "id", nullable = false)
    private KorisnikEntity korisnikByKorisnikId;


    public KorisnikPrijavljenEntity(boolean b, OglasEntity oglasEntityById, KorisnikEntity korisnikEntityById) {
        this.odobren=b;
        this.oglasByOglasId=oglasEntityById;
        this.korisnikByKorisnikId=korisnikEntityById;
    }

    public KorisnikPrijavljenEntity() {

    }
}
