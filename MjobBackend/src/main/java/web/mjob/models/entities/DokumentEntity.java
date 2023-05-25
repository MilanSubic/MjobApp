package web.mjob.models.entities;

import lombok.*;

import jakarta.persistence.*;
import java.util.List;
import java.util.Objects;

@Data
@Entity
@Table(name = "dokument", schema = "mjob_database")
public class DokumentEntity {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private Long id;
    @Basic
    @Column(name = "naziv", nullable = false, length = 1024)
    private String naziv;
    @Basic
    @Column(name = "velicina", nullable = false)
    private Long velicina;
    @ManyToOne
    @JoinColumn(name = "dokument_tip_id", referencedColumnName = "id", nullable = false)
    private DokumentTipEntity dokumentTipId;
    @OneToMany(mappedBy = "dokumentByDokumentId")
    private List<DokumentPorukaEntity> dokumentPorukasById;
    @OneToMany(mappedBy = "dokumentByDokumentId")
    private List<DokumentSadrzajEntity> dokumentSadrzajsById;
    @OneToMany(mappedBy = "dokumentByDokumentId")
    private List<KorisnikDokumentEntity> korisnikDokumentsById;


}
