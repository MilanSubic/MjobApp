package web.mjob.models.entities;

import lombok.*;

import jakarta.persistence.*;
import web.mjob.base.BaseEntity;

import java.util.List;
import java.util.Objects;

@Data
@Entity
@Table(name = "obrazovna_ustanova_tip", schema = "mjob_database")
public class ObrazovnaUstanovaTipEntity implements BaseEntity<Long> {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private Long id;
    @Basic
    @Column(name = "naziv", nullable = false, length = 45)
    private String naziv;

    @OneToMany(mappedBy = "obrazovnaUstanovaTip")
    private List<KorisnikEntity> korisnicsById;
}
