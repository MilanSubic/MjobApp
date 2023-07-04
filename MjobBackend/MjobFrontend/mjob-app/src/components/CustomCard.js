import { Card } from "antd";
import { React, useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import oglasService from "../services/OglasService";

const CustomCard = (props) => {
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

  useEffect(() => {
    console.log(post.id);
    loadPost();
    console.log("useEffect(CustomCard)" + post.posaoTipNaziv);
  }, []);

  const loadPost = () => {
    oglasService.getPostById(props.id).then((result) => {
      setPost(result.data);
    });
  };

  return (
    <a href={`/api/oglasi/${props.id}`} style={{ textDecoration: "none" }}>
      <Card
        hoverable
        style={{
          width: 230,
          height: 250,
        }}
        title={props.posaoNaziv}
      >
        <b>Mjesto: </b> {post.mjesto}
        <br />
        <b>Datum: </b> {post.datum.substring(0, 10)}
        <br />
        <b>Broj ljudi: </b> {post.brojLjudi}
        <br />
        <b>Satnica: </b> {post.satnica} KM
        <br />
        <b>Napomena: </b>
        <br />
        {post.napomena}
      </Card>
    </a>
  );
};
CustomCard.propTypes = {
  id: PropTypes.number,
  posaoNaziv: PropTypes.string,
};

export default CustomCard;
