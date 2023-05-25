package web.mjob.models.entities;

import lombok.*;

import jakarta.persistence.*;
import web.mjob.base.BaseEntity;

import java.util.List;
import java.util.Objects;

@Data
@Entity
@Table(name = "dokument _tip", schema = "mjob_database")
public class DokumentTipEntity implements BaseEntity<Long> {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private Long id;
    @Basic
    @Column(name = "naziv", nullable = false, length = 100)
    private String naziv;
    @OneToMany(mappedBy = "dokumentTipId")
    private List<DokumentEntity> dokumentsById;


}
