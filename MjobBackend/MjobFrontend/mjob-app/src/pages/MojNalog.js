import React, { useState, useEffect } from "react";
import korisnikService from "../services/korisnik.service";
import { Image, Tooltip } from "antd";
import { CardDiv2, StyledCard } from "../components/BasicStyledComponents";

const MojNalog = () => {
  const [ime, setIme] = useState();
  const [prezime, setPrezime] = useState();
  const [imeRoditelja, setImeRoditelja] = useState();
  const [datumRodjenja, setDatumRodjenja] = useState();
  const [jmbg, setJMBG] = useState();
  const [brojLicneKarte, setBrojLicneKarte] = useState();
  const [izdavaocLicneKarte, setIzdavaocLicneKarte] = useState();
  const [pol, setPol] = useState();
  const [brojTelefona, setBrojTelefona] = useState();
  const [brojTekucegRacuna, setBrojTekucegRacuna] = useState();
  const [obrazovnaUstanova, setObrazovnaUstanova] = useState();
  const [identifikator, setIdentifikator] = useState();
  const [email, setEmail] = useState();
  const [datumUclanjenja, setDatumUclanjenja] = useState();
  const [brojClanskeKarte, setBrojClanskeKarte] = useState();
  const [brojZdravstveneKnjizice, setBrojZdravstveneKnjizice] = useState();
  const [mjestoRodjenja, setMjestoRodjenja] = useState();
  const [naseljenoMjesto, setNaseljenoMjesto] = useState();
  const [ulica, setUlica] = useState();
  const [smijer, setSmijer] = useState();
  const [godina, setGodina] = useState();
  const [slike] = useState([]);

  const setRightSide = (user) => {
    while (slike.length > 0) slike.pop();
    for (let i = 0; i < user.korisnikDokumentsById.length; i++) {
      slike.push({
        sadrzaj:
          user.korisnikDokumentsById[i].dokumentId.dokumentSadrzajsById[0]
            .sadrzaj,
        naziv: user.korisnikDokumentsById[i].dokumentId.dokumentTipNaziv,
      });
    }
    setIme(user.ime);
    setPrezime(user.prezime);
    setImeRoditelja(user.imeRoditelja);
    setGodina(user.godina);
    let date = new Date(user.datumRodjenja);
    const month = date.getMonth() + 1;
    setDatumRodjenja(
      date.getDate() + "." + month + "." + date.getFullYear() + "."
    );
    setJMBG(user.jmbg);
    setBrojLicneKarte(user.brojLicneKarte);
    setBrojTelefona(user.brojTelefona);
    setBrojTekucegRacuna(user.brojTekucegRacuna);
    setObrazovnaUstanova(user.obrazovnaUstanova);
    setIdentifikator(user.identifikator);
    setEmail(user.email);
    if (user.datumUclanjenja != null) {
      date = new Date(user.datumUclanjenja);
      const month = date.getMonth() + 1;
      setDatumUclanjenja(
        date.getDate() + "." + month + "." + date.getFullYear() + "."
      );
    }
    setBrojClanskeKarte(user.brojClanskeKarte);
    setBrojZdravstveneKnjizice(user.brojZdravstveneKnjizice);
    setPol(user.korisnikPolNaziv);
    setIzdavaocLicneKarte(user.izdavaocLicneKarteOpstinaNaziv);
    setMjestoRodjenja(user.mjestoRodjenjaOpstinaNaziv);
    setNaseljenoMjesto(user.naseljenoMjestoNaziv);
    setSmijer(user.smijer);
    setUlica(user.ulicaIBroj);
  };
  const containerStyle = {
    border: "1px solid gray",
    borderRadius: "5px",
    width: "700px",
    align: "center",
    textAlign: "center",
  };
  useEffect(() => {
    korisnikService.getUser().then((res) => {
      setRightSide(res);
    });
  });
  return (
    <CardDiv2>
      <StyledCard style={containerStyle}>
        <h1>
          {ime} ({imeRoditelja}) {prezime}
        </h1>
        <p>
          Datum rodjenja : {datumRodjenja} Pol : {pol}
        </p>
        <p>JMBG: {jmbg}</p>
        <p>
          Mjesto rodjenja: {mjestoRodjenja}, {naseljenoMjesto}
        </p>
        <p>Ulica i broj : {ulica}</p>
        {brojLicneKarte != null && (
          <p>
            Broj licne karte : {brojLicneKarte} Izdavaoc : {izdavaocLicneKarte}
          </p>
        )}
        <p>Email : {email}</p>
        <p>Broj telefona : {brojTelefona}</p>
        <p>
          Obrazovna ustanova : {obrazovnaUstanova} Smijer : {smijer} Godina:{" "}
          {godina}
        </p>
        <p>Broj indeksa, radne ili djacke knjizice : {identifikator}</p>
        {datumUclanjenja != null && (
          <p>
            Datum uclanjenja : {datumUclanjenja} Broj clanske karte :{" "}
            {brojClanskeKarte}
          </p>
        )}
        <p>Broj zdravstvene knjizice : {brojZdravstveneKnjizice}</p>
        <p>Broj tekuceg racuna : {brojTekucegRacuna}</p>

        <Image.PreviewGroup>
          {slike.map((slika) => (
            // eslint-disable-next-line react/jsx-key
            <Tooltip title={slika.naziv}>
              <Image width={100} src={slika.sadrzaj} />
            </Tooltip>
          ))}
        </Image.PreviewGroup>
      </StyledCard>
    </CardDiv2>
  );
};
export default MojNalog;
