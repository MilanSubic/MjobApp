package web.mjob.models.dto;

import lombok.*;
import java.sql.Timestamp;
import java.util.List;

@Data
public class Korisnik {

    private Long id;

    private String ime;

    private String prezime;

    private String imeRoditelja;

    private Timestamp datumRodjenja;

    private String jmbg;

    private Integer brojClanskeKarte;

    private String brojLicneKarte;

    private String brojTelefona;

    private String brojTekucegRacuna;

    private String obrazovnaUstanova;
    private String obrazovnaUstanovaTipNaziv;

    private String identifikator;

    private String email;

    private Timestamp datumUclanjenja;

    private String korisnickoIme;

    private String lozinka;

    private String korisnikPolNaziv;

    private String korisnikTipNaziv;

    private String korisnikStatusNaziv;

    private String mjestoRodjenjaOpstinaNaziv;

    private String naseljenoMjestoNaziv;

    private String izdavaocLicneKarteOpstinaNaziv;

    private String ulicaIBroj;

    private Integer godina;

    private Boolean budzet;

    private String smijer;

    private String brojZdravstveneKnjizice;

    private Boolean osiguranjeZadruga;

    private String brojMobilogTelefona;

    private List<KorisnikDokument> korisnikDokumentsById;
}
