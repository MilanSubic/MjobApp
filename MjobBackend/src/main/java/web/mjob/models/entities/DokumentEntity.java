package web.mjob.models.entities;

import lombok.*;

import jakarta.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "dokument", schema = "mjob_database")
public class DokumentEntity {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Basic
    @Column(name = "naziv", nullable = false, length = 1024)
    private String naziv;
    @Basic
    @Column(name = "velicina", nullable = false)
    private Long velicina;
    @ManyToOne
    @JoinColumn(name = "dokument_tip_id", referencedColumnName = "id")
    private DokumentTipEntity dokumentTipId;
    @OneToMany(mappedBy = "dokumentEntity")
    private List<DokumentPorukaEntity> dokumentPorukas;
    @OneToMany(mappedBy = "dokumentByDokumentId")
    private List<DokumentSadrzajEntity> dokumentSadrzajsById;
    @OneToMany(mappedBy = "dokumentByDokumentId")
    private List<KorisnikDokumentEntity> korisnikDokumentsById;
}
