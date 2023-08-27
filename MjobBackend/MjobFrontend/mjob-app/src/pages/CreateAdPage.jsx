import { Button, Card, DatePicker, Form, Input, InputNumber,Checkbox } from "antd";
import React from "react";
import "../styles/SingUp.css";
import { CustomSelect } from "../components/Select";
import BasicService from "../services/BasicService";
import { creatad } from "../services/OglasService";
import { useNavigate } from "react-router-dom";


export const CreatAdPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    creatad(values).then((res) => {
      form.resetFields();
      navigate("/login", { replace: true });
    });
  };
  const httpService = BasicService.service();
  const selectColumns = [
    {
      title: "Naziv",
      dataIndex: "naziv",
      sorter: true,
    },
  ];
  const display = (e) => e?.naziv;
 
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    form.setFieldValue('javni',!checked);
    setChecked(!checked);
  };



 return (
    <div className="container">
      <Card className="card" title="Kreiraj oglas">
        <Form
          form={form}
          name="creatad"
          labelCol={{ span: 6 }}
          labelWrap
          labelAlign="left"
          onFinish={onFinish}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="Sadrzaj"
            name="sadrzaj"
            rules={[{ required: true, message: "Polje je obavezno" }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Satnica"
            name="satnica"
            rules={[{ required: true, message: "Polje je obavezno" }]}
          >
            <InputNumber
              style={{
                width: "100%",
              }}
              step="0.1"
              min="0.00"
              max="1000.00"
              precision={2}
            />
          </Form.Item>

          <Form.Item
            label="Tip novcane naknade"
            name="tipNovcaneNaknade"
            rules={[{ required: true, message: "Polje je obavezno" }]}
          >
            <CustomSelect
              columns={selectColumns}
              api="/api/oglas/novcanaNaknadaTip"
              httpService={httpService}
              keyProp="id"
              display={display}
              entityKey="id"
              parent={form}
              itemName="novcanaNaknadaTipByNovcanaNaknadaTipId"
            />
          </Form.Item>
          <Form.Item name="novcanaNaknadaTipByNovcanaNaknadaTipId" hidden={true}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Tip posla"
            name="tipPosla"
            rules={[{ required: true, message: "Polje je obavezno" }]}
          >
            <CustomSelect
              columns={selectColumns}
              api="/api/oglas/tipoviPoslova"
              httpService={httpService}
              keyProp="id"
              display={display}
              entityKey="id"
              parent={form}
              itemName="posaoTipByPosaoTipId"
            />
          </Form.Item>
          <Form.Item name="posaoTipByPosaoTipId" hidden={true}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Mjesto"
            name="mjesto"
            rules={[{ required: true, message: "Polje je obavezno" }]}
          >
            <Input />
             </Form.Item>

          <Form.Item
            label="Potreban broj ljudi"
            name="brojLjudi"
            rules={[{ required: true, message: "Polje je obavezno" }]}
          >
            <InputNumber
              style={{
                width: "100%",
              }}
              min="1"
              max="100"
            />
          </Form.Item>

          <Form.Item
            label="Aktivan do datuma"
            name="aktivanDo"
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
            label="Narucilac"
            name="narucilac"
            rules={[{ required: true, message: "Polje je obavezno" }]}
          >
            <CustomSelect
              columns={selectColumns}
              api="/api/oglas/narucioci"
              httpService={httpService}
              keyProp="id"
              display={display}
              entityKey="id"
              parent={form}
              itemName="narucilacByNarucilacId"
            />
          </Form.Item>
          <Form.Item name="narucilacByNarucilacId" hidden={true}>
            <Input />
          </Form.Item>

          <Form.Item label="Napomena" 
          name="napomena">
            <Input.TextArea />
          </Form.Item>

          <Form.Item name="javni">
            <Checkbox name="javni"
            value={checked} 
            defaultChecked={false}
            onChange={handleChange}>Da li je oglas javni?</Checkbox>
            
          </Form.Item>
       
          <Form.Item wrapperCol={{ offset: 10, span: 10 }} >
            <Button type="primary" htmlType="submit" >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
