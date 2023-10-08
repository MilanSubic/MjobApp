import React, { useState, useEffect } from "react";
import { Content, StyledTable } from "../../components/BasicStyledComponents";
import OglasiService from "../../services/OglasiService";
import moment from "moment";
import { Button, Tooltip, message } from "antd";
import korisnikService from "../../services/korisnik.service";
import SockJS from "sockjs-client";
import environments from "../../environments";
import { over } from "stompjs";

let stompClient = null;
// let konverzacijeSub = null;
let pom1 = null;
let pom2 = null;
const Oglasi = () => {
  const connect = () => {
    if (!stompClient) {
      const Sock = new SockJS(environments().wsUrl);
      stompClient = over(Sock);

      const token = localStorage.getItem("token");
      stompClient.connect(
        { Authorization: `Bearer ${token}` },
        onConnected,
        onError
      );
    }
  };
  const onError = (err) => {
    console.log(err);
  };
  const onConnected = () => {
    // konverzacijeSub = stompClient.subscribe("/oglas", onMessageReceived);
    pom1 = stompClient.subscribe("/oglas/*/usersUplata/*", onMessageReceived);
    pom2 = stompClient.subscribe("/oglas/*/user/*", onMessageReceived);
  };
  const onMessageReceived = (payload) => {
    // const poruka = JSON.parse(payload.body);

    if (!(payload.body === "Korisnik se odjavio sa posla!")) load();
  };

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
      title: "Uplata",
      dataIndex: "uplata",
      render: (uplata) => {
        return uplata ? (
          <span style={{ color: "green" }}>Uplata je legla</span>
        ) : (
          <span style={{ color: "black" }}>Uplata nije legla</span>
        );
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
    return () => {
      if (!stompClient) connect();
      else {
        stompClient.disconnect(() => {
          stompClient = null;
        });
      }
      if (pom1 && pom2) {
        // konverzacijeSub.unsubscribe();
        // konverzacijeSub = null;
        pom1.unsubscribe();
        pom2.unsubscribe();
        pom1 = null;
        pom2 = null;
      }
      load();
    };
  }, []);
  const odjaviSe = (id) => {
    korisnikService.refuseJobRequest(id).then((res) => {
      console.log(res.data);
      if (res.data === true) {
        message.success("Uspješna odjava!");
        load();
        const updatedAds = ads.filter((ad) => ad.id !== id);
        setAds(updatedAds);
      } else
        message.error("Nije moguća odjava sa oglasa na kojem ste odbijeni!");
    });
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
