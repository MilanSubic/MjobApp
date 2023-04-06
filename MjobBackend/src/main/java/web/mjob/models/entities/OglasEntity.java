package web.mjob.models.entities;

import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;
import java.util.Objects;

@Data
@Entity
@Table(name = "oglas", schema = "mjob_database")
public class OglasEntity {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private Long id;
    @Basic
    @Column(name = "sadrzaj", nullable = false, length = 1000)
    private String sadrzaj;
    @Basic
    @Column(name = "mjesto", nullable = true, length = 45)
    private String mjesto;
    @Basic
    @Column(name = "napomena", nullable = true, length = 45)
    private String napomena;
    @Basic
    @Column(name = "datum", nullable = true)
    private Timestamp datum;
    @Basic
    @Column(name = "brojLjudi", nullable = true)
    private Integer brojLjudi;
    @Basic
    @Column(name = "aktivanDo", nullable = false)
    private Timestamp aktivanDo;
    @Basic
    @Column(name = "satnica", nullable = false, precision = 2)
    private BigDecimal satnica;
    @Basic
    @Column(name = "javni", nullable = false)
    private Boolean javni;
    @Basic
    @Column(name = "posao_tip_id", nullable = false)
    private Integer posaoTipId;
    @Basic
    @Column(name = "novcana_naknada_tip_id", nullable = false)
    private Integer novcanaNaknadaTipId;
    @Basic
    @Column(name = "narucilac_id", nullable = false)
    private Integer narucilacId;
    @OneToMany(mappedBy = "oglasByOglasId")
    private List<KorisnikPrijavljenEntity> korisnikPrijavljensById;
    @ManyToOne
    @JoinColumn(name = "posao_tip_id", referencedColumnName = "id", nullable = false)
    private PosaoTipEntity posaoTipByPosaoTipId;
    @ManyToOne
    @JoinColumn(name = "novcana_naknada_tip_id", referencedColumnName = "id", nullable = false)
    private NovcanaNaknadaTipEntity novcanaNaknadaTipByNovcanaNaknadaTipId;
    @ManyToOne
    @JoinColumn(name = "narucilac_id", referencedColumnName = "id", nullable = false)
    private NarucilacEntity narucilacByNarucilacId;


}
