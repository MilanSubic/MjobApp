package web.mjob.models.entities;

import lombok.*;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Data
@Entity
@Table(name = "konverzija", schema = "mjob_database")
public class KonverzijaEntity {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private Long id;
    @Basic
    @Column(name = "tema", nullable = false, length = 45)
    private String tema;
    @OneToMany(mappedBy = "konverzijaByKonverzijaId")
    private List<KonverzijaHasKorisnikEntity> konverzijaHasKorisniksById;
    @OneToMany(mappedBy = "konverzijaByKonverzijaId")
    private List<PorukaEntity> porukasById;


}
