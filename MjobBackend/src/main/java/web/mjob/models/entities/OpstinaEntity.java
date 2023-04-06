package web.mjob.models.entities;

import lombok.*;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Data
@Entity
@Table(name = "opstina", schema = "mjob_database")
public class OpstinaEntity {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private Long id;
    @Basic
    @Column(name = "naziv", nullable = false, length = 500)
    private String naziv;
    @OneToMany(mappedBy = "opstinaByMjestoRodjenjaOpstinaId")
    private List<KorisnikEntity> korisniksById;
    @OneToMany(mappedBy = "opstinaByIzdavaocLicneKarteOpstinaId")
    private List<KorisnikEntity> korisniksById_0;
    @OneToMany(mappedBy = "opstinaByOpstinaId")
    private List<NaseljenoMjestoEntity> naseljenoMjestosById;


}
