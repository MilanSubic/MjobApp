package web.mjob.models.entities;


import jakarta.persistence.*;
import lombok.Data;
import web.mjob.base.BaseEntity;

import java.util.Date;

@Data
@Entity
@Table(name = "oglas_statistika", schema = "mjob_database")
public class OglasStatistikaEntity implements BaseEntity<Long> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "oglas_id", referencedColumnName = "id", nullable = false)
    private OglasEntity oglas;

    @ManyToOne
    @JoinColumn(name = "korisnik_id", referencedColumnName = "id")
    private KorisnikEntity korisnik;

    @Basic
    @Column(name = "vrijeme", nullable = false)
    private Date vrijeme;
}
