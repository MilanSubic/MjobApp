import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, InputNumber, message, Modal, Input } from "antd";
import AdForm from "./AdForm";
import { Link } from "react-router-dom";
import UsersListModal from "./UsersListModal";
import oglasiService from "../services/OglasiService";
import oglasService from "../services/OglasService";
import korisnikService from "../services/korisnik.service";
import {
  CartesianGrid,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import axios from "axios";
import { getCurrentUser } from "../services/auth.service";
import { Role } from "../enums/role.enum";
const AdModal = (props) => {
  const { visible, onCancel, post, confirmLoading, editMode, id } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [userType, setUserType] = useState();
  const [editModeTemp, setEditMode] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [stat, setStat] = useState([]);
  const [dani, setDani] = useState(5);
  const [currentUser] = useState(getCurrentUser());
  const [brojOsoba, setBrojOsoba] = useState();
  const [prihvaceneOsobe, setPrihvaceneOsobe] = useState();
  const brOsoba = () => {
    oglasService.numOsoba(id).then((result) => {
      setBrojOsoba(result.data);
    });
  };
  const brPrOsoba = () => {
    oglasService.numPrOsoba(id).then((result) => {
      setPrihvaceneOsobe(result.data);
    });
  };
  useEffect(() => {
    brOsoba();
    brPrOsoba();
    console.log(brojOsoba + prihvaceneOsobe);
  }, [visible]);
  useEffect(() => {
    setUserType(sessionStorage.getItem("tipKorisnika"));
    setEditMode(editMode);
    brOsoba();
    brPrOsoba();
    console.log(brojOsoba + prihvaceneOsobe);
  }, []);

  const obrisiOglas = () => {
    oglasiService.remove(post.id);
    window.location.reload(false);
  };
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  function prijaviButtonClick() {
    if (isButtonDisabled) message.info("Prijava je već podnijeta!");
    else {
      try {
        korisnikService.getUser().then((user) => {
          axios.post(
            "http://localhost:8080/api/oglas/" +
              user.id +
              "/" +
              post.id +
              "/prijava"
          );
        });
        message.success("Uspješna prijava");
        setIsButtonDisabled(true);
      } catch (error) {
        message.error("Došlo je do greške prilikom prijave");
      }
    }
  }
  useEffect(() => {
    if (
      visible &&
      currentUser &&
      currentUser.authorities.find((a) => Role.Admin === a.authority) &&
      dani
    ) {
      oglasiService.getViewStatistika(post.id, dani).then((res) => {
        const data =
          res.data.length === 1
            ? [{ dan: "", broj_pregleda: 0 }, ...res.data]
            : res.data;

        setStat(data.map((r) => ({ Datum: r.dan, Pregledi: r.broj_pregleda })));
      });
    }
  }, [visible, dani]);

  return (
    <Modal
      width={1300}
      onOk={() => onCancel()}
      destroyOnClose
      onCancel={() => onCancel()}
      open={visible}
      confirmLoading={confirmLoading}
      footer={[]}
      style={{ top: "25px" }}
    >
      <AdForm id={id} initialData={post} editMode={editModeTemp} />
      {userType === "admin" && editModeTemp === false && (
        <>
          {stat &&
            currentUser &&
            currentUser.authorities.find((a) => Role.Admin === a.authority) && (
              <div>
                <div className="brOsoba">
                  <Input
                    addonBefore="Broj prijavljenih osoba"
                    value={brojOsoba}
                  />
                  <Input
                    addonBefore="Broj prihvaćenih osoba"
                    value={prihvaceneOsobe}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <InputNumber
                    addonBefore="Broj dana za prikaz"
                    min={1}
                    max={100}
                    value={dani}
                    onChange={setDani}
                  />
                  <AreaChart
                    width={730}
                    height={250}
                    data={stat}
                    margin={{ top: 10, right: 30, left: 30, bottom: 20 }}
                  >
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#82ca9d"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#82ca9d"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="Datum"
                      label={{
                        value: "Datum",
                        angle: 0,
                        offset: -5,
                        position: "insideBottom",
                      }}
                    />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="Pregledi"
                      stroke="#8884d8"
                      fillOpacity={1}
                      fill="url(#colorUv)"
                    />
                  </AreaChart>
                </div>
              </div>
            )}
          <div style={{ textAlign: "center" }}>
            <Button
              onClick={() => {
                setEditMode(true);
              }}
            >
              IZMIJENI
            </Button>
            <Button onClick={() => obrisiOglas()}>
              <Link to="/home">OBRIŠI</Link>
            </Button>
            <Button onClick={() => openModal()}>PRIJAVLJENI KORISNICI</Button>
            <Button
              style={{ float: "right", marginLeft: "5px" }}
              onClick={() => window.location.reload()}
            >
              IZAĐI
            </Button>
            <UsersListModal
              visible={modalOpen}
              jobId={post.id}
              onCancel={closeModal}
            />
          </div>
        </>
      )}
      {userType === "korisnik" && (
        <div style={{ textAlign: "right" }}>
          <Button
            style={{
              marginRight: "5px",
              backgroundColor: "blue",
              color: "white",
            }}
            onClick={prijaviButtonClick}
          >
            PRIJAVI SE
          </Button>
          <Button onClick={() => onCancel()}>IZAĐI</Button>
        </div>
      )}
      {userType !== "korisnik" && userType !== "admin" && (
        <div style={{ textAlign: "right" }}>
          <Button onClick={() => onCancel()}>IZAĐI</Button>
        </div>
      )}
    </Modal>
  );
};

AdModal.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  confirmLoading: PropTypes.bool,
  post: PropTypes.object,
  editMode: PropTypes.bool,
  id: PropTypes.number,
};

export default AdModal;
