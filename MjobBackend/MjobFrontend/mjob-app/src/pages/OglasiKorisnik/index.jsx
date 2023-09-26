import React, { useState, useEffect } from "react";
import { Content, StyledTable } from "../../components/BasicStyledComponents";
import OglasiService from "../../services/OglasiService";
import moment from "moment";
import { Button, Tooltip } from "antd";
import korisnikService from "../../services/korisnik.service";

const Oglasi = () => {
  const columns = [
    {
      title: "Status",
      dataIndex: "odobren",
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
    },
    {
      title: "",
      key: "actions1",
      dataIndex: "id",
      render: (record) => (
        <Tooltip>
          <Button onClick={() => odjaviSe(record)}>ODJAVI SE</Button>
        </Tooltip>
      ),
    },
  ];
  const [ads, setAds] = useState([]);
  useEffect(() => {
    load();
  }, []);
  const odjaviSe = (id) => {
    korisnikService.refuseJobRequest(id);
    window.location.reload(false);
  };
  const load = () => {
    OglasiService.getMojiOglasi().then((res) => {
      res.data = res.data.filter((element) => element.odjavljen === false);
      res.data.forEach((item, index) => {
        if (item.odbijen === true) item.odobren = "Posao nije vaš!";
        else if (item.odobren === true) item.odobren = "Posao je vaš!";
        else if (item.odobren === false && item.odbijen === false)
          item.odobren = "Na čekanju!";
        setAds(res.data);
      });
    });
  };
  return (
    <Content>
      <StyledTable key="id" dataSource={ads} columns={columns} />
    </Content>
  );
};

export default Oglasi;
