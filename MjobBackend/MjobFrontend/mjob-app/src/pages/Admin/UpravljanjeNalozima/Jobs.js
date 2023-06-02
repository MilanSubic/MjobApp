import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal, Table } from "antd";
import korisnikService from "../../../services/korisnik.service";
import moment from "moment";

const Jobs = (props) => {
  const { visible, onCancel, userId, confirmLoading } = props;
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    korisnikService.getUserJobs(userId).then((res) => {
      setJobs(res);
    });
  }, [userId]);
  const columns = [
    {
      title: "Narucilac",
      dataIndex: "narucilacNaziv",
    },
    {
      title: "Posao",
      dataIndex: "posaoTipNaziv",
    },
    {
      title: "Sadrzaj",
      dataIndex: "sadrzaj",
    },
    {
      title: "Mjesto",
      dataIndex: "mjesto",
    },
    {
      title: "Datum",
      dataIndex: "datum",
      render: (record) => {
        return moment(record).format("DD-MM-YYYY");
      },
    },
    {
      title: "Novcana naknada",
      dataIndex: "novcanaNaknadaTipNaziv",
    },
    {
      title: "Satnica",
      dataIndex: "satnica",
    },
  ];

  return (
    <Modal
      width={1000}
      destroyOnClose
      onCancel={() => onCancel()}
      visible={visible}
      confirmLoading={confirmLoading}
      footer={[]}
    >
      <Table columns={columns} dataSource={jobs}></Table>
    </Modal>
  );
};
Jobs.propTypes = {
  visible: PropTypes.bool,
  confirmLoading: PropTypes.bool,
  userId: PropTypes.object,
  onCancel: PropTypes.func,
};

export default Jobs;
