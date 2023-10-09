import React, { useState, useEffect } from "react";
import { Button, message, Tooltip } from "antd";
import { Content, StyledTable } from "../../components/BasicStyledComponents";
import OglasiService from "../../services/OglasiService";
import moment from "moment";

const MojiOglasi = () => {
  const [ads, setAds] = useState([]);
  const [newAds, setNewAds] = useState([]);

  useEffect(() => {
    OglasiService.getAllOglasiById(0).then((res) => {
      setAds(res.data);
    });
  }, []);

  const deleteOglas = (id) => {
    OglasiService.remove(id)
      .then((res) => {
        message.success("Uspjesno brisanje");
        setAds(
          ads.filter((el) => {
            return String(el.id) !== String(id);
          })
        );
        setNewAds(
          newAds.filter((el) => {
            return String(el.id) !== String(id);
          })
        );
      })
      // eslint-disable-next-line n/handle-callback-err
      .catch((err) => {
        message.info("Neuspjesno brisanje!");
      });
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
      title: "",
      key: "actions1",
      dataIndex: "id",
      render: (record) => (
        <Tooltip>
          <Button onClick={() => deleteOglas(record)}>OBRIŠI</Button>
        </Tooltip>
      ),
    },
  ];

  return (
    <Content>
      <StyledTable key="id" dataSource={ads} columns={columns} />
    </Content>
  );
};

export default MojiOglasi;
