package web.mjob.models.entities;

import lombok.*;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Data
@Entity
@Table(name = "dokument _tip", schema = "mjob_database")
public class DokumentTipEntity {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private Long id;
    @Basic
    @Column(name = "naziv", nullable = false, length = 100)
    private String naziv;
    @OneToMany(mappedBy = "dokumentTipByDokumentTipId")
    private List<DokumentEntity> dokumentsById;


}
