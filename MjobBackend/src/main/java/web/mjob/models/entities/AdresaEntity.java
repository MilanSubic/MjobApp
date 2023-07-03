package web.mjob.models.entities;

import lombok.*;

import jakarta.persistence.*;

@Data
@Entity
@Table(name = "adresa", schema = "mjob_database")
public class AdresaEntity {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "Id", nullable = false)
    private Long id;
    @Basic
    @Column(name = "Naziv", nullable = false, length = 45)
    private String naziv;
    @ManyToOne
    @JoinColumn(name = "naseljeno_mjesto_id", referencedColumnName = "id", nullable = false)
    private NaseljenoMjestoEntity naseljenoMjestoByNaseljenoMjestoIdNaseljenoMjesto;


}
