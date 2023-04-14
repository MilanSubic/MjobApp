package web.mjob.models.entities;

import lombok.*;

import jakarta.persistence.*;

@Data
@Entity
@Table(name = "adresa", schema = "mjob_database")
public class AdresaEntity {
    @Id
    @GeneratedValue
    @Column(name = "Id", nullable = false)
    private Long id;
    @Basic
    @Column(name = "Naziv", nullable = false, length = 45)
    private String naziv;
    @ManyToOne
    @JoinColumn(name = "NaseljenoMjesto_idNaseljenoMjesto", referencedColumnName = "id", nullable = false)
    private NaseljenoMjestoEntity naseljenoMjestoByNaseljenoMjestoIdNaseljenoMjesto;

    public AdresaEntity() {
    }


    protected boolean canEqual(final Object other) {
        return other instanceof AdresaEntity;
    }

}
