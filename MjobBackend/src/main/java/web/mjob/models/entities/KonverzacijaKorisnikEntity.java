package web.mjob.models.entities;

import lombok.*;

import jakarta.persistence.*;

import java.util.Date;
import java.util.Objects;

@Data
@Entity
@Table(name = "konverzacija_korisnik", schema = "mjob_database")
public class KonverzacijaKorisnikEntity {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Basic
    @Column(name = "procitana", nullable = false)
    private boolean procitana;
    @Basic
    @Column(name = "vrijeme", nullable = true)
    private Date vrijeme;
    @ManyToOne
    @JoinColumn(name = "konverzacija_id", referencedColumnName = "id", nullable = false)
    private KonverzacijaEntity konverzacija;
    @ManyToOne
    @JoinColumn(name = "korisnik_id", referencedColumnName = "id", nullable = false)
    private KorisnikEntity korisnik;


}
