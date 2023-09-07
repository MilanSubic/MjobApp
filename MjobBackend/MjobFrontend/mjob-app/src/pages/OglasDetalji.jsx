import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostData from "./PostData";
import OglasiService from "../services/OglasiService";

function PostDetails() {
  const { id } = useParams();
  const [oglas, setOglas] = useState(null);

  useEffect(() => {
    OglasiService.findById(id)
      .then((response) => {
        setOglas(response.data);
      })
      .catch((error) => {
        console.error("Greška pri dohvatanju oglasa:", error);
      });
  }, [id]);

  if (!oglas) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <PostData
        id={oglas.id}
        sadrzaj={oglas.sadrzaj}
        napomena={oglas.napomena}
        mjesto={oglas.mjesto}
        satnica={oglas.satnica}
        brojLjudi={oglas.brojLjudi}
        datum={oglas.datum}
        posaoTip={oglas.posaoTipNaziv}
        novcanaNaknadaTip={oglas.novcanaNaknadaTipNaziv}
        narucilac={oglas.narucilacNaziv}
      ></PostData>
    </div>
  );
}

export default PostDetails;
