package web.mjob.models.entities;

import lombok.*;
import web.mjob.base.BaseEntity;

import jakarta.persistence.*;
import java.util.List;
import java.util.Objects;

@Data
@Entity
@Table(name = "korisnik_tip", schema = "mjob_database")
public class KorisnikTipEntity implements BaseEntity<Long> {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private Long id;
    @Basic
    @Column(name = "naziv", nullable = false, length = 45)
    private String naziv;
    @OneToMany(mappedBy = "korisnikTipId")
    private List<KorisnikEntity> korisniksById;


}
