import React, { useRef, useState } from "react";
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
  valueId = undefined,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
  });
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState();

  const onClick = () => {
    getData(pagination);
    setLoading(!loading);
    setOpen(true);
  };

  const searchInput = useRef(null);

  const getFieldsToSort = (sorters) => {
    if (!sorters || !sorters.field) return undefined;
    const direction = sorters.order === "ascend" ? "ASC" : "DESC";
    return { property: sorters.field, direction };
  };

  /* useEffect(() => {
    getData(pagination);
  }, [loading]); */

  const getData = (pagination, filter = null, sorters = null) => {
    const sort = getFieldsToSort(sorters);
    httpService
      .post(`${api}`, {
        current: pagination.current - 1,
        pageSize: pagination.pageSize,
        property: sort?.property,
        direction: sort?.direction,
        filter,
      })
      .then((res) => {
        setData(res.data.content);
        setPagination({ ...pagination, total: res.data.totalElements });
      });
  };

  const onTableChange = (pagination, tblfilter, sorters) =>
    getData(pagination, filter, sorters);

  const rowSelection = {
    type: multiple ? "checkbox" : "radio",
    onChange: (selectedRowKeys, selectedRows) => {
      setSelected(selectedRows);
    },
  };

  const onSelect = () => {
    setOpen(false);
    const v = multiple ? selected : selected[0];
    onChange(v);
    if (parent && itemName && entityKey) {
      valueId = Array.isArray(v) ? v.map((e) => e[entityKey]) : v[entityKey];
      parent.setFieldValue(
        itemName,
        Array.isArray(v) ? v.map((e) => e[entityKey]) : v[entityKey]
      );
    }
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setFilter();
    getData(pagination);
  };

  const handleFilter = (dataIndex, value) => {
    const obj = {};
    obj[dataIndex] = value;
    setFilter(obj);
    getData(pagination, filter);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Pretaži ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
            if (e.target.value) {
              const obj = {};
              obj[dataIndex] = e.target.value;
              setFilter(obj);
            }
          }}
          onPressEnter={() => {
            handleFilter(dataIndex, selectedKeys[0]);
          }}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => {
              handleFilter(dataIndex, selectedKeys[0]);
            }}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Traži
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Resetuj
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => text,
  });

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
          readOnly={true}
        />
        <Button type="primary" onClick={onClick}>
          <SearchOutlined />
        </Button>
      </Space.Compact>

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        onOk={(v) => onSelect()}
        cancelText="Zatvori"
        okText="Izaberi"
        okButtonProps={{ disabled: !selected || selected?.length < 1 }}
      >
        <Table
          columns={columns.map((c) => {
            return { ...c, ...getColumnSearchProps(c.dataIndex) };
          })}
          rowKey={keyProp}
          dataSource={data}
          onChange={onTableChange}
          pagination={pagination}
          rowSelection={rowSelection}
          style={{
            marginTop: "20px",
          }}
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
  valueId: PropTypes.any,
};
