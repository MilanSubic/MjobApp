package web.mjob.models.entities;

import lombok.*;

import jakarta.persistence.*;
import web.mjob.base.BaseEntity;

import java.util.List;
import java.util.Objects;

@Data
@Entity
@Table(name = "novcana_naknada_tip", schema = "mjob_database")
public class NovcanaNaknadaTipEntity implements BaseEntity<Long> {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Basic
    @Column(name = "naziv", nullable = false, length = 255)
    private String naziv;
    @OneToMany(mappedBy = "novcanaNaknadaTipByNovcanaNaknadaTipId")
    private List<OglasEntity> oglasById;


}
