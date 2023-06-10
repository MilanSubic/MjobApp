package web.mjob.models.entities;

import jakarta.persistence.*;
import lombok.Data;
import web.mjob.base.BaseEntity;

import java.util.List;

@Data
@Entity
@Table(name = "korisnik_status", schema = "mjob_database")
public class KorisnikStatusEntity implements BaseEntity<Long> {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Basic
    @Column(name = "naziv", nullable = false, length = 45)
    private String naziv;
    @OneToMany(mappedBy = "korisnikStatusId")
    private List<KorisnikEntity> korisniksById;
}
