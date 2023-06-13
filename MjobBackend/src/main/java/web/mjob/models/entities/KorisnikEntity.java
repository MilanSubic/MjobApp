package web.mjob.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import web.mjob.base.BaseEntity;

import jakarta.persistence.*;

import java.sql.Date;
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
    @Column(name = "brojClanskeKarte", nullable = true)
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
    @ManyToOne
    @JoinColumn(name = "obrazovna_ustanova_tip_id", referencedColumnName = "id", nullable = false)
    private ObrazovnaUstanovaTipEntity obrazovnaUstanovaTip;
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
    @Column(name = "datumUclanjenja", nullable = true)
    private Timestamp datumUclanjenja;
    @Basic
    @Column(name = "korisnickoIme", nullable = false, length = 45)
    private String korisnickoIme;
    @Basic
    @Column(name = "lozinka", nullable = false, length = 1024)
    private String lozinka;
    @Basic
    @Column(name = "ulicaIBroj", nullable = true, length = 255)
    private String ulicaIBroj;
    @ManyToOne
    @JoinColumn(name = "opstina_id", referencedColumnName = "id", nullable = true)
    private OpstinaEntity opstina;
    @Basic
    @Column(name = "godina", nullable = true)
    private Integer godina;
    @Basic
    @Column(name = "budzet", nullable = true)
    private Boolean budzet;
    @Basic
    @Column(name = "smijer", nullable = true, length = 255)
    private String smijer;
    @Basic
    @Column(name = "brojZdravstveneKnjizice", nullable = true, length = 45)
    private String brojZdravstveneKnjizice;
    @Basic
    @Column(name = "osiguranjeZadruga", nullable = true)
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
    private KorisnikPolEntity korisnikPolId;
    @ManyToOne
    @JoinColumn(name = "korisnik_tip_id", referencedColumnName = "id", nullable = false)
    private KorisnikTipEntity korisnikTipId;
    @ManyToOne
    @JoinColumn(name = "korisnik_status_id", referencedColumnName = "id", nullable = false)
    private KorisnikStatusEntity korisnikStatusId;
    @ManyToOne
    @JoinColumn(name = "mjesto_rodjenja_opstina_id", referencedColumnName = "id", nullable = false)
    private OpstinaEntity mjestoRodjenjaOpstinaId;
    @ManyToOne
    @JoinColumn(name = "naseljeno_mjesto_id", referencedColumnName = "id", nullable = true)
    private NaseljenoMjestoEntity naseljenoMjestoId;
    @ManyToOne
    @JoinColumn(name = "izdavaoc_licne_karte_opstina_id", referencedColumnName = "id", nullable = true)
    private OpstinaEntity izdavaocLicneKarteOpstinaId;
    @OneToMany(mappedBy = "korisnikByKorisnikId")
    private List<KorisnikDokumentEntity> korisnikDokumentsById;
    @OneToMany(mappedBy = "korisnikByKorisnikId")
    private List<KorisnikPrijavljenEntity> korisnikPrijavljensById;

}
