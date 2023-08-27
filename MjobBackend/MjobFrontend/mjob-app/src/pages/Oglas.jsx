import React from "react";
import { StyledCard } from "../components/BasicStyledComponents";
import * as PropTypes from "prop-types";
import { Button } from "antd";

class Oglas extends React.Component {
  render() {
    const {
      id,
      sadrzaj,
      mjesto,
      brojLjudi,
      satnica,
      datum,
      posaoTip,
      novcanaNaknadaTip,
      narucilac,
    } = this.props;

    const containerStyle = {
      border: "1px solid gray",
      padding: "10px 10px 10px 10px",
      borderRadius: "5px",
      width: "700px",
      align: "center",
    };

    return (
      <StyledCard style={containerStyle}>
        <h2>{sadrzaj}</h2>
        <b>Mjesto: </b> {mjesto}
        <br />
        <b>Broj potrebnih radnika: </b> {brojLjudi}
        <br />
        <b>Satnica: </b> {satnica} {novcanaNaknadaTip}
        <br />
        <b>Tip posla: </b> {posaoTip}
        <br />
        <b>Napomena: </b>
        <br />
        <b>Datum objave: </b> {datum.substring(0, 10)}
        <br />
        <b>Narucilac: </b> {narucilac}
        <br />
        <br />
        <Button>PRIJAVI SE</Button>
        <Button a href={`/api/oglasi/${id}/edit`}>
          IZMJENA
        </Button>
      </StyledCard>
    );
  }
}

Oglas.propTypes = {
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

export default Oglas;
