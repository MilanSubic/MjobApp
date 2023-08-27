package web.mjob.models.entities;

import lombok.Data;

import jakarta.persistence.*;
import java.util.Objects;

@Data
@Entity
@Table(name = "clanstvo_osnov", schema = "mjob_database")
public class ClanstvoOsnovEntity {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Basic
    @Column(name = "naziv", nullable = false, length = 45)
    private String naziv;
    @ManyToOne
    @JoinColumn(name = "korisnik_id", referencedColumnName = "id", nullable = false)
    private KorisnikEntity korisnikByKorisnikId;


}
