import React, { useState, useEffect } from "react";
import { StyledCard } from "../components/BasicStyledComponents";
import { Button } from "antd";
import axios from "axios";
import korisnikService from "../services/korisnik.service";
import oglasService from "../services/OglasService";
import oglasiService from "../services/OglasiService";
import { PropTypes } from "prop-types";
import { useNavigate, Link } from "react-router-dom";
import UsersListModal from "../components/UsersListModal";

const PostData = (props) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
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
  const [userType, setUserType] = useState();
  useEffect(() => {
    console.log(post.id);
    loadPost();
    setUserType(localStorage.getItem("tipKorisnika"));
  }, []);

  const loadPost = () => {
    oglasService.getPostById(props.id).then((result) => {
      setPost(result.data);
    });
  };
  const obrisiOglas = () => {
    oglasiService.remove(post.id);
  };
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const containerStyle = {
    border: "1px solid gray",
    padding: "10px 10px 10px 10px",
    borderRadius: "5px",
    width: "700px",
    align: "center",
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
      navigate("/home");
    } catch (error) {
      console.log("Niste se uspjesno prijavili na oglas");
    }
  }

  return (
    <div>
      <StyledCard style={containerStyle}>
        <h2>{post.sadrzaj}</h2>
        <b>Mjesto: </b> {post.mjesto}
        <br />
        <b>Broj potrebnih radnika: </b> {post.brojLjudi}
        <br />
        <b>Satnica: </b> {post.satnica} {post.novcanaNaknadaTip}
        <br />
        <b>Tip posla: </b> {post.posaoTipNaziv}
        <br />
        <b>Napomena: </b>
        {post.napomena}
        <br />
        <b>Datum objave: </b> {post.datum.substring(0, 10)}
        <br />
        <b>Narucilac: </b> {post.narucilacNaziv}
        <br />
        <br />
        {userType === "admin" && (
          <div>
            <Button a href={`/api/oglasi/${post.id}/edit`}>
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
          <Button onClick={prijaviButtonClick}>PRIJAVI SE</Button>
        )}
      </StyledCard>
    </div>
  );
};

PostData.propTypes = {
  id: PropTypes.any,
  sadrzaj: PropTypes.any,
  mjesto: PropTypes.any,
  brojLjudi: PropTypes.any,
  satnica: PropTypes.any,
  datum: PropTypes.any,
  posaoTip: PropTypes.any,
  novcanaNaknadaTip: PropTypes.any,
  narucilac: PropTypes.any,
};

export default PostData;
