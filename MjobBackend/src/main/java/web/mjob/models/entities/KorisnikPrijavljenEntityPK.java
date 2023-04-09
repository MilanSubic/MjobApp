package web.mjob.models.entities;

import lombok.*;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Data
public class KorisnikPrijavljenEntityPK implements Serializable {
    @Column(name = "id", nullable = false)
    @GeneratedValue
    @Id
    private Long id;
    @Column(name = "oglas_id", nullable = false)
    @Id
    private Integer oglasId;
    @Column(name = "korisnik_id", nullable = false)
    @Id
    private Integer korisnikId;

}
