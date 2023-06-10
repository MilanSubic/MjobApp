package web.mjob.models.entities;

import lombok.*;

import jakarta.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "posao_tip", schema = "mjob_database")
public class PosaoTipEntity {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Basic
    @Column(name = "naziv", nullable = false, length = 255)
    private String naziv;
    @OneToMany(mappedBy = "posaoTipByPosaoTipId")
    private List<OglasEntity> oglasById;

    public PosaoTipEntity() {
    }

    protected boolean canEqual(final Object other) {
        return other instanceof PosaoTipEntity;
    }

}
