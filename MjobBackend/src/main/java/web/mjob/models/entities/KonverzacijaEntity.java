package web.mjob.models.entities;

import lombok.*;

import jakarta.persistence.*;
import web.mjob.base.BaseEntity;

import java.util.List;
import java.util.Objects;

@Data
@Entity
@Table(name = "konverzacija", schema = "mjob_database")
public class KonverzacijaEntity implements BaseEntity<Long> {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Basic
    @Column(name = "tema", nullable = false, length = 45)
    private String tema;
    @ManyToOne
    @JoinColumn(name = "korisnik_id", referencedColumnName = "id", nullable = false)
    private KorisnikEntity korisnik;
    @OneToMany(mappedBy = "konverzacija")
    private List<KonverzacijaKorisnikEntity> konverzacijaKorisniks;
}
