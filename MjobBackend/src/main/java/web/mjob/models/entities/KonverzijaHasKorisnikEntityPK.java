package web.mjob.models.entities;

import lombok.*;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Data
public class KonverzijaHasKorisnikEntityPK implements Serializable {
    @Column(name = "id", nullable = false)
    @GeneratedValue
    @Id
    private Long id;
    @Column(name = "konverzija_id", nullable = false)
    @Id
    private Integer konverzijaId;
    @Column(name = "korisnik_id", nullable = false)
    @Id
    private Integer korisnikId;

}
