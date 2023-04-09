package web.mjob.models.entities;

import lombok.*;

import jakarta.persistence.*;
import java.util.Objects;

@Data
@Entity
@Table(name = "dokument_poruka", schema = "mjob_database")

public class DokumentPorukaEntity {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "dokument_id", referencedColumnName = "id", nullable = false)
    private DokumentEntity dokumentByDokumentId;
    @ManyToOne
    @JoinColumn(name = "poruka_id", referencedColumnName = "id", nullable = false)
    private PorukaEntity porukaByPorukaId;


}
