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
    setUserType(localStorage.getItem("tipKorisnika"));
  }, []);
  const [post, setPost] = useState({
    id: 0,
    sadrzaj: "",
    mjesto: "",
    napomena: "",
    datum: "",
    brojLjudi: 0,
    aktivan_do: false,
    satnica: 0,
    javni: "true",
    narucilacNaziv: "",
    novcanaNaknadaTipNaziv: "",
    posaoTipNaziv: "",
  });
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
  const closeModal = () => {
    window.location.reload(false);
    setIsModalOpen(false);
  };
  useEffect(() => {
    loadPost();
  }, []);

  const loadPost = () => {
    oglasService.getPostById(props.id).then((result) => {
      setPost(result.data);
      brOsoba();
      console.log("kkkkkkk" + brojOsoba);
    });
  };

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
      onClick={() => openModal()}
      hoverable
      style={{
        width: 230,
        height: 250,
      }}
      title={props.posaoNaziv}
    >
      <b>Mjesto: </b> {post.mjesto}
      <br />
      <b>Datum: </b> {moment(post.datum.substring(0, 10)).format("DD.MM.YYYY.")}
      <br />
      <b>Broj potrebnih radnika: </b> {post.brojLjudi}
      <br />
      <b>Satnica: </b> {post.satnica} KM
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
  posaoNaziv: PropTypes.string,
};

export default CustomCard;
