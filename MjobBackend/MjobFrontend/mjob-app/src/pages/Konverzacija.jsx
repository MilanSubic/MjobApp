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
import React, { useEffect, useState } from "react";
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
import { setMessages, addMessage, addMessages } from "../slices/messageSlice";
import _map from "lodash/map";
import { Role } from "../enums/role.enum";
import { setUnreaded } from "../slices/unreadedSlice";
import {
  pushNewMessageKonverzacija,
  readKonverzacija,
  setCurrentPage,
  setKonverzacija,
  setKonverzacije,
  setTema,
  pushKonverzacija,
} from "../slices/konverzacijeSlice";

let stompClient = null;
let subscription = null;
let konverzacijeSub = null;

export const Konverzacija = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  const [total, setTotal] = useState();
  const [currentUser] = useState(getCurrentUser());
  const [novaTema, setNovaTema] = useState();
  const [showModal, setShowModal] = useState();

  const messages = useSelector((state) => state.messages.value);
  const firstMessage = useSelector((state) => state.messages.firstMessage);
  const scroll = useSelector((state) => state.messages.scroll);
  const konverzacije = useSelector((state) => state.konverzacije.value);
  const konverzacija = useSelector((state) => state.konverzacije.konverzacija);
  const tema = useSelector((state) => state.konverzacije.tema);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (!stompClient) connect();
      else {
        stompClient.disconnect(() => {
          stompClient = null;
        });
      }
      dispatch(setUnreaded(false));
      if (subscription) {
        subscription.unsubscribe();
        subscription = null;
      }
      if (konverzacijeSub) {
        konverzacijeSub.unsubscribe();
        konverzacijeSub = null;
      }
      if (konverzacije) dispatch(setKonverzacije([]));
    };
  }, []);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
  });

  const messagePageSize = 50;
  const [messagePage, setMessagePage] = useState(1);

  const [messageTotalPages, setMessageTotalPages] = useState();

  useEffect(() => {
    if (scroll) {
      const divElement = document.getElementById("m" + scroll.id);
      divElement.scrollIntoView({ behavior: "smooth" });
    }
  }, [scroll]);

  const onMenuClick = (c) => {
    // eslint-disable-next-line eqeqeq
    const item = konverzacije.find((i) => i.id == c.key);
    dispatch(setKonverzacija(item));
    const index = konverzacije.indexOf(item);
    if (index !== -1 && !item.procitana) {
      dispatch(readKonverzacija(item.id));
    }
  };

  const connect = () => {
    if (!stompClient) {
      const Sock = new SockJS(environments().wsUrl);
      stompClient = over(Sock);

      const token = sessionStorage.getItem("token");
      stompClient.connect(
        { Authorization: `Bearer ${token}` },
        onConnected,
        onError
      );
    }
  };

  const onConnected = () => {
    konverzacijeSub = stompClient.subscribe(
      "/korisnik/" + currentUser.sub + "/novePoruke",
      onNewMessageCreated
    );
    if (konverzacija) subscribeOnKonverzacija(konverzacija.id);
  };

  const onError = (err) => {
    console.log(err);
  };

  function onNewMessageCreated(payload) {
    const kon = JSON.parse(payload.body);
    dispatch(pushNewMessageKonverzacija(kon));
  }

  let prevId = null;

  const subscribeOnKonverzacija = (id) => {
    if (stompClient && stompClient.connected) {
      // eslint-disable-next-line eqeqeq
      if (id != prevId) {
        prevId = id;
        if (subscription) subscription.unsubscribe();
        subscription = stompClient.subscribe(
          `/korisnik/konverzacija(${id})/${currentUser.sub}/poruke`,
          onMessageReceived
        );
      }
    }
  };

  useEffect(() => {
    if (
      konverzacija &&
      messages?.length > 0 &&
      messages[0]?.korisnikKorisnickoIme !== currentUser.sub
    ) {
      procitaj(konverzacija.id).then(() => {});
    }
  }, [messages]);

  const onSend = () => {
    if (stompClient) {
      const obj = {
        sadrzaj,
        dokumenti: fileList,
        konverzacijaId: konverzacija.id,
      };
      stompClient.send("/app/poruka", {}, JSON.stringify(obj));
      setFileList([]);
      setSadrzaj();
    } else console.log("no connection");
  };

  const onMessageReceived = (payload) => {
    const poruka = JSON.parse(payload.body);

    dispatch(addMessage(poruka));
  };

  const map = (d) => ({
    key: String(d?.id),
    label: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 0,
        }}
      >
        {(currentUser &&
        currentUser.authorities.find((a) => Role.Admin === a.authority)
          ? d?.korisnikIme + " " + d?.korisnikPrezime + " - "
          : "") + d?.tema}
      </div>
    ),
    title: d?.tema,
    icon: (
      <Badge dot={!d?.procitana} size="small">
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
      dispatch(setKonverzacije(res.data.content));
      setTotal(res.data.totalElements);
    });
  };

  useEffect(() => {
    getKonverzacijeData();
  }, [pagination.current]);

  const getPorukaData = () => {
    getPoruke({
      current: 0,
      pageSize: messagePageSize,
      property: "id",
      direction: "DESC",
      filter: { konverzacijaId: konverzacija.id },
    }).then((res) => {
      dispatch(setMessages(res.data.content));
      setMessageTotalPages(res.data.totalPages);
      subscribeOnKonverzacija(konverzacija.id);
    });
  };

  const loadMessages = () => {
    getPoruke({
      current: messagePage - 1,
      pageSize: messagePageSize,
      property: "id",
      direction: "DESC",
      filter: { konverzacijaId: konverzacija.id },
    }).then((res) => {
      let id = 0;
      if (firstMessage) id = firstMessage.id;
      dispatch(addMessages(res.data.content));

      if (id > 0) {
        const divElement = document.getElementById("m" + id);
        divElement.scrollIntoView();
      }
    });
  };

  const handleScroll = (e) => {
    if (messagePage < messageTotalPages && e.target.scrollTop === 0) {
      setMessagePage(messagePage + 1);
    }
  };

  useEffect(() => {
    if (konverzacija) {
      setMessagePage(1);
      getPorukaData();

      setFileList([]);
      setSadrzaj();
    }
  }, [konverzacija]);

  useEffect(() => {
    if (konverzacija && messagePage > 1) loadMessages();
  }, [messagePage]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes} ${day}.${month}.${year}.`;
  };

  const onChangePage = (currentPage, pageSize) => {
    dispatch(setCurrentPage(currentPage));
    setPagination({ current: currentPage, pageSize: pagination.pageSize });
  };

  const [fileToLarge, setFileToLarge] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [sadrzaj, setSadrzaj] = useState();

  const onChangeText = (e) => {
    setSadrzaj(e.target.value);
  };

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
    const filter = { tema: value };

    // eslint-disable-next-line eqeqeq
    if (tema != value) getKonverzacijeData(filter);
  };

  const onOK = () => {
    postKonverzacija({ tema: novaTema }).then((res) => {
      setNovaTema();
      dispatch(pushKonverzacija(res.data));
      dispatch(setKonverzacija(res.data));
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
                onChange={(e) => dispatch(setTema(e.target.value))}
                enterButton
              />
            </div>
          )}
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[konverzacija?.id]}
            selectedKeys={[String(konverzacija?.id)]}
            items={_map(konverzacije, (x) => map(x))}
            onClick={onMenuClick}
            style={{
              flexGrow: 1,
              backgroundColor: "#001529",
            }}
            id="menu"
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
            <p style={{ textOverflow: "ellipsis" }}>{konverzacija?.tema}</p>
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
          onScroll={handleScroll}
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
                  <div
                    key={p.id}
                    id={"m" + p.id}
                    style={{ width: "100%", margin: "10px" }}
                  >
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
                                    icon={
                                      <DownloadOutlined className="downloadIcon" />
                                    }
                                    className="downloadButton"
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
                        <div className="fileItem fileItemColor">
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
        okButtonProps={{ disabled: !novaTema }}
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
