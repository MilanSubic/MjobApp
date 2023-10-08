package web.mjob.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import jakarta.persistence.*;
import web.mjob.base.BaseEntity;

import java.util.Date;
import java.util.List;
import java.util.Objects;

@Data
@Entity
@Table(name = "poruka", schema = "mjob_database")
public class PorukaEntity implements BaseEntity<Long> {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Basic
    @Column(name = "sadrzaj", nullable = false, length = -1)
    private String sadrzaj;
    @Basic
    @Column(name = "kreirana", nullable = true)
    private Date kreirana;
    @OneToMany(mappedBy = "porukaEntity")
    private List<DokumentPorukaEntity> dokumenti;
    @ManyToOne
    @JoinColumn(name = "konverzacija_id", referencedColumnName = "id", nullable = false)
    private KonverzacijaEntity konverzacija;
    @ManyToOne
    @JoinColumn(name = "korisnik_id", referencedColumnName = "id", nullable = false)
    private KorisnikEntity korisnik;
}
