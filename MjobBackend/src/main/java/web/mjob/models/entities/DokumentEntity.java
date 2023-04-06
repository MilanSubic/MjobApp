package web.mjob.models.entities;

import lombok.*;

import javax.persistence.*;
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
    @Column(name = "naziv", nullable = false, length = 45)
    private String naziv;
    @Basic
    @Column(name = "dokument _tip_id", nullable = false)
    private Integer dokumentTipId;
    @ManyToOne
    @JoinColumn(name = "dokument _tip_id", referencedColumnName = "id", nullable = false)
    private DokumentTipEntity dokumentTipByDokumentTipId;
    @OneToMany(mappedBy = "dokumentByDokumentId")
    private List<DokumentPorukaEntity> dokumentPorukasById;
    @OneToMany(mappedBy = "dokumentByDokumentId")
    private List<DokumentSadrzajEntity> dokumentSadrzajsById;
    @OneToMany(mappedBy = "dokumentByDokumentId")
    private List<KorisnikDokumentEntity> korisnikDokumentsById;


}
