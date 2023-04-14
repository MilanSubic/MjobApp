package web.mjob.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import web.mjob.base.BaseEntity;

import jakarta.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Data
@Entity
@Table(name = "korisnik", schema = "mjob_database")
public class KorisnikEntity implements BaseEntity<Long> {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private Long id;
    @Basic
    @Column(name = "ime", nullable = false, length = 45)
    private String ime;
    @Basic
    @Column(name = "prezime", nullable = false, length = 45)
    private String prezime;
    @Basic
    @Column(name = "imeRoditelja", nullable = false, length = 45)
    private String imeRoditelja;
    @Basic
    @Column(name = "datumRodjenja", nullable = false)
    private Timestamp datumRodjenja;
    @Basic
    @Column(name = "JMBG", nullable = false, length = 13)
    private String jmbg;
    @Basic
    @Column(name = "brojClanskeKarte", nullable = false)
    private Integer brojClanskeKarte;
    @Basic
    @Column(name = "brojLicneKarte", nullable = true, length = 7)
    private String brojLicneKarte;
    @Basic
    @Column(name = "brojTelefona", nullable = false, length = 45)
    private String brojTelefona;
    @Basic
    @Column(name = "brojTekucegRacuna", nullable = false, length = 45)
    private String brojTekucegRacuna;
    @Basic
    @Column(name = "obrazovnaUstanova", nullable = false, length = 45)
    private String obrazovnaUstanova;
    @Basic
    @Column(name = "identifikator", nullable = false, length = 45)
    private String identifikator;
    @Basic
    @Column(name = "email", nullable = false, length = 45)
    private String email;
    @Basic
    @Column(name = "datumUclanjenja", nullable = false)
    private Timestamp datumUclanjenja;
    @Basic
    @Column(name = "korisnickoIme", nullable = false, length = 45)
    private String korisnickoIme;
    @Basic
    @Column(name = "lozinka", nullable = false, length = 45)
    private String lozinka;
    @Basic
    @Column(name = "aktivan", nullable = false)
    private Boolean aktivan;
    @Basic
    @Column(name = "ulicaIBroj", nullable = false, length = 255)
    private String ulicaIBroj;
    @Basic
    @Column(name = "godina", nullable = false)
    private Integer godina;
    @Basic
    @Column(name = "budzet", nullable = true)
    private Boolean budzet;
    @Basic
    @Column(name = "smijer", nullable = false, length = 255)
    private String smijer;
    @Basic
    @Column(name = "brojZdravstveneKnjizice", nullable = false, length = 45)
    private String brojZdravstveneKnjizice;
    @Basic
    @Column(name = "osiguranjeZadruga", nullable = false)
    private Boolean osiguranjeZadruga;
    @Basic
    @Column(name = "brojMobilogTelefona", nullable = true, length = 45)
    private String brojMobilogTelefona;
    @OneToMany(mappedBy = "korisnikByKorisnikId")
    private List<ClanstvoOsnovEntity> clanstvoOsnovsById;
    @OneToMany(mappedBy = "korisnikByKorisnikId")
    private List<KonverzijaHasKorisnikEntity> konverzijaHasKorisniksById;
    @ManyToOne
    @JoinColumn(name = "korisnik_pol_id", referencedColumnName = "id", nullable = false)
    private KorisnikPolEntity korisnikPolByKorisnikPolId;
    @ManyToOne
    @JoinColumn(name = "korisnik_tip_id", referencedColumnName = "id", nullable = false)
    private KorisnikTipEntity korisnikTipByKorisnikTipId;
    @ManyToOne
    @JoinColumn(name = "mjesto_rodjenja_opstina_id", referencedColumnName = "id", nullable = false)
    private OpstinaEntity opstinaByMjestoRodjenjaOpstinaId;
    @ManyToOne
    @JoinColumn(name = "naseljeno_mjesto_id", referencedColumnName = "id", nullable = false)
    private NaseljenoMjestoEntity naseljenoMjestoByNaseljenoMjestoId;
    @ManyToOne
    @JoinColumn(name = "izdavaoc_licne_karte_opstina_id", referencedColumnName = "id", nullable = false)
    private OpstinaEntity opstinaByIzdavaocLicneKarteOpstinaId;
    @OneToMany(mappedBy = "korisnikByKorisnikId")
    private List<KorisnikDokumentEntity> korisnikDokumentsById;
    @OneToMany(mappedBy = "korisnikByKorisnikId")
    private List<KorisnikPrijavljenEntity> korisnikPrijavljensById;


}
