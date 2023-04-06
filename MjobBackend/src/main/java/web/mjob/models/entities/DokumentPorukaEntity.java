package web.mjob.models.entities;

import lombok.*;

import javax.persistence.*;
import java.util.Objects;

@Data
@Entity
@Table(name = "dokument_poruka", schema = "mjob_database")
@IdClass(DokumentPorukaEntityPK.class)
public class DokumentPorukaEntity {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private Long id;
    @Id
    @Column(name = "dokument_id", nullable = false)
    private Integer dokumentId;
    @Id
    @Column(name = "poruka_id", nullable = false)
    private Integer porukaId;
    @ManyToOne
    @JoinColumn(name = "dokument_id", referencedColumnName = "id", nullable = false)
    private DokumentEntity dokumentByDokumentId;
    @ManyToOne
    @JoinColumn(name = "poruka_id", referencedColumnName = "id", nullable = false)
    private PorukaEntity porukaByPorukaId;


}
