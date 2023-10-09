import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Popconfirm, Table, Typography, Space, message } from "antd";
import { Content } from "antd/es/layout/layout";
import UsersService from "../services/UsersService";
import UsersModal from "./UsersModal";

const Page = styled.div`
  height: 100vh;
  disply: flex;
  flex-direction: column;
`;
const Toolbar = styled.div`
  disply: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;
const UsersTable = styled(Table)`
  flex-grow: 1;
`;

export const UsersList = () => {
  const [users, setUser] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    UsersService.getAll().then((res) => setUser(res.data));
  }, []);

  const columns = [
    {
      title: "Ime",
      dataIndex: "ime",
      key: "ime",
    },
    {
      title: "Prezime",
      dataIndex: "prezime",
      key: "prezime",
    },
    {
      title: "JMBG",
      dataIndex: "jmbg",
      key: "jmbg",
    },
    {
      title: "Ime roditelja",
      dataIndex: "imeRoditelja",
      key: "imeRoditelja",
    },
    {
      title: "Broj clanske karte",
      dataIndex: "brojClanskeKarte",
      key: "brojClanskeKarte",
    },

    {
      title: "Broj telefona",
      dataIndex: "brojTelefona",
      key: "brojTelefona",
    },
    {
      title: "identifikator(index):",
      dataIndex: "identifikator",
      key: "identifikator",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Akcija",
      key: "akcija",
      render: (_text, record) => (
        <Space size="middle">
          <a onClick={() => openEditModal(record)}>{"edit"}</a>
          <Popconfirm
            title={"Jeste li sigurni?"}
            okText={"da"}
            cancelText={"ne"}
            onConfirm={() => onDelete(record)}
          >
            <a>{"izbrisi"}</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const openAddModal = () => {
    setEditMode(false);
    setModalVisible(true);
  };
  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditMode(true);
    setModalVisible(true);
  };
  const closeModal = () => {
    setSelectedUser(null);
    setConfirmLoading(false);
    setEditMode(false);
    setModalVisible(false);
  };
  const saveData = (user) => {
    setConfirmLoading(true);
    if (editMode) {
      console.log("EDIT!");
      UsersService.update(user)
        .then((res) => {
          message.success("Uspjesan pregled");
          closeModal();
          setUser(
            users.map((e1) => (e1.id === res.id ? { ...e1, ...res } : e1))
          );
        })
        .catch((err) => {
          console.error(err);
          setConfirmLoading(false);
          message.error("Doslo je do greske prilikom izmjene");
        });
    } else {
      UsersService.insert(user)
        .then((res) => {
          closeModal();
          message.success("uspjesno dodavanje");
          setUser([...user, res]);
        })
        .catch((err) => {
          console.error(err);
          setConfirmLoading(false);
          message.error("Greska prilikom dodavanja");
        });
    }
  };

  const onDelete = (user) => {
    UsersService.remove(user.id)
      .then(() => {
        message.success("Uspjesno brisanje");
        setUser(user.filter((e1) => e1.id !== user.id));
      })
      .catch((err) => {
        console.error(err);
        message.error("Greska prilikom brisanja");
      });
  };

  return (
    <Page>
      <Content>
        <Toolbar>
          <Typography.Title level={3}> Korisnici</Typography.Title>
          <Button type="primary" onClick={() => openAddModal()}>
            Dodaj
          </Button>
        </Toolbar>
      </Content>
      <UsersTable
        dataSource={users}
        columns={columns}
        scroll={{ y: "calc(100vh-250px)" }}
      />
      <UsersModal
        editMode={editMode}
        visible={modalVisible}
        onCancel={closeModal}
        onOk={saveData}
        user={selectedUser}
        confirmLoading={confirmLoading}
      ></UsersModal>
    </Page>
  );
};
