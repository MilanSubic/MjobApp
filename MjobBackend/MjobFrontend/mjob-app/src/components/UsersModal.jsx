import React, { useEffect, useState } from "react";
import {
  Form,
  Modal,
  Input,
  InputNumber,
  DatePicker,
  Select,
  message,
  Button,
} from "antd";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import styled from "styled-components";
import KorisnikPolService from "../services/KorisnikPolService";
import OpstinaService from "../services/OpstinaService";
import NaseljenoMjestoService from "../services/NaseljenoMjestoService";
import ObrazovnaUstanovaTipService from "../services/ObrazovnaUstanovaTipService";

const UsersModal1 = styled(Modal)`
  .ant-modal-content {
    width: 800px;
  }
  justify-content: center;
  align-items: center;
`;

const UsersModal = (props) => {
  const { visible, onOk, onCancel, confirmLoading, user, isViewOnly } = props;
  const [form] = Form.useForm();
  const [usersGender, setUsersGender] = useState([]);
  const [usersOpstina, setUsersOpstina] = useState([]);
  const [usersMjesto, setUsersMjesto] = useState([]);
  const [usersUstanova, setUsersUstanova] = useState([]);
  const [ustanova, setUstanova] = useState(null);

  // const [buttonsDisabled, setButtonsDisabled] = useState(isViewOnly);

  const onSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        onOk({ ...user, ...values });
      })
      .catch((errorInfo) => {
        message.error("Molimo vas da ispravno popunite sva obavezna polja.");
        //  console.log("Validation failed:", errorInfo);
      });
  };
  useEffect(() => {
    if (usersUstanova && ustanova) {
      const maxGodina =
        ustanova &&
        usersUstanova.find((e) => e.id === ustanova).naziv.toLowerCase() ===
          "fakultet"
          ? 6
          : 4;
      const trenutnaGodina = form.getFieldValue("godina");
      if (trenutnaGodina > maxGodina) {
        form.setFieldsValue({ godina: maxGodina });
      }
    }
  }, [ustanova]);

  // useEffect(() => {
  //  setButtonsDisabled(isViewOnly);
  // }, [isViewOnly]);
  useEffect(() => {
    if (user) {
      // console.log("value: ", switchValue);
      form.setFieldsValue(user);
      setUstanova(form.getFieldValue("obrazovnaUstanovaTipId"));
      const convertedValue = !!user.osiguranjeZadruga;

      // setSwitchValue(convertedValue);

      form.setFieldsValue({
        osiguranjeZadruga: convertedValue,
      });

      form.setFieldsValue({
        datumRodjenja: dayjs(
          user.datumRodjenja?.toString(),
          "YYYY-MM-DDTHH:mm:ss.SSSZ"
        ),
      });
      form.setFieldsValue({
        datumUclanjenja: dayjs(
          user.datumUclanjenja?.toString(),
          "YYYY-MM-DDTHH:mm:ss.SSSZ"
        ),
      });

      // console.log("datumRodjenja-novi:", user.datumRodjenja);
    } else {
      form.resetFields();
    }
  }, [user]);
  useEffect(() => {
    KorisnikPolService.getAll().then((res) => setUsersGender(res.data));
  }, []);
  useEffect(() => {
    OpstinaService.getAll().then((res) => setUsersOpstina(res.data));
  }, []);
  useEffect(() => {
    NaseljenoMjestoService.getAll().then((res) => setUsersMjesto(res.data));
  }, []);
  useEffect(() => {
    ObrazovnaUstanovaTipService.getAll().then((res) =>
      setUsersUstanova(res.data)
    );
  }, []);
  return (
    <UsersModal1
      // okText={"Sačuvaj"}
      // cancelText={"Izađi"}
      okText={null} // Postavite okText na null da biste isključili podrazumevano ok dugme
      cancelText={null}
      onOk={!isViewOnly ? () => onSubmit() : null}
      destroyOnClose
      onCancel={() => onCancel()}
      visible={visible}
      confirmLoading={confirmLoading}
      footer={null}
      // okButton={isViewOnly ? null : undefined}
      // cancelButton={isViewOnly ? null : undefined}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        minHeight: "calc(100vh - 300px)", // Prilagodite visinu modala kako odgovara vašem dizajnu
        paddingBottom: 16, // Dodatni prostor ispod sadržaja
      }}
    >
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        labelAlign="left"
        style={{
          paddingTop: "20px",
        }}
      >
        <Form.Item
          name="ime"
          rules={[
            { required: true, message: "Polje je obavezno" },
            { max: 45, message: "Maksimalan broj karaktera je 45" },
          ]}
          label={"Ime:"}
        >
          <Input
            className={isViewOnly ? "read-only-input" : ""}
            readOnly={isViewOnly}
          />
        </Form.Item>
        <Form.Item
          name="prezime"
          rules={[
            { required: true, message: "Polje je obavezno" },
            { max: 45, message: "Maksimalan broj karaktera je 45" },
          ]}
          label={"Prezime:"}
        >
          <Input
            className={isViewOnly ? "read-only-input" : ""}
            readOnly={isViewOnly}
          />
        </Form.Item>
        <Form.Item
          name="imeRoditelja"
          rules={[
            { required: true, message: "Polje je obavezno" },
            { max: 45, message: "Maksimalan broj karaktera je 45" },
          ]}
          label={"Ime Roditelja:"}
        >
          <Input
            className={isViewOnly ? "read-only-input" : ""}
            readOnly={isViewOnly}
          />
        </Form.Item>
        <Form.Item
          label="Datum rodjenja"
          name="datumRodjenja"
          rules={[{ required: true, message: "Polje je obavezno" }]}
        >
          <DatePicker
            placeholder=""
            // locale={moment.locale()
            format="DD.MM.YYYY."
            disabled={isViewOnly}
            //  value={valuee}
            // onSelect={(data) => {}}
            onChange={(newValue) => {
              form.setFieldsValue({ datumRodjenja: newValue });
            }}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item
          label="Mjesto rodjenja:"
          name="mjestoRodjenjaOpstinaId"
          rules={[{ required: true, message: "Polje je obavezno" }]}
        >
          <Select disabled={isViewOnly}>
            {usersOpstina.map((e) => (
              <Select.Option key={e.id} value={e.id}>
                {e.naziv}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="ulicaIBroj"
          rules={[
            { required: true, message: "polje je obavezno" },
            { max: 255, message: "Maksimalan broj karaktera je 255" },
          ]}
          label={"Adresa stanovanja:"}
        >
          <Input
            className={isViewOnly ? "read-only-input" : ""}
            readOnly={isViewOnly}
          />
        </Form.Item>
        <Form.Item
          label="Mjesto stanovanja:"
          name="naseljenoMjestoId"
          rules={[{ required: true, message: "Polje je obavezno" }]}
        >
          <Select disabled={isViewOnly}>
            {usersMjesto.map((e) => (
              <Select.Option key={e.id} value={e.id}>
                {e.naziv}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Pol korisnika:"
          name="korisnikPolId"
          rules={[{ required: true, message: "Polje je obavezno" }]}
        >
          <Select disabled={isViewOnly}>
            {usersGender.map((e) => (
              <Select.Option key={e.id} value={e.id}>
                {e.naziv}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="brojLicneKarte"
          rules={[
            { required: true, message: "Polje je obavezno" },
            {
              message:
                "Polje mora imati 9 karaktera i može sadržavati samo velika slova i brojeve.",
              pattern: /^[A-Z0-9]{9}$/,
            },
          ]}
          label={"Broj licne karte:"}
        >
          <Input
            className={isViewOnly ? "read-only-input" : ""}
            readOnly={isViewOnly}
          />
        </Form.Item>
        <Form.Item
          label="Izdavaoc licne karte:"
          name="izdavaocLicneKarteOpstinaId"
          rules={[{ required: true, message: "Polje je obavezno" }]}
        >
          <Select disabled={isViewOnly}>
            {usersOpstina.map((e) => (
              <Select.Option key={e.id} value={e.id}>
                {e.naziv}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="jmbg"
          rules={[
            { required: true, message: "Polje je obavezno" },
            {
              pattern: /^[0-9]{13}$/,
              message: "JMBG mora imati 13 cifara",
            },
          ]}
          label={"JMBG:"}
        >
          <Input
            className={isViewOnly ? "read-only-input" : ""}
            readOnly={isViewOnly}
          />
        </Form.Item>
        <Form.Item
          label="Obrazovna ustanova:"
          name="obrazovnaUstanovaTipId"
          rules={[{ required: true, message: "Polje je obavezno" }]}
        >
          <Select
            disabled={isViewOnly}
            onChange={(value) => setUstanova(value)}
          >
            {usersUstanova.map((e) => (
              <Select.Option key={e.id} value={e.id}>
                {e.naziv}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="obrazovnaUstanova"
          rules={[
            { required: true, message: "Polje je obavezno" },
            { max: 250, message: "Maksimalan broj karaktera je 250" },
          ]}
          label={"Naziv obrazovne ustanove:"}
        >
          <Input
            className={isViewOnly ? "read-only-input" : ""}
            readOnly={isViewOnly}
          />
        </Form.Item>
        <Form.Item
          label="Obrazovna ustanova(mjesto):"
          name="ustanovaOpstinaId"
          rules={[{ required: true, message: "Polje je obavezno" }]}
        >
          <Select disabled={isViewOnly}>
            {usersOpstina.map((e) => (
              <Select.Option key={e.id} value={e.id}>
                {e.naziv}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="identifikator"
          rules={[
            { required: true, message: "Polje je obavezno" },
            { max: 45, message: "Maksimalan broj karaktera je 45" },
          ]}
          label={"Broj indeksa, radne ili djacke knjizice:"}
        >
          <Input
            className={isViewOnly ? "read-only-input" : ""}
            readOnly={isViewOnly}
          />
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
            max={
              ustanova && usersUstanova
                ? usersUstanova
                    .find((e2) => ustanova === e2.id)
                    .naziv.toLowerCase() === "fakultet"
                  ? 6
                  : 4
                : usersUstanova &&
                  user &&
                  usersUstanova
                    .find((e2) => user.obrazovnaUstanovaTipId === e2.id)
                    .naziv.toLowerCase() === "fakultet"
                ? 6
                : 4
            }
            readOnly={isViewOnly}
          />
        </Form.Item>
        <Form.Item
          name="brojTekucegRacuna"
          rules={[
            { required: true, message: "Polje je obavezno" },
            {
              pattern: /^[0-9]{1,16}$/,
              message: "Broj tekuceg racuna mora da ima maksimalno 16 cifara",
            },
          ]}
          label={"Broj tekuceg racuna:"}
        >
          <Input
            className={isViewOnly ? "read-only-input" : ""}
            readOnly={isViewOnly}
          />
        </Form.Item>
        <Form.Item
          name="brojTelefona"
          rules={[
            { required: true, message: "Polje je obavezno" },
            {
              pattern: /^[0-9+\-\\/\s]{1,16}$/,
              message: "Broj telefona može imati maksimalno 16 cifara",
            },
          ]}
          label={"Broj telefona:"}
        >
          <Input
            className={isViewOnly ? "read-only-input" : ""}
            readOnly={isViewOnly}
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Polje je obavezno" },
            {
              type: "email",
              message: "Email nije validan!",
            },
          ]}
          label={"Email:"}
        >
          <Input
            className={isViewOnly ? "read-only-input" : ""}
            readOnly={isViewOnly}
          />
        </Form.Item>
        <Form.Item
          name="brojClanskeKarte"
          rules={[{ required: true, message: "Polje je obavezno" }]}
          label={"Broj clanske karte:"}
        >
          <InputNumber
            style={{
              width: "100%",
            }}
            min="0"
            max="100000"
            readOnly={isViewOnly}
          />
        </Form.Item>
        <Form.Item
          label="Datum uclanjenja"
          name="datumUclanjenja"
          rules={[{ required: true, message: "Polje je obavezno" }]}
        >
          <DatePicker
            placeholder=""
            // locale={moment.locale()
            format="DD.MM.YYYY"
            disabled={isViewOnly}
            //  value={valuee}
            // onSelect={(data) => {}}
            onChange={(newValue) => {
              form.setFieldsValue({ datumUclanjenja: newValue });
            }}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
      </Form>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
        <Button
          type="default"
          onClick={() => onCancel()}
          style={{ marginRight: 8 }}
        >
          IZAĐI
        </Button>
        {!isViewOnly && (
          <Button type="primary" onClick={() => onSubmit()}>
            SAČUVAJ
          </Button>
        )}
      </div>
    </UsersModal1>
  );
};
UsersModal.propTypes = {
  editMode: PropTypes.bool,
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  confirmLoading: PropTypes.bool,
  user: PropTypes.object,
  isViewOnly: PropTypes.bool,
};

export default UsersModal;
