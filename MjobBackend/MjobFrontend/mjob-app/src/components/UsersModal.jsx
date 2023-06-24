import React, { useEffect, useState } from "react";
import {
  Form,
  Modal,
  Input,
  InputNumber,
  DatePicker,
  Select,
  Checkbox,
} from "antd";
import PropTypes from "prop-types";
import dayjs from "dayjs";
// import moment from "moment";
// import "moment/locale/en-gb";
import styled from "styled-components";
// import "moment-timezone";
import KorisnikPolService from "../services/KorisnikPolService";
import KorisnikTip1Service from "../services/KorisnikTip1Service";
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
  const { editMode, visible, onOk, onCancel, confirmLoading, user } = props;
  const [form] = Form.useForm();
  const [usersGender, setUsersGender] = useState([]);
  const [usersTip, setUsersTip] = useState([]);
  const [usersOpstina, setUsersOpstina] = useState([]);
  const [usersMjesto, setUsersMjesto] = useState([]);
  const [usersUstanova, setUsersUstanova] = useState([]);

  // const [switchValue, setSwitchValue] = useState(false);
  // const [valuee, setValuee] = useState(false);

  const onSubmit = () => {
    form.validateFields().then((values) => {
      onOk({ ...user, ...values });
    });
  };
  useEffect(() => {
    console.log("useEffect:");

    if (user) {
      // console.log("value: ", switchValue);
      form.setFieldsValue(user);
      const convertedValue = !!user.osiguranjeZadruga;

      // setSwitchValue(convertedValue);

      console.log("convertedValue+: ", convertedValue);
      console.log("value+: ", user.osiguranjeZadruga);
      form.setFieldsValue({
        osiguranjeZadruga: convertedValue,
      });
      console.log("value+: ", user.osiguranjeZadruga);

      form.setFieldsValue({
        datumRodjenja: dayjs(
          user.datumRodjenja.toString(),
          "YYYY-MM-DDTHH:mm:ss.SSSZ"
        ),
      });
      form.setFieldsValue({
        datumUclanjenja: dayjs(
          user.datumUclanjenja.toString(),
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
    KorisnikTip1Service.getAll().then((res) => setUsersTip(res.data));
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
      title={editMode ? "edituj" : "dodaj"}
      okText={"Sacuvaj"}
      cancelText={"Izadji"}
      onOk={() => onSubmit()}
      destroyOnClose
      onCancel={() => onCancel()}
      visible={visible}
      confirmLoading={confirmLoading}
    >
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        labelAlign="left"
      >
        <Form.Item
          name="ime"
          rules={[{ required: true, message: "Polje je obavezno" }]}
          label={"Ime:"}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="prezime"
          rules={[{ required: true, message: "Polje je obavezno" }]}
          label={"Prezime:"}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="imeRoditelja"
          rules={[{ required: true, message: "Polje je obavezno" }]}
          label={"Ime Roditelja:"}
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
            // locale={moment.locale()
            format="MMM DD YYYY"
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
          name="jmbg"
          rules={[{ required: true, message: "Polje je obavezno" }]}
          label={"jmbg:"}
        >
          <Input />
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
          />
        </Form.Item>
        <Form.Item
          name="brojLicneKarte"
          rules={[{ required: true, message: "Polje je obavezno" }]}
          label={"Broj licne karte:"}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="brojTelefona"
          rules={[{ required: true, message: "Polje je obavezno" }]}
          label={"Broj telefona:"}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="brojTekucegRacuna"
          rules={[{ required: true, message: "Polje je obavezno" }]}
          label={"Broj tekuceg racuna:"}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="obrazovnaUstanova"
          rules={[{ required: true, message: "Polje je obavezno" }]}
          label={"Obrazovna ustanova:"}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="identifikator"
          rules={[{ required: true, message: "Polje je obavezno" }]}
          label={"Broj indeksa, radne ili djacke knjizice:"}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Polje je obavezno" }]}
          label={"Email:"}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Datum uclanjenja"
          name="datumUclanjenja"
          rules={[{ required: true, message: "Polje je obavezno" }]}
        >
          <DatePicker
            placeholder=""
            // locale={moment.locale()
            format="MMM DD YYYY"
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
        <Form.Item
          name="korisnickoIme"
          rules={[{ required: true, message: "Polje je obavezno" }]}
          label={"Korisnicko ime:"}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Pol korisnika:"
          name="korisnikPolNaziv"
          rules={[{ required: true, message: "Polje je obavezno" }]}
        >
          <Select>
            {usersGender.map((e) => (
              <Select.Option key={e.id} value={e.id}>
                {e.naziv}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Tip korisnika:"
          name="korisnikTipNaziv"
          rules={[{ required: true, message: "Polje je obavezno" }]}
        >
          <Select>
            {usersTip.map((e) => (
              <Select.Option key={e.id} value={e.id}>
                {e.naziv}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Mjesto rodjenja opstina:"
          name="mjestoRodjenjaOpstinaNaziv"
          rules={[{ required: true, message: "Polje je obavezno" }]}
        >
          <Select>
            {usersOpstina.map((e) => (
              <Select.Option key={e.id} value={e.id}>
                {e.naziv}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Naseljeno mjesto:"
          name="naseljenoMjestoNaziv"
          rules={[{ required: true, message: "Polje je obavezno" }]}
        >
          <Select>
            {usersMjesto.map((e) => (
              <Select.Option key={e.id} value={e.id}>
                {e.naziv}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Izdavaoc licne karte opstina:"
          name="izdavaocLicneKarteOpstinaNaziv"
          rules={[{ required: true, message: "Polje je obavezno" }]}
        >
          <Select>
            {usersOpstina.map((e) => (
              <Select.Option key={e.id} value={e.id}>
                {e.naziv}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Obrazovna ustanova:"
          name="obrazovnaUstanova"
          rules={[{ required: true, message: "Polje je obavezno" }]}
        >
          <Select>
            {usersUstanova.map((e) => (
              <Select.Option key={e.id} value={e.id}>
                {e.naziv}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="ulicaIBroj"
          rules={[{ required: true, message: "polje je obavezno" }]}
          label={"Ulica i broj:"}
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
            max="7"
          />
        </Form.Item>
        <Form.Item
          name="smijer"
          rules={[{ required: true, message: "polje je obavezno" }]}
          label={"Smijer:"}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="brojZdravstveneKnjizice"
          rules={[{ required: true, message: "polje je obavezno" }]}
          label={"Broj zdravstvene knjizice:"}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Osiguranje zadruga:"
          name="osiguranjeZadruga"
          rules={[{ required: true, message: "polje je obavezno" }]}
        >
          <Checkbox>Osiguranje zadruga:</Checkbox>
        </Form.Item>
        <Form.Item
          name="brojMobilogTelefona"
          rules={[{ required: true, message: "polje je obavezno" }]}
          label={"Broj mobilog telefona:"}
        >
          <Input />
        </Form.Item>
      </Form>
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
};

export default UsersModal;
