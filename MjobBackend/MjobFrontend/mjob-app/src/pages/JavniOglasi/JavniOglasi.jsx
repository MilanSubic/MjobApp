import React, { useState, useEffect } from "react";
// import { Button, Tooltip } from "antd";
import { Content, StyledTable } from "../../components/BasicStyledComponents";
import OglasiService from "../../services/OglasiService";
import moment from "moment";

const JavniOglasi = () => {
  const [ads, setAds] = useState([]);
  useEffect(() => {
    OglasiService.getAllOglasiJavni().then((res) => setAds(res.data));
  }, []);

  return (
    <Content>
      <StyledTable key="id" dataSource={ads} columns={columns} />
    </Content>
  );
};

const columns = [
  {
    title: "Sadržaj",
    dataIndex: "sadrzaj",
  },
  {
    title: "Tip posla",
    dataIndex: "posaoTipNaziv",
  },
  {
    title: "Mjesto",
    dataIndex: "mjesto",
  },
  {
    title: "Datum objave",
    dataIndex: "datum",
    render: (record) => moment(record).format("DD.MM.YYYY."),
    sorter: (a, b) => moment(a.datum).unix() - moment(b.datum).unix(),
  },
  {
    title: "Aktivan do",
    dataIndex: "aktivanDo",
    render: (record) => moment(record).format("DD.MM.YYYY."),
    sorter: (a, b) => moment(a.aktivanDo).unix() - moment(b.aktivanDo).unix(),
  },
  {
    title: "Satnica",
    dataIndex: "satnica",
  },
  {
    title: "Novčana naknada",
    dataIndex: "novcanaNaknadaTipNaziv",
  },
  {
    title: "Napomena",
    dataIndex: "napomena",
  },
  {
    title: "Naručilac",
    // key: "actions",
    dataIndex: "narucilacNaziv",
    // eslint-disable-next-line react/display-name
    /* render: (record) => (
      <Tooltip
        title={
          <>
            <div>Email: {record.email}</div>
            <div>Broj telefona: {record.brojTelefona}</div>
            <div>Adresa: {record.ulicaIBroj}</div>
            <div>{record.naseljenoMjestoByNaseljenoMjestoId}</div>
          </>
        }
        placement="bottom"
      >
      
        <Button type="link"> {record.naziv}</Button>
      </Tooltip>
    ),
    
    */
  },
];
export default JavniOglasi;
