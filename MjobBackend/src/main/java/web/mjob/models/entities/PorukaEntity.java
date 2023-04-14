package web.mjob.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import jakarta.persistence.*;
import java.util.List;
import java.util.Objects;

@Data
@Entity
@Table(name = "poruka", schema = "mjob_database")
public class PorukaEntity {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private Long id;
    @Basic
    @Column(name = "naslov", nullable = false, length = 100)
    private String naslov;
    @Basic
    @Column(name = "sadrzaj", nullable = false, length = -1)
    private String sadrzaj;
    @OneToMany(mappedBy = "porukaByPorukaId")
    private List<DokumentPorukaEntity> dokumentPorukasById;
    @ManyToOne
    @JoinColumn(name = "konverzija_id", referencedColumnName = "id", nullable = false)
    private KonverzijaEntity konverzijaByKonverzijaId;


}
