import React, { useState, useEffect } from "react";
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
  message,
} from "antd";
import {
  UserAddOutlined,
  UserDeleteOutlined,
  QuestionCircleOutlined,
  CheckCircleOutlined,
  MinusCircleOutlined,
  InfoCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import UsersModal from "../../../components/UsersModal";
import UsersService from "../../../services/UsersService";
import OpstinaService from "../../../services/OpstinaService";
import NaseljenoMjestoService from "../../../services/NaseljenoMjestoService";
import ObrazovnaUstanovaTipService from "../../../services/ObrazovnaUstanovaTipService";

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
  const [brojTelefona, setBrojTelefona] = useState();
  const [brojTekucegRacuna, setBrojTekucegRacuna] = useState();
  const [obrazovnaUstanova, setObrazovnaUstanova] = useState();
  const [identifikator, setIdentifikator] = useState();
  const [email, setEmail] = useState();
  const [datumUclanjenja, setDatumUclanjenja] = useState();
  const [brojClanskeKarte, setBrojClanskeKarte] = useState();
  const [mjestoRodjenja, setMjestoRodjenja] = useState();
  const [naseljenoMjesto, setNaseljenoMjesto] = useState();
  const [ulica, setUlica] = useState();
  const [nazivObrazovneUstanove, setNazivObrazovneUstanove] = useState();
  const [godina, setGodina] = useState();
  const [slike] = useState([]);
  const [status, setStatus] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isModalJobsOpen, setIsModalJobsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [usersOpstina, setUsersOpstina] = useState([]);
  const [usersMjesto, setUsersMjesto] = useState([]);
  const [usersUstanova, setUsersUstanova] = useState([]);

  useEffect(() => {
    OpstinaService.getAll().then((res) => setUsersOpstina(res.data));
    NaseljenoMjestoService.getAll().then((res) => setUsersMjesto(res.data));
    ObrazovnaUstanovaTipService.getAll().then((res) =>
      setUsersUstanova(res.data)
    );
    prikazKorisnika();
  }, []);
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
    setObrazovnaUstanova(user.obrazovnaUstanovaTipNaziv);
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
    setIzdavaocLicneKarte(user.izdavaocLicneKarteOpstinaNaziv);
    setMjestoRodjenja(user.mjestoRodjenjaOpstinaNaziv);
    setNaseljenoMjesto(user.naseljenoMjestoNaziv);
    setNazivObrazovneUstanove(user.obrazovnaUstanova);
    setUlica(user.ulicaIBroj);

    UsersService.findById(user.id).then((res) => setSelectedUser(res.data));
  };
  const onSearch = (value) => {
    if (listTip === "neobradjen") {
      korisnikService.getAll().then((res) => {
        sortList(
          res.filter((el) => {
            const imePrezime =
              el.ime + " " + el.prezime + " [" + el.brojClanskeKarte + "]";
            const broj = "" + el.brojClanskeKarte;
            return (
              el.korisnikStatusNaziv === "neobradjen" &&
              (imePrezime.startsWith(value) ||
                broj.startsWith(el.brojClanskeKarte))
            );
          })
        );
      });
    } else if (listTip === "obrisan") {
      korisnikService.getAll().then((res) => {
        sortList(
          res.filter((el) => {
            const imePrezime =
              el.ime + " " + el.prezime + " [" + el.brojClanskeKarte + "]";
            const broj = "" + el.brojClanskeKarte;
            return (
              el.korisnikStatusNaziv === "obrisan" &&
              (imePrezime.startsWith(value) || broj.startsWith(value))
            );
          })
        );
      });
    } else if (listTip === "aktivan") {
      korisnikService.getAll().then((res) => {
        sortList(
          res.filter((el) => {
            const imePrezime =
              el.ime + " " + el.prezime + " [" + el.brojClanskeKarte + "]";
            const broj = "" + el.brojClanskeKarte;
            return (
              el.korisnikStatusNaziv === "aktivan" &&
              (imePrezime.startsWith(value) || broj.startsWith(value))
            );
          })
        );
      });
    }
  };

  const odobriZahtjev = (values) => {
    korisnikService.acceptRegistration(id, values.brojClanskeKarte).then(() => {
      setIsModalOpen(false);
      message.success("Zahtjev odobren!");
      prikazZahtjeva();
    });
  };
  const odbijZahtjev = () => {
    korisnikService.refuseRegistration(id).then(() => {
      message.success("Zahtjev odbijen!");
      prikazZahtjeva();
    });
  };
  const obrisiNalog = () => {
    korisnikService.removeUser(id).then(() => {
      message.success("Nalog obrisan!");
      prikazKorisnika();
    });
  };
  const aktivirajNalog = () => {
    korisnikService.reactivateUser(id).then(() => {
      message.success("Nalog je ponovo aktivan!");
      prikazObrisanihKorisnika();
    });
  };

  const prikazPoslova = () => {
    setIsModalJobsOpen(true);
  };

  const closeJobsModal = () => {
    setIsModalJobsOpen(false);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const sortList = (res) => {
    setList(
      res.sort((a, b) => {
        if (a.ime === b.ime) return a.prezime.localeCompare(b.prezime);
        else return a.ime.localeCompare(b.ime);
      })
    );
  };
  const prikazKorisnika = () => {
    korisnikService.getAll().then((res) => {
      res = res.filter((el) => el.korisnikStatusNaziv === "aktivan");
      sortList(res);
      setListTip("aktivan");
      if (res.length > 0) setRightSide(res[0]);
    });
  };
  const prikazObrisanihKorisnika = () => {
    korisnikService.getAll().then((res) => {
      res = res.filter((el) => el.korisnikStatusNaziv === "obrisan");
      sortList(res);
      setListTip("obrisan");
      if (res.length > 0) setRightSide(res[0]);
    });
  };
  const prikazZahtjeva = () => {
    korisnikService.getAll().then((res) => {
      sortList(res.filter((el) => el.korisnikStatusNaziv === "neobradjen"));
      setListTip("neobradjen");
      if (res.length > 0) setRightSide(res[0]);
    });
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };
  const closeModal = () => {
    setIsEditModalOpen(false);
  };

  const saveData = (user) => {
    UsersService.update(user)
      .then((res) => {
        message.success("Uspjesna izmjena");
        closeModal();
        // setList(list.map((e1) => (e1.id === res.id ? { ...e1, ...res } : e1)));
        setList(
          list.map((e1) => {
            if (e1.id === res.id) {
              e1.ime = res.ime;
              e1.prezime = res.prezime;
              e1.imeRoditelja = res.imeRoditelja;
              e1.godina = res.godina;
              e1.datumRodjenja = res.datumRodjenja;
              e1.jmbg = res.jmbg;
              e1.brojLicneKarte = res.brojLicneKarte;
              e1.brojTelefona = res.brojTelefona;
              e1.brojTekucegRacuna = res.brojTekucegRacuna;
              e1.identifikator = res.identifikator;
              e1.email = res.email;
              e1.obrazovnaUstanova = res.obrazovnaUstanova;
              e1.brojClanskeKarte = res.brojClanskeKarte;
              e1.brojZdravstveneKnjizice = res.brojZdravstveneKnjizice;
              e1.nazivObrazovneUstanove = res.nazivObrazovneUstanove;
              e1.ulicaIBroj = res.ulicaIBroj;

              e1.mjestoRodjenjaOpstinaNaziv = usersOpstina.find(
                (e2) => res.mjestoRodjenjaOpstinaId === e2.id
              ).naziv;
              setMjestoRodjenja(e1.mjestoRodjenjaOpstinaNaziv);
              e1.izdavaocLicneKarteOpstinaNaziv = usersOpstina.find(
                (e2) => res.izdavaocLicneKarteOpstinaId === e2.id
              ).naziv;
              setIzdavaocLicneKarte(e1.izdavaocLicneKarteOpstinaNaziv);
              e1.naseljenoMjestoNaziv = usersMjesto.find(
                (e2) => res.naseljenoMjestoId === e2.id
              ).naziv;
              setNaseljenoMjesto(e1.naseljenoMjestoNaziv);
              e1.obrazovnaUstanovaTipId = usersUstanova.find(
                (e2) => res.obrazovnaUstanovaTipId === e2.id
              ).id;
              //              setObrazovnaUstanova(e1.obrazovnaUstanova);
            }
            return e1;
          })
        );
      })
      .catch((err) => {
        console.error(err);
        message.error("Doslo je do greske prilikom izmjene");
      });
    setIme(user.ime);
    setPrezime(user.prezime);
    setImeRoditelja(user.imeRoditelja);
    setGodina(user.godina);
    const date = new Date(user.datumRodjenja);
    const month = date.getMonth() + 1;
    setDatumRodjenja(
      date.getDate() + "." + month + "." + date.getFullYear() + "."
    );
    setJMBG(user.jmbg);
    setBrojLicneKarte(user.brojLicneKarte);
    setBrojTelefona(user.brojTelefona);
    setBrojTekucegRacuna(user.brojTekucegRacuna);
    setIdentifikator(user.identifikator);
    setEmail(user.email);
    setObrazovnaUstanova(user.obrazovnaUstanova);
    setBrojClanskeKarte(user.brojClanskeKarte);
    setNazivObrazovneUstanove(user.nazivObrazovneUstanove);
    setUlica(user.ulicaIBroj);
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
                      {item.brojClanskeKarte !== null &&
                        item.ime +
                          " " +
                          item.prezime +
                          " [" +
                          item.brojClanskeKarte +
                          "]"}
                      {item.brojClanskeKarte === null &&
                        item.ime + " " + item.prezime}
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
            <p>Datum rodjenja : {datumRodjenja}</p>
            <p>
              Mjesto rodjenja: {mjestoRodjenja}, {naseljenoMjesto}
            </p>
            <p>Adresa stanovanja : {ulica}</p>
            {brojLicneKarte != null && (
              <p>
                Broj licne karte : {brojLicneKarte} Izdavaoc :{" "}
                {izdavaocLicneKarte}
              </p>
            )}
            <p>JMBG: {jmbg}</p>
            <p>Email : {email}</p>
            <p>Broj telefona : {brojTelefona}</p>
            {datumUclanjenja != null && (
              <p>
                Datum uclanjenja : {datumUclanjenja} Broj clanske karte :{" "}
                {brojClanskeKarte}
              </p>
            )}
            <p>Naziv obrazovne ustanove : {nazivObrazovneUstanove}</p>
            <p>
              Obrazovna ustanova : {obrazovnaUstanova} Godina: {godina}
            </p>
            <p>Broj indeksa, radne ili djacke knjizice : {identifikator}</p>

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
                  <Tooltip title="Izmjeni nalog">
                    <Button
                      shape="circle"
                      size="large"
                      icon={<EditOutlined />}
                      onClick={() => openEditModal()}
                    />
                  </Tooltip>
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
      <UsersModal
        editMode={isEditModalOpen}
        visible={isEditModalOpen}
        onCancel={closeModal}
        onOk={saveData}
        user={selectedUser}
      ></UsersModal>
    </div>
  );
};
export default UpravljanjeNalozima;
