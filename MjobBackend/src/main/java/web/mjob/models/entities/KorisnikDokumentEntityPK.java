package web.mjob.models.entities;

import lombok.*;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Data
public class KorisnikDokumentEntityPK implements Serializable {
    @Column(name = "id", nullable = false)
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Id
    private Long id;
    @Column(name = "dokument_id", nullable = false)
    @Id
    private Integer dokumentId;
    @Column(name = "korisnik_id", nullable = false)
    @Id
    private Integer korisnikId;

}
