import React, { useState } from "react";
import "./index.css";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import korisnikService from "../../../services/korisnik.service";
import Jobs from "./Jobs";
import {
  Button,
  List,
  Image,
  Tooltip,
  Modal,
  InputNumber,
  Form,
  Input,
  Space,
} from "antd";
import {
  UserAddOutlined,
  UserDeleteOutlined,
  QuestionCircleOutlined,
  CheckCircleOutlined,
  MinusCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
const { Search } = Input;

const UpravljanjeNalozima = () => {
  const [list, setList] = useState([]);
  const [listTip, setListTip] = useState([]);
  const [id, setId] = useState([]);
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
  const [tipKorisnika, setTipKorisnika] = useState();
  const [mjestoRodjenja, setMjestoRodjenja] = useState();
  const [naseljenoMjesto, setNaseljenoMjesto] = useState();
  const [ulica, setUlica] = useState();
  const [smijer, setSmijer] = useState();
  const [godina, setGodina] = useState();
  const [slike] = useState([]);
  const [status, setStatus] = useState([]);
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
    setId(user.id);
    setIme(user.ime);
    setPrezime(user.prezime);
    setImeRoditelja(user.imeRoditelja);
    setStatus(user.korisnikStatusNaziv);
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
    setTipKorisnika(user.korisnikTipNaziv);
    setMjestoRodjenja(user.mjestoRodjenjaOpstinaNaziv);
    setNaseljenoMjesto(user.naseljenoMjestoNaziv);
    setSmijer(user.smijer);
    setUlica(user.ulicaIBroj);
  };
  const onSearch = (value) => {
    if (listTip === "neobradjen") {
      korisnikService.getAll().then((res) => {
        setList(
          res.filter((el) => {
            const imePrezime = el.ime + " " + el.prezime;
            return (
              el.korisnikStatusNaziv === "neobradjen" &&
              imePrezime.startsWith(value)
            );
          })
        );
      });
    } else if (listTip === "obrisan") {
      korisnikService.getAll().then((res) => {
        setList(
          res.filter((el) => {
            const imePrezime = el.ime + " " + el.prezime;
            return (
              el.korisnikStatusNaziv === "obrisan" &&
              imePrezime.startsWith(value)
            );
          })
        );
      });
    } else if (listTip === "aktivan") {
      korisnikService.getAll().then((res) => {
        setList(
          res.filter((el) => {
            const imePrezime = el.ime + " " + el.prezime;
            return (
              el.korisnikStatusNaziv === "aktivan" &&
              imePrezime.startsWith(value)
            );
          })
        );
      });
    }
  };

  const odobriZahtjev = (values) => {
    korisnikService.acceptRegistration(id, values.brojClanskeKarte);
    setIsModalOpen(false);
    window.location.reload(false);
  };
  const odbijZahtjev = () => {
    korisnikService.refuseRegistration(id);
    window.location.reload(false);
  };
  const obrisiNalog = () => {
    korisnikService.removeUser(id);
    window.location.reload(false);
  };
  const aktivirajNalog = () => {
    korisnikService.reactivateUser(id);
    window.location.reload(false);
  };
  const [isModalJobsOpen, setIsModalJobsOpen] = useState(false);

  const prikazPoslova = () => {
    setIsModalJobsOpen(true);
  };
  const closeJobsModal = () => {
    setIsModalJobsOpen(false);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const prikazKorisnika = () => {
    korisnikService.getAll().then((res) => {
      setList(res.filter((el) => el.korisnikStatusNaziv === "aktivan"));
      setListTip("aktivan");
    });
  };
  const prikazObrisanihKorisnika = () => {
    korisnikService.getAll().then((res) => {
      setList(res.filter((el) => el.korisnikStatusNaziv === "obrisan"));
      setListTip("obrisan");
    });
  };
  const prikazZahtjeva = () => {
    korisnikService.getAll().then((res) => {
      setList(res.filter((el) => el.korisnikStatusNaziv === "neobradjen"));
      setListTip("neobradjen");
    });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="upravljanjeNalozimaAdmin">
      <div className="left-side">
        <Tooltip title="Prikaz zahtjeva">
          <Button
            shape="circle"
            size={"large"}
            icon={<QuestionCircleOutlined />}
            onClick={() => prikazZahtjeva()}
          />
        </Tooltip>
        <Tooltip title="Prikaz registrovanih korisnika">
          <Button
            shape="circle"
            size={"large"}
            icon={<CheckCircleOutlined />}
            onClick={() => prikazKorisnika()}
          />
        </Tooltip>
        <Tooltip title="Prikaz obrisanih korisnika">
          <Button
            shape="circle"
            size={"large"}
            icon={<MinusCircleOutlined />}
            onClick={() => prikazObrisanihKorisnika()}
          />
        </Tooltip>
        <div className={"inputSearcUser"}>
          <Space direction="vertical">
            <Search
              onSearch={onSearch}
              style={{
                width: 200,
              }}
            />
          </Space>
        </div>
        <Box
          sx={{
            width: "100%",
            height: 400,
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
        >
          <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={list}
            renderItem={(item) => (
              <ListItem>
                <List.Item.Meta
                  title={
                    <Button type={"text"} onClick={() => setRightSide(item)}>
                      {item.ime + " " + item.prezime}
                    </Button>
                  }
                />
              </ListItem>
            )}
          ></List>
        </Box>
      </div>
      <div className="right-side">
        {imeRoditelja != null && (
          <div>
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
                Broj licne karte : {brojLicneKarte} Izdavaoc :{" "}
                {izdavaocLicneKarte}
              </p>
            )}
            <p>Email : {email}</p>
            <p>Broj telefona : {brojTelefona}</p>
            <p>
              Tip korisnika : {tipKorisnika} Obrazovna ustanova :{" "}
              {obrazovnaUstanova} Smijer : {smijer} Godina: {godina}
            </p>
            <p>Identifikator : {identifikator}</p>
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
                  <Image width={200} src={slika.sadrzaj} />
                </Tooltip>
              ))}
            </Image.PreviewGroup>
            <div className={"AcceptUserDiv"}>
              {status === "neobradjen" && (
                <div>
                  <Tooltip title="Odobri zahtjev za registraciju">
                    <Button
                      shape="circle"
                      size={"large"}
                      icon={<UserAddOutlined />}
                      onClick={() => showModal()}
                    />
                  </Tooltip>
                  <Modal
                    title="Broj clanske karte:"
                    open={isModalOpen}
                    footer={[]}
                    onCancel={handleCancel}
                  >
                    <Form onFinish={odobriZahtjev}>
                      <Form.Item name={"brojClanskeKarte"}>
                        <InputNumber />
                      </Form.Item>
                      <Button type="primary" htmlType="submit">
                        OK
                      </Button>
                    </Form>
                  </Modal>
                  <Tooltip title="Odbij zahtjev za registraciju">
                    <Button
                      shape="circle"
                      size={"large"}
                      icon={<UserDeleteOutlined />}
                      onClick={() => odbijZahtjev()}
                    />
                  </Tooltip>
                </div>
              )}
              {status === "aktivan" && (
                <div>
                  <Tooltip title="Obrisi nalog">
                    <Button
                      shape="circle"
                      size={"large"}
                      icon={<UserDeleteOutlined />}
                      onClick={() => obrisiNalog()}
                    />
                  </Tooltip>
                  <Tooltip title="Prikaz korisnikovih poslova">
                    <Button
                      shape="circle"
                      size={"large"}
                      icon={<InfoCircleOutlined />}
                      onClick={() => prikazPoslova()}
                    />
                  </Tooltip>
                  <Jobs
                    title="Korisnikovi poslovi:"
                    visible={isModalJobsOpen}
                    userId={id}
                    onCancel={closeJobsModal}
                  />
                </div>
              )}
              {status === "obrisan" && (
                <div>
                  <Tooltip title="Ponovo aktiviraj nalog">
                    <Button
                      shape="circle"
                      size={"large"}
                      icon={<UserAddOutlined />}
                      onClick={() => aktivirajNalog()}
                    />
                  </Tooltip>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default UpravljanjeNalozima;
