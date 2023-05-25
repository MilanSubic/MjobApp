package web.mjob.models.entities;

import lombok.*;

import jakarta.persistence.*;
import web.mjob.base.BaseEntity;

import java.util.List;
import java.util.Objects;

@Data
@Entity
@Table(name = "opstina", schema = "mjob_database")
public class OpstinaEntity implements BaseEntity<Long> {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private Long id;
    @Basic
    @Column(name = "naziv", nullable = false, length = 500)
    private String naziv;
    @OneToMany(mappedBy = "mjestoRodjenjaOpstinaId")
    private List<KorisnikEntity> korisniksById;
    @OneToMany(mappedBy = "izdavaocLicneKarteOpstinaId")
    private List<KorisnikEntity> korisniksById_0;
    @OneToMany(mappedBy = "opstina")
    private List<KorisnikEntity> korisniksById_1;
    @OneToMany(mappedBy = "opstina")
    private List<NaseljenoMjestoEntity> naseljenoMjestosById;


}
