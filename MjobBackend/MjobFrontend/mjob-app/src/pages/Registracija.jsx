import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Space,
  Table,
  Upload,
  notification,
} from "antd";
import React, { useState } from "react";
import "../styles/SingUp.css";
import { InboxOutlined } from "@ant-design/icons";
import { signup } from "../services/RegistracijaService";
import { CustomSelect } from "../components/Select";
import BasicService from "../services/BasicService";
import { useNavigate } from "react-router-dom";

export const Registracija = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    signup(values)
      .then((res) => {
        form.resetFields();
        setFiles([]);
        navigate("/login", { replace: true });
      })
      .catch((_err) => openNotificationWithIcon("error"));
  };

  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState();
  const [files, setFiles] = useState([]);
  const [tipDokumenta, setTipDokumenta] = useState();
  const httpService = BasicService.service();
  const [key, setKey] = useState(1);
  const [fileToLarge, setFileToLarge] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Greška na serveru",
    });
  };

  const onAddFile = (values) => {
    const newFile = {
      id: key,
      naziv: file.naziv,
      velicina: file.velicina,
      dokumentTipId: tipDokumenta.id,
      dokumentTipNaziv: tipDokumenta.naziv,
      sadrzaj: file.sadrzaj,
    };
    setKey(key + 1);
    let f = form.getFieldValue("dokumenti");

    if (!f) f = [];

    form.setFieldValue("tipDokumenta", undefined);

    setFile();
    setTipDokumenta();
    setFileList([]);

    form.setFieldValue("dokumenti", [...f, newFile]);
    setFiles([...files, newFile]);
  };

  const onRemoveFile = (file) => {
    const files = form.getFieldValue("dokumenti");
    const index = files.indexOf(file);
    const newFileList = files.slice();
    newFileList.splice(index, 1);
    form.setFieldValue("dokumenti", newFileList);
    setFiles(newFileList);
  };

  const tableProps = {
    dataSource: files,
    columns: [
      {
        title: "Naziv",
        key: "naziv",
        dataIndex: "naziv",
      },
      {
        title: "Tip",
        key: "dokumentTipNaziv",
        dataIndex: "dokumentTipNaziv",
      },
      {
        title: "Akcije",
        key: "akcije",
        render: (_, record) => (
          <Space size="middle">
            <Popconfirm
              title="Da li ste sigurni"
              okText="Da"
              cancelText="Ne"
              onConfirm={() => onRemoveFile(record)}
            >
              <a>Obrisi</a>
            </Popconfirm>
          </Space>
        ),
      },
    ],
    rowKey: "id",
  };

  const selectColumns = [
    {
      title: "Naziv",
      dataIndex: "naziv",
      sorter: true,
    },
  ];

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
      setFile();

      if (fileToLarge) setFileToLarge(false);
    },
    beforeUpload: (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (file.size <= 6000000) {
          setFileToLarge(false);
          setFile({
            naziv: file.name,
            velicina: file.size,
            sadrzaj: reader.result,
          });
        } else {
          setFileToLarge(true);
          setFile();
        }
      };
      setFileList([file]);
      return false;
    },
    fileList,
    listType: "picture",
    maxCount: 1,
  };

  const display = (e) => e?.naziv;

  return (
    <>
      {contextHolder}
      <div className="container">
        <Card className="card" title="Registracija">
          <Form
            form={form}
            name="singup"
            labelCol={{ span: 6 }}
            labelWrap
            labelAlign="left"
            onFinish={onFinish}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item
              label="Ime"
              name="ime"
              rules={[
                { required: true, message: "Polje je obavezno" },
                { max: 45, message: "Maksimalan broj karaktera je 45" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Prezime"
              name="prezime"
              rules={[
                { required: true, message: "Polje je obavezno" },
                { max: 45, message: "Maksimalan broj karaktera je 45" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Ime Roditelja"
              name="imeRoditelja"
              rules={[
                { required: true, message: "Polje je obavezno" },
                { max: 45, message: "Maksimalan broj karaktera je 45" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Datum rodjenja"
              name="datumRodjenja"
              rules={[{ required: true, message: "Polje je obavezno" }]}
            >
              <DatePicker
                placeholder=""
                format="DD.MM.YYYY"
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>

            <Form.Item
              label="Mjesto rodjenja"
              name="mjestoRodjenjaOpstina"
              rules={[{ required: true, message: "Polje je obavezno" }]}
            >
              <CustomSelect
                columns={selectColumns}
                api="/api/registracija/opstine"
                httpService={httpService}
                keyProp="id"
                display={display}
                entityKey="id"
                parent={form}
                itemName="mjestoRodjenjaOpstinaId"
              />
            </Form.Item>
            <Form.Item name="mjestoRodjenjaOpstinaId" hidden={true}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Adresa stanovanja"
              name="ulicaIBroj"
              rules={[
                {
                  required: true,
                  message: "Polje je obavezno",
                },
                { max: 255, message: "Maksimalan broj karaktera je 255" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Opstina"
              name="opstina"
              rules={[
                {
                  required: true,
                  message: "Polje je obavezno",
                },
              ]}
            >
              <CustomSelect
                style={{
                  width: "50%",
                }}
                columns={selectColumns}
                api="/api/registracija/opstine"
                httpService={httpService}
                keyProp="id"
                display={display}
                entityKey="id"
                parent={form}
                itemName="opstinaId"
              />
            </Form.Item>
            <Form.Item name="opstinaId" hidden>
              <Input />
            </Form.Item>
            <Form.Item
              label="Pol"
              name="korisnikPol"
              rules={[{ required: true, message: "Polje je obavezno" }]}
            >
              <CustomSelect
                columns={selectColumns}
                api="/api/registracija/pol"
                httpService={httpService}
                keyProp="id"
                display={display}
                entityKey="id"
                parent={form}
                itemName="korisnikPolId"
              />
            </Form.Item>
            <Form.Item name="korisnikPolId" hidden={true}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Broj licne karte"
              name="brojLicneKarte"
              rules={[
                {
                  message:
                    "Polje mora imati 9 karaktera i može sadržavati samo velika slova i brojeve.",
                  pattern: /^[A-Z0-9]{9}$/,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Izdavaoc licne karte"
              name="izdavaocLicneKarteOpstina"
            >
              <CustomSelect
                columns={selectColumns}
                api="/api/registracija/opstine"
                httpService={httpService}
                keyProp="id"
                display={display}
                entityKey="id"
                parent={form}
                itemName="izdavaocLicneKarteOpstinaId"
              />
            </Form.Item>
            <Form.Item name="izdavaocLicneKarteOpstinaId" hidden={true}>
              <Input />
            </Form.Item>

            <Form.Item
              label="JMBG"
              name="jmbg"
              rules={[
                { required: true, message: "Polje je obavezno" },
                {
                  pattern: /^[0-9]{13}$/,
                  message: "JMBG mora imati 13 cifara",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Obrazovna ustanova"
              name="obrazovnaUstanovaTip"
              rules={[{ required: true, message: "Polje je obavezno" }]}
            >
              <CustomSelect
                columns={selectColumns}
                api="/api/registracija/tipObrazovneUstanove"
                httpService={httpService}
                keyProp="id"
                display={display}
                entityKey="id"
                parent={form}
                itemName="obrazovnaUstanovaTipId"
              />
            </Form.Item>
            <Form.Item name="obrazovnaUstanovaTipId" hidden={true}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Naziv obrazovne ustanove"
              name="obrazovnaUstanova"
              rules={[
                { required: true, message: "Polje je obavezno" },
                { max: 250, message: "Maksimalan broj karaktera je 250" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Broj indeksa, radne ili djacke knjizice"
              name="identifikator"
              rules={[
                { required: true, message: "Polje je obavezno" },
                { max: 45, message: "Maksimalan broj karaktera je 45" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Godina"
              name="godina"
              rules={[{ required: true, message: "Polje je obavezno" }]}
            >
              <InputNumber
                style={{
                  width: "100%",
                }}
                min="1"
                max="6"
              />
            </Form.Item>

            <Form.Item
              label="Broj tekuceg racuna"
              name="brojTekucegRacuna"
              rules={[
                { required: true, message: "Polje je obavezno" },
                {
                  pattern: /^[0-9]{1,16}$/,
                  message:
                    "Broj tekuceg racuna mora imati maksimalno 16 cifara",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Broj telefona"
              name="brojTelefona"
              rules={[
                { required: true, message: "Polje je obavezno" },
                {
                  pattern: /^[0-9+\-\\/\s]{1,16}$/,
                  message: "Broj telefona može imati maksimalno 16 cifara",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Email nije validan!",
                },
                { required: true, message: "Polje je obavezno" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Lozinka"
              name="lozinka"
              rules={[
                { required: true, message: "Polje je obavezno" },
                { min: 8, message: "Lozinka mora imati minimalno 8 karaktera" },
                {
                  pattern:
                    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,30}$/,
                  message:
                    "Lozinka mora imati barem jedno veliko slovo, broj i specijalan karakter",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Potvrdite lozinku"
              name="potrvdaLozinke"
              dependencies={["lozinka"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Polje je obavezno",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("lozinka") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Lozinke nisu iste"));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Dokumenti"
              name="dokumenti"
              rules={[{ required: true, message: "Polje je obavezno" }]}
            >
              <>
                <Form.Item name="tipDokumenta">
                  <CustomSelect
                    columns={selectColumns}
                    api="/api/registracija/tipDokumenta"
                    httpService={httpService}
                    keyProp="id"
                    display={display}
                    value={tipDokumenta}
                    onChange={(value) => setTipDokumenta(value)}
                  />
                </Form.Item>
                <Form.Item>
                  <>
                    <Upload.Dragger {...props} name="files">
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Kliknite ili prevucice dokument
                      </p>
                    </Upload.Dragger>
                    {fileToLarge && (
                      <p className="danger">
                        Dokument je prevelik. Maksimalna veličina je 5MB.
                      </p>
                    )}
                  </>
                </Form.Item>
                <Form.Item>
                  <Button disabled={!file || !tipDokumenta} onClick={onAddFile}>
                    Dodaj
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Table {...tableProps}></Table>
                </Form.Item>
              </>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 10, span: 10 }}>
              <Button type="primary" htmlType="submit">
                Registruj se
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};
