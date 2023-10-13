import { Card } from "antd";
import { React, useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import oglasService from "../services/OglasService";
import AdModal from "./AdModal";
import moment from "moment";
import { getCurrentUser } from "../services/auth.service";
import { Role } from "../enums/role.enum";

const CustomCard = (props) => {
  const [userType, setUserType] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [brojOsoba, setBrojOsoba] = useState();
  const [prihvaceneOsobe, setPrihvaceneOsobe] = useState();

  useEffect(() => {
    setUserType(sessionStorage.getItem("tipKorisnika"));
  }, []);
  const [post] = useState(props.post);
  const [currentUser] = useState(getCurrentUser());
  const openModal = () => {
    if (
      currentUser &&
      !currentUser.authorities.find((a) => Role.Admin === a.authority)
    )
      oglasService.viewAuth(post.id).then(() => {});
    else if (!currentUser) oglasService.view(post.id).then(() => {});

    setIsModalOpen(true);
  };

  const closeModal = (v) => {
    setTimeout(() => {
      setIsModalOpen(false);
      console.log(v);
    });
  };

  useEffect(() => {
    brOsoba();
  }, []);

  const brOsoba = () => {
    oglasService.numOsoba(props.id).then((result) => {
      setBrojOsoba(result.data);
    });
  };
  const brPrOsoba = () => {
    oglasService.numPrOsoba(props.id).then((result) => {
      setPrihvaceneOsobe(result.data);
    });
  };
  useEffect(() => {
    brOsoba();
    brPrOsoba();
  }, []);
  return (
    <Card
      className="card-element"
      onClick={() => openModal()}
      title={props.posaoNaziv}
    >
      <b>Mjesto: </b> {props.mjesto}
      <br />
      <b>Datum: </b>{" "}
      {moment(props.datum?.substring(0, 10)).format("DD.MM.YYYY.")}
      <br />
      <b>Broj potrebnih radnika: </b> {props.brojLjudi}
      <br />
      <b>Satnica: </b> {props.satnica} KM
      <br></br>
      <br />
      {userType === "admin" && (
        <div>
          <b>Broj prijavljenih: </b> {brojOsoba}
          <br />
          <b>Broj prihvacenih: </b> {prihvaceneOsobe}
        </div>
      )}
      <AdModal
        visible={isModalOpen}
        onCancel={closeModal}
        post={post}
        editMode={false}
        id={props.id}
      ></AdModal>
    </Card>
  );
};
CustomCard.propTypes = {
  id: PropTypes.number,
  post: PropTypes.object,
  posaoNaziv: PropTypes.string,
  mjesto: PropTypes.string,
  datum: PropTypes.any,
  brojLjudi: PropTypes.number,
  satnica: PropTypes.number,
};

export default CustomCard;
