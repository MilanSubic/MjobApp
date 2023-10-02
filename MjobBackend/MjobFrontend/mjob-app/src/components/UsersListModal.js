import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal, Space, Table } from "antd";
import korisnikService from "../services/korisnik.service";
import moment from "moment/moment";

const UsersListModal = (props) => {
  const { visible, onCancel, jobId, confirmLoading } = props;
  const [users, setUsers] = useState([]);
  const [usersForFirst, setUsersForFirst] = useState([]);

  useEffect(() => {
    korisnikService.getAllUserRequestsForJob(jobId).then((res) => {
      setUsers(res.filter((el) => el.odjavljen === false));
      setUsersForFirst(
        res.filter((el) => el.odobren === true && el.odjavljen === false)
      );
    });
  }, [jobId]);
  const odbijZahtjev = (id) => {
    korisnikService.acceptJobRequest(jobId, id, false);
    const user = users.find((user) => user.korisnikByKorisnikId.id === id);
    if (user != null) user.odobren = false;
    setUsers(users);
    setUsersForFirst(users.filter((el) => el.odobren === true));
  };
  const prihvatiZahtjev = (id) => {
    korisnikService.acceptJobRequest(jobId, id, true);
    const user = users.find((user) => user.korisnikByKorisnikId.id === id);
    if (user != null) user.odobren = true;
    setUsers(users);
    setUsersForFirst(users.filter((el) => el.odobren === true));
  };
  const columnsForFirst = [
    {
      title: "ID:",
      dataIndex: "korisnikByKorisnikId",
      render: (record) => {
        return record.identifikator;
      },
    },
    {
      title: "Ime",
      dataIndex: "korisnikByKorisnikId",
      render: (record) => {
        return record.ime;
      },
    },
    {
      title: "Prezime",
      dataIndex: "korisnikByKorisnikId",
      render: (record) => {
        return record.prezime;
      },
    },
    {
      title: "JMBG",
      dataIndex: "korisnikByKorisnikId",
      render: (record) => {
        return record.jmbg;
      },
    },
    {
      title: "Datum rodjenja",
      dataIndex: "korisnikByKorisnikId",
      render: (record) => {
        return moment(record.datumRodjenja).format("DD-MM-YYYY");
      },
    },
    {
      title: "Broj clanske karte",
      dataIndex: "korisnikByKorisnikId",
      render: (record) => {
        return record.brojClanskeKarte;
      },
    },
    {
      title: "Broj licne karte",
      dataIndex: "korisnikByKorisnikId",
      render: (record) => {
        return record.brojLicneKarte;
      },
    },
    {
      title: "Broj tekuceg racuna",
      dataIndex: "korisnikByKorisnikId",
      render: (record) => {
        return record.brojTekucegRacuna;
      },
    },
    {
      title: "Obrazovna ustanova",
      dataIndex: "korisnikByKorisnikId",
      render: (record) => {
        return record.obrazovnaUstanova;
      },
    },
    {
      title: "Broj telefona",
      dataIndex: "korisnikByKorisnikId",
      render: (record) => {
        return record.brojTelefona;
      },
    },
    {
      title: "Email",
      dataIndex: "korisnikByKorisnikId",
      render: (record) => {
        return record.email;
      },
    },
  ];
  const columns = [
    {
      title: "ID:",
      dataIndex: "korisnikByKorisnikId",
      render: (record) => {
        return record.identifikator;
      },
    },
    {
      title: "Ime",
      dataIndex: "korisnikByKorisnikId",
      render: (record) => {
        return record.ime;
      },
    },
    {
      title: "Prezime",
      dataIndex: "korisnikByKorisnikId",
      render: (record) => {
        return record.prezime;
      },
    },
    {
      title: "Datum rodjenja",
      dataIndex: "korisnikByKorisnikId",
      render: (record) => {
        return moment(record.datumRodjenja).format("DD-MM-YYYY");
      },
    },
    {
      title: "Broj clanske karte",
      dataIndex: "korisnikByKorisnikId",
      render: (record) => {
        return record.brojClanskeKarte;
      },
    },
    {
      title: "Obrazovna ustanova",
      dataIndex: "korisnikByKorisnikId",
      render: (record) => {
        return record.obrazovnaUstanova;
      },
    },
    {
      title: "Broj telefona",
      dataIndex: "korisnikByKorisnikId",
      render: (record) => {
        return record.brojTelefona;
      },
    },
    {
      title: "Email",
      dataIndex: "korisnikByKorisnikId",
      render: (record) => {
        return record.email;
      },
    },
    {
      title: "Akcija",
      render: (_text, record) => (
        <Space size="middle">
          <a onClick={() => prihvatiZahtjev(record.korisnikByKorisnikId.id)}>
            Prihvati
          </a>
          <a onClick={() => odbijZahtjev(record.korisnikByKorisnikId.id)}>
            Odbij
          </a>
        </Space>
      ),
    },
  ];
  return (
    <Modal
      width={1300}
      destroyOnClose
      onCancel={() => onCancel()}
      visible={visible}
      confirmLoading={confirmLoading}
      footer={[]}
    >
      <h3>Prihvaceni zahtjevi:</h3>
      <Table columns={columnsForFirst} dataSource={usersForFirst}></Table>
      <h3>Svi zahtjevi:</h3>
      <Table columns={columns} dataSource={users}></Table>
    </Modal>
  );
};
UsersListModal.propTypes = {
  visible: PropTypes.bool,
  confirmLoading: PropTypes.bool,
  jobId: PropTypes.number,
  onCancel: PropTypes.func,
};

export default UsersListModal;
