package web.mjob.models.entities;

import lombok.*;

import jakarta.persistence.*;
import java.util.List;
import java.util.Objects;

@Data
@Entity
@Table(name = "novcana_naknada_tip", schema = "mjob_database")
public class NovcanaNaknadaTipEntity {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private Long id;
    @Basic
    @Column(name = "naziv", nullable = false, length = 255)
    private String naziv;
    @OneToMany(mappedBy = "novcanaNaknadaTipByNovcanaNaknadaTipId")
    private List<OglasEntity> oglasById;


}
