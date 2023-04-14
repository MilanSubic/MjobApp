package web.mjob.models.entities;

import lombok.*;

import jakarta.persistence.*;
import java.util.List;
import java.util.Objects;

@Data
@Entity
@Table(name = "naseljeno_mjesto", schema = "mjob_database")
public class NaseljenoMjestoEntity {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private Long id;
    @Basic
    @Column(name = "naziv", nullable = false, length = 45)
    private String naziv;
    @OneToMany(mappedBy = "naseljenoMjestoByNaseljenoMjestoIdNaseljenoMjesto")
    private List<AdresaEntity> adresasById;
    @OneToMany(mappedBy = "naseljenoMjestoByNaseljenoMjestoId")
    private List<KorisnikEntity> korisniksById;
    @OneToMany(mappedBy = "naseljenoMjestoByNaseljenoMjestoId")
    private List<NarucilacEntity> narucilacsById;
    @ManyToOne
    @JoinColumn(name = "opstina_id", referencedColumnName = "id", nullable = false)
    private OpstinaEntity opstinaByOpstinaId;


}
