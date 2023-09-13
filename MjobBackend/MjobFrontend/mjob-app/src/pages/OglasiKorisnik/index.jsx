import React, { useState, useEffect } from "react";
import { Content, StyledTable } from "../../components/BasicStyledComponents";
import OglasiService from "../../services/OglasiService";
import moment from "moment";

const Oglasi = () => {
  const [ads, setAds] = useState([]);
  useEffect(() => {
    OglasiService.getMojiOglasi().then((res) => setAds(res.data));
  }, []);

  return (
    <Content>
      <StyledTable key="id" dataSource={ads} columns={columns} />
    </Content>
  );
};

const columns = [
  {
    title: "Status",
    dataIndex: "odobren",
    render: (record) => {
      if (record === true) return "Posao je vaš!";
      else return "Na čekanju";
    },
  },
  {
    title: "Sadržaj",
    dataIndex: "oglasByOglasId",
    render: (record) => {
      return record.sadrzaj;
    },
  },
  {
    title: "Tip posla",
    dataIndex: "oglasByOglasId",
    render: (record) => {
      return record.posaoTipNaziv;
    },
  },
  {
    title: "Mjesto",
    dataIndex: "oglasByOglasId",
    render: (record) => {
      return record.mjesto;
    },
  },
  {
    title: "Datum objave",
    dataIndex: "oglasByOglasId",
    render: (record) => moment(record.datum).format("DD-MM-YYYY"),
    sorter: (a, b) => moment(a.datum).unix() - moment(b.datum).unix(),
  },
  {
    title: "Aktivan do",
    dataIndex: "oglasByOglasId",
    render: (record) => moment(record.aktivanDo).format("DD-MM-YYYY"),
    sorter: (a, b) => moment(a.aktivanDo).unix() - moment(b.aktivanDo).unix(),
  },
  {
    title: "Satnica",
    dataIndex: "oglasByOglasId",
    render: (record) => {
      return record.satnica;
    },
  },
  {
    title: "Novčana naknada",
    dataIndex: "oglasByOglasId",
    render: (record) => {
      return record.novcanaNaknadaTipNaziv;
    },
  },
  {
    title: "Napomena",
    dataIndex: "oglasByOglasId",
    render: (record) => {
      return record.napomena;
    },
  },
  {
    title: "Naručilac",
    //   key: "actions",
    dataIndex: "oglasByOglasId",
    render: (record) => {
      return record.narucilacNaziv;
    },
    // eslint-disable-next-line react/display-name
    /*
    render: (record) => (
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
export default Oglasi;
