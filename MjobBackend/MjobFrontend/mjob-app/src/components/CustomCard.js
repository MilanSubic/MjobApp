import { Card } from "antd";
import { React, useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import oglasService from "../services/OglasService";
import AdModal from "./AdModal";
import moment from "moment";

const CustomCard = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const openModal = () => {
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
    });
  };

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
      <br />
      <b>Napomena: </b>
      <br />
      {post.napomena}
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
