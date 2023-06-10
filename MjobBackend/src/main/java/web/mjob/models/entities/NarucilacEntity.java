package web.mjob.models.entities;

import lombok.*;

import jakarta.persistence.*;
import java.util.List;
import java.util.Objects;

@Data
@Entity
@Table(name = "narucilac", schema = "mjob_database")
public class NarucilacEntity {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Basic
    @Column(name = "naziv", nullable = false, length = 255)
    private String naziv;
    @Basic
    @Column(name = "brojTelefona", nullable = true, length = 45)
    private String brojTelefona;
    @Basic
    @Column(name = "email", nullable = true, length = 45)
    private String email;
    @Basic
    @Column(name = "ulicaIBroj", nullable = false, length = 255)
    private String ulicaIBroj;
    @ManyToOne
    @JoinColumn(name = "naseljeno_mjesto_id", referencedColumnName = "id", nullable = false)
    private NaseljenoMjestoEntity naseljenoMjestoByNaseljenoMjestoId;
    @OneToMany(mappedBy = "narucilacByNarucilacId")
    private List<OglasEntity> oglasById;


}
