package web.mjob.models.entities;

import lombok.*;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Data
@Entity
@Table(name = "korisnik_pol", schema = "mjob_database")
public class KorisnikPolEntity {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private Long id;
    @Basic
    @Column(name = "naziv", nullable = false, length = 45)
    private String naziv;
    @OneToMany(mappedBy = "korisnikPolByKorisnikPolId")
    private List<KorisnikEntity> korisniksById;


}
