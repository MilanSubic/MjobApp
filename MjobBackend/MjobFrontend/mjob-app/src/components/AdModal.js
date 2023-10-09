import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, message, Modal } from "antd";
import AdForm from "./AdForm";
import { Link } from "react-router-dom";
import UsersListModal from "./UsersListModal";
import oglasiService from "../services/OglasiService";
// import oglasService from "../services/OglasService";
import korisnikService from "../services/korisnik.service";
import axios from "axios";
const AdModal = (props) => {
  const { visible, onCancel, post, confirmLoading, editMode, id } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [userType, setUserType] = useState();
  const [editModeTemp, setEditMode] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    setUserType(localStorage.getItem("tipKorisnika"));
    setEditMode(editMode);
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
        message.success("Uspjesna prijava");
        setIsButtonDisabled(true);
      } catch (error) {
        message.error("Doslo je do greske prilikom prijave");
      }
    }
  }
  return (
    <Modal
      width={1300}
      onOk={() => onCancel()}
      destroyOnClose
      onCancel={() => onCancel()}
      visible={visible}
      confirmLoading={confirmLoading}
      footer={[]}
      style={{ top: "25px" }}
    >
      <AdForm id={id} initialData={post} editMode={editModeTemp} />
      {userType === "admin" && editModeTemp === false && (
        <div style={{ textAlign: "center" }}>
          <Button
            onClick={() => {
              setEditMode(true);
            }}
          >
            IZMIJENI
          </Button>
          <Button onClick={() => obrisiOglas()}>
            <Link to="/home">OBRISI</Link>
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
