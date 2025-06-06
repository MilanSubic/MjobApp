package web.mjob.models.entities;

import lombok.*;
import jakarta.persistence.*;
import web.mjob.base.BaseEntity;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;
import java.util.Objects;

@Data
@Entity
@Table(name = "oglas", schema = "mjob_database")
public class OglasEntity implements BaseEntity<Long> {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
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
    @Column(name = "javni")
    private Boolean javni;
    @Basic
    @Column(name = "obrisan", nullable = false)
    private Boolean obrisan;
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