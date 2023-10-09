import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Select,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import "../styles/SingUp.css";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import OglasiService from "../services/OglasiService";
import OglasService from "../services/OglasService";
import PosaoTipService from "../services/posaoTipService";
import "./adForm.css";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setReload } from "../slices/oglasiSlice";

const AdForm = (initialData) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const formRef = useRef();
  const [novcanaNaknada, setNovcanaNaknada] = useState([]);
  const [tipoviPosla, setTipoviPosla] = useState([]);
  const [narucioci, setNarucioci] = useState([]);

  useEffect(() => {
    OglasiService.getNovcaneNaknade().then((res) => {
      setNovcanaNaknada(res.data);
      if (!initialData.editMode) {
        const kategPom = res.data.filter((tip) => {
          return tip.naziv === initialData.initialData.novcanaNaknadaTipNaziv;
        });
        formRef.current.setFieldsValue({
          novcanaNaknadaTipByNovcanaNaknadaTipId: kategPom[0].id,
        });
      }
    });
    OglasiService.getNarucioci().then((res) => {
      setNarucioci(res.data);
      if (!initialData.editMode) {
        const kategPom = res.data.filter((tip) => {
          return tip.naziv === initialData.initialData.narucilacNaziv;
        });
        formRef.current.setFieldsValue({
          narucilacByNarucilacId: kategPom[0].id,
        });
      }
    });
    PosaoTipService.getTipoviPosla().then((res) => {
      setTipoviPosla(res.data);
      if (!initialData.editMode) {
        const kategPom = res.data.filter((tip) => {
          return tip.naziv === initialData.initialData.posaoTipNaziv;
        });
        formRef.current.setFieldsValue({
          posaoTipByPosaoTipId: kategPom[0].id,
        });
      }
    });
    if (initialData.initialData) {
      form.setFieldsValue(initialData.initialData);
      form.setFieldsValue({
        aktivanDo: dayjs(
          initialData.initialData.aktivanDo?.toString(),
          "YYYY-MM-DDTHH:mm:ss.SSSZ"
        ),
        datum: dayjs(
          initialData.initialData.datum?.toString(),
          "YYYY-MM-DDTHH:mm:ss.SSSZ"
        ),
      });
    }
  }, []);
  const disabledDate = (current) => {
    return current && current < moment().startOf("day");
  };
  const onFinish = (values) => {
    if (!initialData?.initialData) {
      OglasService.creatad(values).then((res) => {
        form.resetFields();
        navigate("/home", { replace: true });
      });
    } else sacuvajIzmjene();
  };

  const dispatch = useDispatch();

  const sacuvajIzmjene = () => {
    form.validateFields().then((values) => {
      OglasService.update(initialData.id, values)
        .then((res) => {
          message.success("Uspjesna izmjena");
          dispatch(setReload(res));
        })
        .catch((err) => {
          console.error(err);
          message.error("Doslo je do greske prilikom izmjene");
        });
    });
  };
  return (
    <Form
      form={form}
      name="creatad"
      labelCol={{ span: 6 }}
      labelWrap
      labelAlign="left"
      onFinish={onFinish}
      wrapperCol={{ span: 16 }}
      autoComplete="off"
      ref={formRef}
      disabled={!initialData.editMode}
    >
      <Form.Item
        label="Tip posla"
        name="posaoTipByPosaoTipId"
        rules={[{ required: true, message: "Polje je obavezno" }]}
      >
        <Select>
          {tipoviPosla.map((e) => (
            <Select.Option key={e.id} value={e.id}>
              {e.naziv}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Mjesto"
        name="mjesto"
        rules={[{ required: true, message: "Polje je obavezno" }]}
      >
        <Input className="input" />
      </Form.Item>
      {initialData.editMode === false && (
        <Form.Item
          label="Datum objave"
          name="datum"
          rules={[{ required: true, message: "Polje je obavezno" }]}
        >
          <DatePicker
            className="input"
            placeholder=""
            format="DD.MM.YYYY."
            style={{
              width: "100%",
            }}
            disabledDate={disabledDate}
          />
        </Form.Item>
      )}
      <Form.Item
        label="Aktivan do datuma"
        name="aktivanDo"
        rules={[{ required: true, message: "Polje je obavezno" }]}
      >
        <DatePicker
          className="input"
          placeholder=""
          format="DD.MM.YYYY."
          style={{
            width: "100%",
          }}
          disabledDate={disabledDate}
        />
      </Form.Item>
      <Form.Item
        label="Potreban broj ljudi"
        name="brojLjudi"
        rules={[{ required: true, message: "Polje je obavezno" }]}
      >
        <InputNumber
          className="input"
          style={{ width: "100%" }}
          min="1"
          max="100"
        />
      </Form.Item>

      <Form.Item
        label="Satnica"
        name="satnica"
        rules={[{ required: true, message: "Polje je obavezno" }]}
      >
        <InputNumber
          className="input"
          style={{ width: "100%" }}
          step="0.1"
          min="0.00"
          max="1000.00"
          precision={2}
        />
      </Form.Item>

      <Form.Item
        label="Tip novčane naknade"
        name="novcanaNaknadaTipByNovcanaNaknadaTipId"
        rules={[{ required: true, message: "Polje je obavezno" }]}
      >
        <Select>
          {novcanaNaknada.map((e) => (
            <Select.Option key={e.id} value={e.id}>
              {e.naziv}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Naručilac"
        name="narucilacByNarucilacId"
        rules={[{ required: true, message: "Polje je obavezno" }]}
      >
        <Select>
          {narucioci.map((e) => (
            <Select.Option key={e.id} value={e.id}>
              {e.naziv}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Sadržaj"
        name="sadrzaj"
        rules={[{ required: true, message: "Polje je obavezno" }]}
      >
        <Input.TextArea className="input" />
      </Form.Item>
      <Form.Item label="Napomena" name="napomena">
        <Input.TextArea className="input" />
      </Form.Item>
      {initialData.initialData === null && (
        <Form.Item wrapperCol={{ offset: 11, span: 10 }}>
          <Button type="primary" htmlType="submit">
            Sačuvaj
          </Button>
        </Form.Item>
      )}
      {initialData.initialData !== null && initialData.editMode === true && (
        <div style={{ textAlign: "right" }}>
          <Button
            style={{ float: "right", marginLeft: "5px" }}
            onClick={initialData.onCancel}
          >
            IZAĐI
          </Button>
          <Button
            style={{
              backgroundColor: "blue",
              color: "white",
              paddingRight: "10px",
            }}
            htmlType="submit"
          >
            SAČUVAJ
          </Button>
        </div>
      )}
    </Form>
  );
};
AdForm.propTypes = {
  initialData: PropTypes.object,
  editMode: PropTypes.bool,
  id: PropTypes.number,
  onCancel: PropTypes.func,
};
export default AdForm;
