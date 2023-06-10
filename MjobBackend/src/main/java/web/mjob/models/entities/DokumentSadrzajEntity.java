package web.mjob.models.entities;

import lombok.*;

import jakarta.persistence.*;

@Data
@Entity
@Table(name = "dokument_sadrzaj", schema = "mjob_database")
public class DokumentSadrzajEntity {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Basic
    @Column(name = "sadrzaj", nullable = false, columnDefinition="LONGTEXT")
    private String sadrzaj;
    @Basic
    @Column(name = "contentType", nullable = true, length = 45)
    private String contentType;
    @ManyToOne
    @JoinColumn(name = "dokument_id", referencedColumnName = "id", nullable = false)
    private DokumentEntity dokumentByDokumentId;


}
