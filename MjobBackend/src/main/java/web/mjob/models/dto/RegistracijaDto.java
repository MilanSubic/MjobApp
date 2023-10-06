package web.mjob.models.dto;

import lombok.Data;

import java.sql.Timestamp;
import java.util.List;


@Data
public class RegistracijaDto {
    private String ime;

    private String prezime;

    private String imeRoditelja;

    private Timestamp datumRodjenja;

    private String jmbg;

    private Integer brojClanskeKarte;

    private String brojLicneKarte;

    private String brojTelefona;

    private String brojTekucegRacuna;

    private Long obrazovnaUstanovaTipId;
    private String obrazovnaUstanova;

    private String identifikator;

    private String email;

    private Timestamp datumUclanjenja;

    private String korisnickoIme;

    private String lozinka;

    private Boolean aktivan;

    private Long korisnikPolId;

    private Long korisnikTipId;

    private Long mjestoRodjenjaOpstinaId;

    private Integer izdavaocLicneKarteOpstinaId;
    private Integer ustanovaOpstinaIdId;

    private Long opstinaId;
    private Long naseljenoMjestoId;
    private String ulicaIBroj;

    private Integer godina;

    private String brojZdravstveneKnjizice;

    private Boolean osiguranjeZadruga;

    private String brojMobilogTelefona;

    public List<DokumentDto> dokumenti;
}
