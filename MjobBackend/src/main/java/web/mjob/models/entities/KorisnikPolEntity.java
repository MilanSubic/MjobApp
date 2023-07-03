package web.mjob.models.entities;

import lombok.*;

import jakarta.persistence.*;
import web.mjob.base.BaseEntity;

import java.util.List;
import java.util.Objects;

@Data
@Entity
@Table(name = "korisnik_pol", schema = "mjob_database")
public class KorisnikPolEntity implements BaseEntity<Long> {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Basic
    @Column(name = "naziv", nullable = false, length = 45)
    private String naziv;
    @OneToMany(mappedBy = "korisnikPolId")
    private List<KorisnikEntity> korisniksById;
@Override
    public String toString()
{
   return id+" "+naziv;
}

}
