import React, { useState } from "react";
import { Button, Input, Modal, Space, Table } from "antd";
import PropTypes from "prop-types";
import { SearchOutlined } from "@ant-design/icons";

export const CustomSelect = ({
  columns,
  keyProp = "id",
  httpService,
  api,
  value,
  onChange,
  multiple = false,
  display,
  entityKey = undefined,
  parent = undefined,
  itemName = undefined,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 2,
  });
  const [data, setData] = useState([]);

  const onClick = () => {
    getData(pagination);
    setLoading(!loading);
    setOpen(true);
  };

  const getFieldsToSort = (sorters) => {
    if (!sorters || !sorters.field) return "";
    const direction = sorters.order === "ascend" ? "ASC" : "DESC";
    return `&sort=${sorters.field},${direction}`;
  };

  /* useEffect(() => {
    getData(pagination);
  }, [loading]); */

  const getData = (pagination, filter = null, sorters = null) => {
    httpService
      .get(
        `${api}?page=${pagination.current - 1}&size=${
          pagination.pageSize
        }${getFieldsToSort(sorters)}`
      )
      .then((res) => {
        setData(res.data.content);
        setPagination({ ...pagination, total: res.data.totalElements });
      });
  };

  const onTableChange = (pagination, filter, sorters) =>
    getData(pagination, filter, sorters);

  const rowSelection = {
    type: multiple ? "checkbox" : "radio",
    onChange: (selectedRowKeys, selectedRows) => {
      const v = multiple ? selectedRows : selectedRows[0];
      onChange(v);
      if (parent && itemName && entityKey)
        parent.setFieldValue(
          itemName,
          Array.isArray(v) ? v.map((e) => e[entityKey]) : v[entityKey]
        );
    },
  };

  return (
    <>
      <Space.Compact
        style={{
          width: "100%",
        }}
      >
        <Input
          value={
            Array.isArray(value)
              ? value.map((e) => display(e)).join(", ")
              : display(value)
          }
        />
        <Button type="primary" onClick={onClick}>
          <SearchOutlined />
        </Button>
      </Space.Compact>

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        onOk={(v) => setOpen(false)}
        cancelText="Zatvori"
        okText="Izaberi"
      >
        <Table
          columns={columns}
          rowKey={keyProp}
          dataSource={data}
          onChange={onTableChange}
          pagination={pagination}
          rowSelection={rowSelection}
        ></Table>
      </Modal>
    </>
  );
};

CustomSelect.propTypes = {
  columns: PropTypes.array,
  keyProp: PropTypes.any,
  httpService: PropTypes.any,
  api: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  multiple: PropTypes.bool,
  display: PropTypes.func,
  entityKey: PropTypes.string,
  parent: PropTypes.any,
  itemName: PropTypes.string,
};
