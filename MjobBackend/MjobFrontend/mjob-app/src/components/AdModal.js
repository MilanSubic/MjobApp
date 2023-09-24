import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, message, Modal } from "antd";
import AdForm from "./AdForm";
import { Link } from "react-router-dom";
import UsersListModal from "./UsersListModal";
import oglasiService from "../services/OglasiService";
import korisnikService from "../services/korisnik.service";
import axios from "axios";
const AdModal = (props) => {
  const { visible, onCancel, post, confirmLoading, editMode, id } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [userType, setUserType] = useState();
  const [editModeTemp, setEditMode] = useState(false);

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
    } catch (error) {
      message.error("Doslo je do greske prilikom prijave");
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
          <UsersListModal
            visible={modalOpen}
            jobId={post.id}
            onCancel={closeModal}
          />
        </div>
      )}
      {userType === "korisnik" && (
        <div style={{ textAlign: "center" }}>
          <Button onClick={prijaviButtonClick}>PRIJAVI SE</Button>
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
