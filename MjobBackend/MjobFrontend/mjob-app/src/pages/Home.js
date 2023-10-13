import React, { useState, useEffect } from "react";
import { Button, InputNumber, Select } from "antd";
import CustomCard from "../components/CustomCard";
import oglasService from "../services/OglasService";

import OpstinaService from "../services/OpstinaService";
import posaoTipService from "../services/posaoTipService";
import { useDispatch, useSelector } from "react-redux";
import { setOglasi } from "../slices/oglasiSlice";

import "../styles/Home.css";

export default function Home() {
  const [current, setCurrent] = useState(1);
  const [pageSize] = useState(8);
  const [requestData, setRequestData] = useState({
    current: current - 1,
    pageSize,
    direction: null,
    property: null,
    filter: {},
  });
  const [total, setTotal] = useState(0);
  const [opstine, setOpstine] = useState([]);
  const [jobs, setJobs] = useState([]);

  const oglasi = useSelector((state) => state.oglasi.value);
  const reload = useSelector((state) => state.oglasi.reload);

  const dispatch = useDispatch();

  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  const toggleFilter = () => {
    setIsFilterExpanded(!isFilterExpanded);
  };

  const loadPosts = () => {
    oglasService.getAll(requestData).then((result) => {
      dispatch(setOglasi(result.data.content));
      setTotal(result.data.totalPages);
    });
  };

  const loadOpstina = () => {
    OpstinaService.getAll().then((result) => {
      setOpstine(result.data);
    });
  };

  const loadJobs = () => {
    posaoTipService.getTipoviPosla().then((result) => {
      setJobs(result.data);
    });
  };

  useEffect(() => {
    loadOpstina();
    loadJobs();
  }, []);

  useEffect(() => {
    loadPosts();
  }, [requestData, reload]);

  const onChangePage = (currentPage, pageSize) => {
    setCurrent(currentPage);
    setRequestData({ ...requestData, current: currentPage - 1 });
  };

  const [mjesto, setMjesto] = useState();
  function handleMjestoChange(event) {
    setMjesto(event);
  }

  const [direction, setDirection] = useState();
  function handleSortChange(event) {
    // eslint-disable-next-line eqeqeq
    setDirection(event);
  }

  const [posaoTip, setPosaoTip] = useState();
  function handleJobChange(event) {
    setPosaoTip(event);
  }

  const [min, setMin] = useState();
  function handleMinimumChange(event) {
    setMin(event);
  }

  const [max, setMax] = useState();
  function handleMaksimumChange(event) {
    setMax(event);
  }

  const change = (e) => {
    setRequestData({
      current: 0,
      pageSize,
      filter: {
        min,
        max,
        mjesto,
        posaoTip,
      },
      direction,
      property: "datum",
    });
  };

  return (
    <div className="data-div" style={{ display: "flex" }}>
      <div className="content-div" style={{ padding: 40, paddingRight: 10 }}>
        <div className="cards-div">
          {oglasi.map((o) => (
            <CustomCard
              id={o.id}
              post={o}
              mjesto={o.mjesto}
              datum={o.datum}
              brojLjudi={o.brojLjudi}
              satnica={o.satnica}
              posaoNaziv={o.posaoTipNaziv}
              key={o.id}
            />
          ))}
        </div>
        <div
          style={{
            width: "92%",
            display: "flex",
            justifyContent: "center",
            columnGap: "40px",
            padding: 20,
          }}
        >
          <Button
            disabled={current === 1}
            onClick={() => onChangePage(current - 1)}
          >
            Prethodna
          </Button>
          <Button
            disabled={current >= total}
            onClick={() => onChangePage(current + 1)}
          >
            Sledeća
          </Button>
        </div>
      </div>
      <div
        className={`filter-container ${isFilterExpanded ? "expanded" : ""}`}
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
        }}
      >
        <button className="filter-button" onClick={toggleFilter}>
          {"<"}
        </button>

        <div
          className="mjestoFilter"
          style={{
            display: "flex",
            justifyContent: "space-between",
            columnGap: 40,
            paddingTop: 40,
            paddingLeft: 0,
            paddingBottom: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              alignContent: "center",
              height: "25px",
              padding: 5,
            }}
          >
            <b>Mjesto:</b>
          </div>
          <div style={{ display: "flex", paddingRight: 5 }}>
            <Select
              className="selectMjesto"
              name="category-list"
              id="category-list"
              onChange={handleMjestoChange}
              value={mjesto}
              style={{ width: "170px" }}
            >
              <option>Izaberite</option>
              {opstine.map((opstina) => (
                <option key={opstina.id} value={opstina.naziv}>
                  {opstina.naziv}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <div
          className="posaoFilter"
          style={{
            display: "flex",
            justifyContent: "space-between",
            columnGap: 30,
            paddingTop: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              alignContent: "center",
              height: "25px",
              padding: 5,
              paddingRight: 0,
            }}
          >
            <b>Tip posla:</b>
          </div>
          <div style={{ display: "flex", paddingRight: 5 }}>
            <Select
              className="selectPosao"
              name="category-list"
              id="category-list"
              mode="multiple"
              onChange={handleJobChange}
              value={posaoTip}
              style={{ width: "170px" }}
            >
              {jobs.map((job) => (
                <option key={job.id} value={job.naziv}>
                  {job.naziv}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div
          className="SatnicaMinimumFilter"
          style={{
            display: "flex",
            columnGap: 10,
            paddingTop: 25,
            paddingBottom: 15,
            paddingRight: 45,
          }}
        >
          <div style={{ paddingRight: 30 }}>
            <b>Minimalna satnica: </b>
          </div>
          <div style={{ display: "flex", height: "20px" }}>
            <InputNumber
              onChange={handleMinimumChange}
              style={{ width: "100px", height: "25px" }}
            ></InputNumber>
          </div>
          <div>
            <b>KM</b>
          </div>
        </div>
        <div
          className="SatnicaMaksimumFilter"
          style={{
            display: "flex",
            columnGap: 10,
            paddingTop: 0,
            paddingBottom: 15,
            paddingRight: 45,
          }}
        >
          <div style={{ paddingRight: 20 }}>
            <b>Maksimalna satnica: </b>
          </div>
          <div style={{ display: "flex", height: "20px" }}>
            <InputNumber
              onChange={handleMaksimumChange}
              style={{ width: "100px", height: "25px" }}
            ></InputNumber>
          </div>
          <div>
            <b>KM</b>
          </div>
        </div>

        <div
          className="sortirajLabel"
          style={{
            display: "flex",
            alignContent: "center",
            height: "25px",

            padding: 5,
            paddingTop: 20,
          }}
        >
          <b>Sortiraj oglase</b>
        </div>
        <div className="sortirajSelect" style={{ display: "flex" }}>
          <Select
            className="selectSort"
            name="selectSort"
            id="category-listSort"
            style={{ width: "170px" }}
            onChange={handleSortChange}
            value={direction}
          >
            <option key={1} value={"ASC"}>
              Najnoviji
            </option>
            <option key={2} value={"DESC"}>
              Najstariji
            </option>
          </Select>
        </div>
        <div className="filtrirajButton" style={{ display: "flex" }}>
          <div style={{ marginTop: 10 }}>
            <Button onClick={change}>Filtriraj</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
