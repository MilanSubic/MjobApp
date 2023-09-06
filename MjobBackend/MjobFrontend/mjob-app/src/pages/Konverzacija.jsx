import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PaperClipOutlined,
  SendOutlined,
  CloseCircleOutlined,
  DownloadOutlined,
  MessageOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  Divider,
  Input,
  Layout,
  List,
  Menu,
  Modal,
  Pagination,
  Upload,
  theme,
} from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import React, { useEffect, useRef, useState } from "react";
import {
  getKonverzacije,
  getPoruke,
  getSadrzajDokumenta,
  postKonverzacija,
  procitaj,
} from "../services/KonverzacijaService";
import { getCurrentUser } from "../services/auth.service";
import "../styles/Konverzacija.css";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import environments from "../environments";
import { useSelector, useDispatch } from "react-redux";
import { setMessages, addMessage } from "../slices/messageSlice";
import _map from "lodash/map";

let stompClient = null;

export const Konverzacija = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  const [konverzacija, setKonverzacija] = useState();
  const [total, setTotal] = useState();
  const [konverzacije, setKonverzacije] = useState([]);
  const [currentUser] = useState(getCurrentUser());
  const [tema, setTema] = useState();
  const [novaTema, setNovaTema] = useState();
  const [showModal, setShowModal] = useState();
  const [subscription, setSubscription] = useState();
  const [subscribeTo, setSubscribeTo] = useState();
  const [scroll, setScroll] = useState();

  const messages = useSelector((state) => state.messages.value);
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 15,
  });

  const bottomEl = useRef(null);

  const scrollToBottom = () => {
    bottomEl?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onMenuClick = (c) => {
    const item = konverzacije.find((i) => i.key === c.key);
    setKonverzacija(item);
    const index = konverzacije.indexOf(item);
    if (index !== -1 && !konverzacije[index].procitana) {
      konverzacije[index].icon = (
        <Badge dot={false} size="small">
          <MessageOutlined fontSize="10" />
        </Badge>
      );
      setKonverzacije([...konverzacije]);
    }
  };

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
    } else onConnected();
  };

  const onConnected = () => {
    if (konverzacija) {
      if (subscribeTo !== konverzacija.key) {
        if (subscribeTo) procitaj(subscribeTo).then(() => {});

        setSubscribeTo(konverzacija.key);
        setSubscription(
          stompClient.subscribe(
            "/konverzacija/" + konverzacija.key + "/poruke",
            onMessageReceived
          )
        );
      }
    } else setSubscription();
  };

  const onSend = () => {
    if (stompClient) {
      const obj = {
        sadrzaj,
        dokumenti: fileList,
        konverzacijaId: konverzacija.key,
      };
      stompClient.send("/app/poruka", {}, JSON.stringify(obj));
    }
  };

  const onMessageReceived = (payload) => {
    const poruka = JSON.parse(payload.body);
    if (poruka.korisnikKorisnickoIme === currentUser.sub) {
      setFileList([]);
      setSadrzaj();
    }

    dispatch(addMessage(poruka));

    setTimeout(() => {
      setScroll(poruka);
    });
  };

  const onError = (err) => {
    console.log(err);
  };

  const map = (d) => ({
    key: String(d.id),
    label: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 0,
        }}
      >
        {(currentUser &&
        currentUser.authorities.find((a) => a.authority === "ROLE_Admin")
          ? d.korisnikIme + " " + d.korisnikPrezime + " - "
          : "") + d.tema}
      </div>
    ),
    title: d.tema,
    icon: (
      <Badge dot={!d.procitana} size="small">
        <MessageOutlined fontSize="10" />
      </Badge>
    ),
  });

  const getKonverzacijeData = (filter) => {
    getKonverzacije({
      current: pagination.current - 1,
      pageSize: pagination.pageSize,
      filter,
    }).then((res) => {
      setKonverzacije(res.data.content.map((d) => map(d)));
      setTotal(res.data.totalElements);
    });
  };

  useEffect(() => {
    getKonverzacijeData();
  }, [pagination.current]);

  useEffect(() => {
    scrollToBottom();
  }, [scroll]);

  const getPorukaData = () => {
    getPoruke({
      current: 0,
      // dodati virtual scroll
      pageSize: 100,
      property: "id",
      direction: "DESC",
      filter: { konverzacijaId: konverzacija.key },
    }).then((res) => {
      dispatch(setMessages(res.data.content));
      connect();
      setScroll(true);
    });
  };

  useEffect(() => {
    if (konverzacija) {
      if (subscription) {
        subscription.unsubscribe();
      }

      getPorukaData();

      setFileList([]);
      setSadrzaj();
    }
  }, [konverzacija]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes} ${day}.${month}.${year}.`;
  };

  const onChangePage = (currentPage, pageSize) => {
    setPagination({ current: currentPage, pageSize: pagination.pageSize });
  };

  const [fileToLarge, setFileToLarge] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [sadrzaj, setSadrzaj] = useState();

  const onChangeText = (e) => {
    setSadrzaj(e.target.value);
  };
  /*
  const onSend = () => {
    const obj = {
      sadrzaj,
      dokumenti: fileList,
      konverzacijaId: konverzacija.key,
    };
    postPoruka(obj).then((res) => {
      setFileList([]);
      setSadrzaj();
      getPorukaData();
    });
  };
  */

  const onDownload = (dokument) => {
    getSadrzajDokumenta(dokument.id).then((res) => {
      const a = document.createElement("a");
      a.href = res.data.sadrzaj;
      a.download = dokument.naziv;
      a.click();
    });
  };

  const onRemove = (file) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);

    if (fileToLarge) setFileToLarge(false);
  };

  const onSearch = (value) => {
    const filter = { tema };

    getKonverzacijeData(filter);
  };

  const onOK = () => {
    postKonverzacija({ tema: novaTema }).then((res) => {
      setNovaTema();
      const k = map(res.data);
      setKonverzacije([k, ...konverzacije]);
      setKonverzacija(k);
      setShowModal(false);
    });
  };

  const props = {
    showUploadList: false,
    beforeUpload: (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (file.size <= 6000000) {
          setFileToLarge(false);
          setFileList([
            ...fileList,
            {
              dokument: {
                naziv: file.name,
                velicina: file.size,
                sadrzaj: reader.result,
              },
            },
          ]);
        } else {
          setFileToLarge(true);
        }
      };
      return false;
    },
    fileList,
    listType: "picture",
    maxCount: 1,
  };

  return (
    <Layout
      hasSider
      style={{
        display: "flex",
        margin: "20px",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Sider
        breakpoint="md"
        collapsedWidth="80"
        onCollapse={(collapsed, type) => {
          setCollapsed(collapsed);
        }}
        trigger={null}
        collapsible="true"
        collapsed={collapsed}
        width="35%"
        className="side"
      >
        <div
          style={{
            maxHeight: "85vh",
            minHeight: "85vh",
            overflow: "scroll",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="side-header">
            <span>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                  color: "white",
                }}
              />
            </span>
            {!collapsed && (
              <div className="fh">
                <span>Konverzacije</span>
                <span>
                  <Button
                    type="text"
                    icon={<PlusCircleOutlined />}
                    onClick={() => setShowModal(true)}
                    title="Nova konverzacija"
                    style={{
                      fontSize: "16px",
                      width: 64,
                      height: 64,
                      color: "white",
                    }}
                  />
                </span>
              </div>
            )}
          </div>
          {!collapsed && (
            <div style={{ padding: "5px 15px" }}>
              <Input.Search
                placeholder="Tema"
                allowClear
                value={tema}
                onSearch={onSearch}
                onChange={(e) => setTema(e.target.value)}
                enterButton
              />
            </div>
          )}
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[konverzacija?.key]}
            selectedKeys={[konverzacija?.key]}
            items={konverzacije}
            onClick={onMenuClick}
            style={{ flexGrow: 1, backgroundColor: "#001529" }}
          />
          {!collapsed && (
            <Pagination
              simple
              className="pagination"
              current={pagination.current}
              pageSize={pagination.pageSize}
              onChange={onChangePage}
              total={total}
            ></Pagination>
          )}
        </div>
      </Sider>
      <Layout
        className="site-layout"
        style={{
          maxHeight: "85vh",
          minHeight: "85vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              margin: "0 20px",
              textOverflow: "ellipsis",
            }}
          >
            <p style={{ textOverflow: "ellipsis" }}>{konverzacija?.title}</p>
          </div>
        </Header>
        <Divider style={{ margin: 0 }} />
        <Content
          style={{
            overflow: "auto",
            maxHeight: "75vh",
            flexGrow: 1,
            background: colorBgContainer,
          }}
        >
          <div
            style={{
              padding: 24,
              textAlign: "center",
            }}
          >
            {konverzacija && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column-reverse",
                }}
              >
                {_map(messages, (p) => (
                  <div key={p.id} style={{ width: "100%", margin: "10px" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent:
                          p.korisnikKorisnickoIme === currentUser.sub
                            ? "flex-end"
                            : "flex-start",
                      }}
                    >
                      <div
                        style={{
                          maxWidth: "70%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            padding: "2px 10px",
                            justifyContent:
                              p.korisnikKorisnickoIme === currentUser.sub
                                ? "flex-end"
                                : "flex-start",
                          }}
                        >
                          <span>
                            {(p.korisnikKorisnickoIme !== currentUser.sub
                              ? p.korisnikIme + " " + p.korisnikPrezime + " "
                              : "") + formatDate(new Date(p.kreirana))}
                          </span>
                        </div>
                        <div className="message">
                          <p>{p.sadrzaj}</p>
                          <div className="messageFiles">
                            {p.dokumenti?.map((pd) => (
                              <div
                                className="fileItem fileItemColor"
                                key={pd.dokument.id}
                              >
                                <div className="fileName">
                                  {pd.dokument.naziv}
                                </div>
                                <div className="btn">
                                  <Button
                                    icon={<DownloadOutlined />}
                                    className="deleteButton"
                                    onClick={() => onDownload(pd.dokument)}
                                  ></Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div ref={bottomEl}></div>
          </div>
        </Content>
        <Divider style={{ margin: 0 }} />
        <Footer className="messageInput">
          {konverzacija && (
            <>
              <div className="input">
                {fileList && fileList.length > 0 && (
                  <List
                    grid={{
                      gutter: 8,
                    }}
                    dataSource={fileList}
                    renderItem={(item) => (
                      <List.Item>
                        <div className="fileItem">
                          <div className="fileName">{item.dokument.naziv}</div>
                          <div className="btn">
                            <Button
                              icon={<CloseCircleOutlined />}
                              className="deleteButton"
                              onClick={() => onRemove(item.dokument)}
                            ></Button>
                          </div>
                        </div>
                      </List.Item>
                    )}
                  />
                )}
                <Input.TextArea
                  rows={2}
                  autoSize={{ maxRows: 6 }}
                  placeholder="Text"
                  value={sadrzaj}
                  onChange={onChangeText}
                ></Input.TextArea>
              </div>
              <div className="send">
                <Upload {...props}>
                  <Button icon={<PaperClipOutlined />}></Button>
                </Upload>
                <Button
                  icon={<SendOutlined />}
                  disabled={!sadrzaj}
                  onClick={onSend}
                ></Button>
              </div>
            </>
          )}
        </Footer>
      </Layout>
      <Modal
        open={showModal}
        title="Nova konverzacija"
        onCancel={() => {
          setShowModal(false);
          setNovaTema();
        }}
        bodyStyle={{ padding: "20px 10px" }}
        cancelText="Zatvori"
        okText="Kreiraj"
        onOk={onOK}
      >
        <Input
          value={novaTema}
          onChange={(e) => setNovaTema(e.target.value)}
        ></Input>
      </Modal>
    </Layout>
  );
};
