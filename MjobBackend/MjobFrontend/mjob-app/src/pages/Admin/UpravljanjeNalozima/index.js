import React, {useState, useEffect} from "react";
import "./index.css";
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import korisnikService from "../../../services/korisnik.service";

import { Button, List } from 'antd';
import EmptyHeader from "../../../components/EmptyHeader";

const UpravljanjeNalozima=()=>
{
    const [list, setList] = useState([]);
    const [ime, setIme] = useState();
    const [korisnickoIme, setKorisnickoIme] = useState();
    const [prezime, setPrezime]=useState();
    const [imeRoditelja,setImeRoditelja]=useState();
    const [datumRodjenja, setDatumRodjenja]=useState();
    const [jmbg,setJMBG]=useState();
    const [brojLicneKarte,setBrojLicneKarte]=useState();
    const [izdavaocLicneKarte, setIzdavaocLicneKarte]=useState();
    const [pol,setPol]=useState();
    const [brojTelefona,setBrojTelefona]=useState();
    const [brojTekucegRacuna,setBrojTekucegRacuna]=useState();
    const [obrazovnaUstanova,setObrazovnaUstanova]=useState();
    const [identifikator,setIdentifikator]=useState();
    const [email,setEmail]=useState();
    const [datumUclanjenja,setDatumUclanjenja]=useState();
    const [brojClanskeKarte,setBrojClanskeKarte]=useState();
    const [brojZdravstveneKnjizice,setBrojZdravstveneKnjizice]=useState();
    const [tipKorisnika, setTipKorisnika]=useState();
    const [mjestoRodjenja, setMjestoRodjenja]=useState();
    const [naseljenoMjesto, setNaseljenoMjesto]=useState();
    const [ulica, setUlica]=useState();
    const [smijer, setSmijer]=useState();

    useEffect(() => {
        korisnikService.getAll().then((res) => {
            setList(res);
        })
    }, []);
    const setRightSide = (user) =>
    {
        setIme(user.ime);
        setPrezime((user.prezime))
        setImeRoditelja(user.imeRoditelja);
        var date = new Date(user.datumRodjenja);
        setDatumRodjenja(date.getDay()+"."+date.getMonth()+"."+date.getFullYear()+".");
        setJMBG(user.jmbg);
        setBrojLicneKarte(user.brojLicneKarte);
        setBrojTelefona(user.brojTelefona);
        setBrojTekucegRacuna(user.brojTekucegRacuna);
        setObrazovnaUstanova(user.obrazovnaUstanova);
        setIdentifikator(user.identifikator);
        setKorisnickoIme(user.korisnickoIme);
        setEmail(user.email);
        date = new Date(user.datumUclanjenja);
        setDatumUclanjenja(date.getDay()+"."+date.getMonth()+"."+date.getFullYear()+".");
        setBrojClanskeKarte(user.brojClanskeKarte);
        setBrojZdravstveneKnjizice(user.brojZdravstveneKnjizice);
        setPol(user.korisnikPolNaziv);
        setIzdavaocLicneKarte(user.izdavaocLicneKarteOpstinaNaziv);
        setTipKorisnika(user.korisnikTipNaziv);
        setMjestoRodjenja(user.mjestoRodjenjaOpstinaNaziv);
        setNaseljenoMjesto(user.naseljenoMjestoNaziv);
        setSmijer(user.smijer);
        setUlica(user.ulicaIBroj);
    }
    return(
        <div><EmptyHeader />

    <div className="upravljanjeNalozimaAdmin">
            <div className="left-side">
                <Box
                    sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
                >
                    <List
                        className="demo-loadmore-list"
                        itemLayout="horizontal"
                        dataSource={list}
                        renderItem={(item) => (
                        <ListItem >
                                <List.Item.Meta
                                    title={<Button type={"text"} onClick={()=>setRightSide(item)}>{item.ime+" "+item.prezime}</Button>}
                                />
                        </ListItem>)}
                            >
                    </List>
                </Box>
            </div>
            <div className="right-side">
                {
                    imeRoditelja!=null &&
                    <div><h1 >{ime} ({imeRoditelja}) {prezime}</h1>
                        <p>Datum rodjenja : {datumRodjenja} Pol : {pol}</p>
                    <p>JMBG: {jmbg}</p>
                        <p>Mjesto rodjenja: {mjestoRodjenja}, {naseljenoMjesto}</p>
                        <p>Ulica i broj : {ulica}</p>
                        {brojLicneKarte!=null &&
                    <p>Broj licne karte : {brojLicneKarte} Izdavaoc : {izdavaocLicneKarte}</p>}
                        <p>Korisnicko ime : {korisnickoIme}</p>
                        <p>Email : {email}</p>
                        <p>Broj telefona : {brojTelefona}</p>
                        <p>Tip korisnika : {tipKorisnika}  Obrazovna ustanova : {obrazovnaUstanova}  Smijer : {smijer}</p>
                        <p>Identifikator : {identifikator}</p>
                        { datumUclanjenja!=null &&
                        <p>Datum uclanjenja : {datumUclanjenja} Broj clanske karte : {brojClanskeKarte}</p>}
                        <p>Broj zdravstvene knjizice : {brojZdravstveneKnjizice}</p>
                        <p>Broj tekuceg racuna : {brojTekucegRacuna}</p>

                    </div>
                }
            </div>
        </div></div>
    );
};
export default UpravljanjeNalozima;