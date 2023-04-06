package web.mjob.models.entities;

import lombok.*;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Data
@Entity
@Table(name = "korisnik_tip", schema = "mjob_database")
public class KorisnikTipEntity {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private Long id;
    @Basic
    @Column(name = "naziv", nullable = false, length = 45)
    private String naziv;
    @OneToMany(mappedBy = "korisnikTipByKorisnikTipId")
    private List<KorisnikEntity> korisniksById;


}
