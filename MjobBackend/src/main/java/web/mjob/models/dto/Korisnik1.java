package web.mjob.models.dto;

import java.sql.Timestamp;
import java.util.List;

public class Korisnik1 {
	
	
	 public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getIme() {
		return ime;
	}

	public void setIme(String ime) {
		this.ime = ime;
	}

	public String getPrezime() {
		return prezime;
	}

	public void setPrezime(String prezime) {
		this.prezime = prezime;
	}

	public String getImeRoditelja() {
		return imeRoditelja;
	}

	public void setImeRoditelja(String imeRoditelja) {
		this.imeRoditelja = imeRoditelja;
	}

	public Timestamp getDatumRodjenja() {
		return datumRodjenja;
	}

	public void setDatumRodjenja(Timestamp datumRodjenja) {
		this.datumRodjenja = datumRodjenja;
	}

	public String getJmbg() {
		return jmbg;
	}

	public void setJmbg(String jmbg) {
		this.jmbg = jmbg;
	}

	public Integer getBrojClanskeKarte() {
		return brojClanskeKarte;
	}

	public void setBrojClanskeKarte(Integer brojClanskeKarte) {
		this.brojClanskeKarte = brojClanskeKarte;
	}

	public String getBrojLicneKarte() {
		return brojLicneKarte;
	}

	public void setBrojLicneKarte(String brojLicneKarte) {
		this.brojLicneKarte = brojLicneKarte;
	}

	public String getBrojTelefona() {
		return brojTelefona;
	}

	public void setBrojTelefona(String brojTelefona) {
		this.brojTelefona = brojTelefona;
	}

	public String getBrojTekucegRacuna() {
		return brojTekucegRacuna;
	}

	public void setBrojTekucegRacuna(String brojTekucegRacuna) {
		this.brojTekucegRacuna = brojTekucegRacuna;
	}

	public String getObrazovnaUstanova() {
		return obrazovnaUstanova;
	}

	public void setObrazovnaUstanova(String obrazovnaUstanova) {
		this.obrazovnaUstanova = obrazovnaUstanova;
	}

	public String getIdentifikator() {
		return identifikator;
	}

	public void setIdentifikator(String identifikator) {
		this.identifikator = identifikator;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Timestamp getDatumUclanjenja() {
		return datumUclanjenja;
	}

	public void setDatumUclanjenja(Timestamp datumUclanjenja) {
		this.datumUclanjenja = datumUclanjenja;
	}

	public String getKorisnickoIme() {
		return korisnickoIme;
	}

	public void setKorisnickoIme(String korisnickoIme) {
		this.korisnickoIme = korisnickoIme;
	}

	public String getLozinka() {
		return lozinka;
	}

	public void setLozinka(String lozinka) {
		this.lozinka = lozinka;
	}

	public Integer getKorisnikPolId() {
		return korisnikPolId;
	}

	public void setKorisnikPolId(Integer korisnikPolId) {
		this.korisnikPolId = korisnikPolId;
	}

	public Integer getKorisnikTipId() {
		return korisnikTipId;
	}

	public void setKorisnikTipId(Integer korisnikTipId) {
		this.korisnikTipId = korisnikTipId;
	}

	public Integer getKorisnikStatusId() {
		return korisnikStatusId;
	}

	public void setKorisnikStatusId(Integer korisnikStatusId) {
		this.korisnikStatusId = korisnikStatusId;
	}

	public Integer getMjestoRodjenjaOpstinaId() {
		return mjestoRodjenjaOpstinaId;
	}

	public void setMjestoRodjenjaOpstinaId(Integer mjestoRodjenjaOpstinaId) {
		this.mjestoRodjenjaOpstinaId = mjestoRodjenjaOpstinaId;
	}

	public Integer getNaseljenoMjestoId() {
		return naseljenoMjestoId;
	}

	public void setNaseljenoMjestoId(Integer naseljenoMjestoId) {
		this.naseljenoMjestoId = naseljenoMjestoId;
	}

	public Integer getIzdavaocLicneKarteOpstinaId() {
		return izdavaocLicneKarteOpstinaId;
	}

	public void setIzdavaocLicneKarteOpstinaId(Integer izdavaocLicneKarteOpstinaId) {
		this.izdavaocLicneKarteOpstinaId = izdavaocLicneKarteOpstinaId;
	}

	public String getUlicaIBroj() {
		return ulicaIBroj;
	}

	public void setUlicaIBroj(String ulicaIBroj) {
		this.ulicaIBroj = ulicaIBroj;
	}

	public Integer getGodina() {
		return godina;
	}

	public void setGodina(Integer godina) {
		this.godina = godina;
	}

	public Boolean getBudzet() {
		return budzet;
	}

	public void setBudzet(Boolean budzet) {
		this.budzet = budzet;
	}

	public String getSmijer() {
		return smijer;
	}

	public void setSmijer(String smijer) {
		this.smijer = smijer;
	}

	public String getBrojZdravstveneKnjizice() {
		return brojZdravstveneKnjizice;
	}

	public void setBrojZdravstveneKnjizice(String brojZdravstveneKnjizice) {
		this.brojZdravstveneKnjizice = brojZdravstveneKnjizice;
	}

	public Boolean getOsiguranjeZadruga() {
		return osiguranjeZadruga;
	}

	public void setOsiguranjeZadruga(Boolean osiguranjeZadruga) {
		this.osiguranjeZadruga = osiguranjeZadruga;
	}

	public String getBrojMobilogTelefona() {
		return brojMobilogTelefona;
	}

	public void setBrojMobilogTelefona(String brojMobilogTelefona) {
		this.brojMobilogTelefona = brojMobilogTelefona;
	}

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

    private String identifikator;

    private String email;

    private Timestamp datumUclanjenja;

    private String korisnickoIme;

    private String lozinka;

    private Integer korisnikPolId;

    private Integer korisnikTipId;

    private Integer korisnikStatusId;

    private Integer mjestoRodjenjaOpstinaId;

    private Integer naseljenoMjestoId;

    private Integer izdavaocLicneKarteOpstinaId;
    
    private Integer obrazovnaUstanovaTipId;

    public Integer getObrazovnaUstanovaTipId() {
		return obrazovnaUstanovaTipId;
	}

	public void setObrazovnaUstanovaTipId(Integer obrazovnaUstanovaTipId) {
		this.obrazovnaUstanovaTipId = obrazovnaUstanovaTipId;
	}

	private String ulicaIBroj;

    private Integer godina;

    private Boolean budzet;

    private String smijer;

    private String brojZdravstveneKnjizice;

    private Boolean osiguranjeZadruga;

    private String brojMobilogTelefona;

//   public List< KorisnikDokument1> getKorisnikDokumentsById() {
//		return korisnikDokumentsById;
//	}
//
//	public void setKorisnikDokumentsById(List< KorisnikDokument1> korisnikDokumentsById) {
//		this.korisnikDokumentsById = korisnikDokumentsById;
//	}

	//private List< KorisnikDokument1> korisnikDokumentsById;

}
