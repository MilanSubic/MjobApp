import React, { useState, useEffect } from "react";
import { Button, Select } from "antd";
import CustomCard from "../components/CustomCard";
import oglasService from "../services/OglasService";

import OpstinaService from "../services/OpstinaService";
import posaoTipService from "../services/posaoTipService";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postsSize, setPostsSize] = useState(0);
  const [currentPosts, setCurrentPosts] = useState([]);

  const [selectedMjesto, setSelectedMjesto] = useState("");
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [selectedSort, setSelectedSort] = useState("");
  const [minimum, setMinimum] = useState("");
  const [maksimum, setMaksimum] = useState("");
  const [opstine, setOpstine] = useState([]);
  const [jobs, setJobs] = useState([]);

  const navigate = useNavigate();

  const loadPosts = () => {
    setPageSize(8);
    setCurrentPage(1);
    oglasService.getAll().then((result) => {
      setPosts(result.data);
      setPostsSize(result.data.length);
      setIsLoaded(true);
      setCurrentPosts(
        result.data.slice(
          currentPage * pageSize - pageSize,
          currentPage * pageSize
        )
      );
    });
  };

  const loadCurrentPosts = () => {
    console.log("selectedsort " + selectedSort);
    if (selectedSort === "1")
      setCurrentPosts(
        [].concat(getFilteredByMjesto()).sort((date1, date2) => {
          if (date1.datum > date2.datum) {
            console.log("111111111111111111111");
            return -1;
          } else if (date1.datum < date2.datum) return 1;
          else return 0;
        })
      );
    else {
      console.log("duzina   " + getFilteredByMjesto().length);
      setCurrentPosts(
        [].concat(getFilteredByMjesto()).sort((date1, date2) => {
          if (date2.datum > date1.datum) {
            return -1;
          } else if (date2.datum < date1.datum) return 1;
          else return 0;
        })
      );
    }

    setPageSize(8);
    setCurrentPage(1);
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
    const reloadCount = parseInt(sessionStorage.getItem("reloadCount"));
    if (reloadCount < 2) {
      sessionStorage.setItem("reloadCount", String(reloadCount + 1));
      window.location.reload();
    }
    loadOpstina();
    loadJobs();
    loadPosts();

    console.log("fnfn");
    navigate("/home");
  }, []);

  useEffect(() => {
    console.log("22222222222222");
    setCurrentPosts(
      posts.slice(currentPage * pageSize - pageSize, currentPage * pageSize)
    );
  }, [isLoaded]);

  useEffect(() => {
    handleSubmit();
    console.log("pozvano");
  }, [minimum]);

  useEffect(() => {
    handleSubmit();
    console.log("pozvano2");
  }, [maksimum]);

  useEffect(() => {
    handleSubmit();
    console.log("pozvano3");
  }, [selectedMjesto]);

  useEffect(() => {
    handleSubmit();
    console.log("pozvano5");
  }, [selectedSort]);

  useEffect(() => {
    handleSubmit();
    console.log("pozvano4");
  }, [selectedJobs]);

  useEffect(() => {
    setCurrentPosts(
      posts.slice(currentPage * pageSize - pageSize, currentPage * pageSize)
    );
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
    console.log("promjena STRANE" + newPage);
  };

  function handleMjestoChange(event) {
    setSelectedMjesto(event);
  }

  function handleSortChange(event) {
    setSelectedSort(event);
  }
  function handleJobChange(event) {
    setSelectedJobs(event);
  }

  function handleMinimumChange(event) {
    setMinimum(event.target.value);
  }

  function handleMaksimumChange(event) {
    setMaksimum(event.target.value);
  }

  function getFilteredByMjesto() {
    if (selectedJobs.length === 0) {
      if (
        (selectedMjesto === null ||
          selectedMjesto === "" ||
          selectedMjesto === "Izaberite") &&
        minimum === "" &&
        maksimum === ""
      ) {
        return posts;
      }
      if (
        (selectedMjesto === null ||
          selectedMjesto === "" ||
          selectedMjesto === "Izaberite") &&
        minimum !== "" &&
        maksimum !== ""
      ) {
        console.log("2" + selectedMjesto);
        return posts.filter(
          (item) => item.satnica >= minimum && item.satnica <= maksimum
        );
      }
      if (
        (selectedMjesto === null ||
          selectedMjesto === "" ||
          selectedMjesto === "Izaberite") &&
        minimum !== "" &&
        maksimum === ""
      ) {
        console.log("2" + selectedMjesto);
        return posts.filter((item) => item.satnica >= minimum);
      }
      if (
        (selectedMjesto === null ||
          selectedMjesto === "" ||
          selectedMjesto === "Izaberite") &&
        minimum === "" &&
        maksimum !== ""
      ) {
        console.log("2" + selectedMjesto);
        return posts.filter((item) => item.satnica <= maksimum);
      }
      if (minimum === "" && maksimum === "") {
        return posts.filter((item) => item.mjesto === selectedMjesto);
      }
      if (minimum === "" && maksimum !== "") {
        return posts.filter(
          (item) => item.mjesto === selectedMjesto && item.satnica <= maksimum
        );
      }
      if (minimum !== "" && maksimum === "") {
        return posts.filter(
          (item) => item.mjesto === selectedMjesto && item.satnica >= minimum
        );
      } else {
        console.log("3 " + selectedMjesto + minimum + maksimum);
        return posts.filter(
          (item) =>
            item.mjesto === selectedMjesto &&
            item.satnica >= minimum &&
            item.satnica <= maksimum
        );
      }
    } else {
      if (
        (selectedMjesto === null ||
          selectedMjesto === "" ||
          selectedMjesto === "Izaberite") &&
        minimum === "" &&
        maksimum === ""
      ) {
        console.log(selectedJobs);

        return posts.filter((item) => jobCondition(item));
      }
      if (
        (selectedMjesto === null ||
          selectedMjesto === "" ||
          selectedMjesto === "Izaberite") &&
        minimum !== "" &&
        maksimum !== ""
      ) {
        console.log("2" + selectedMjesto);
        return posts.filter(
          (item) =>
            item.satnica >= minimum &&
            item.satnica <= maksimum &&
            jobCondition(item)
        );
      }
      if (
        (selectedMjesto === null ||
          selectedMjesto === "" ||
          selectedMjesto === "Izaberite") &&
        minimum !== "" &&
        maksimum === ""
      ) {
        console.log("2" + selectedMjesto);
        return posts.filter(
          (item) => item.satnica >= minimum && jobCondition(item)
        );
      }
      if (
        (selectedMjesto === null ||
          selectedMjesto === "" ||
          selectedMjesto === "Izaberite") &&
        minimum === "" &&
        maksimum !== ""
      ) {
        console.log("2" + selectedMjesto);
        return posts.filter(
          (item) => item.satnica <= maksimum && jobCondition(item)
        );
      }
      if (minimum === "" && maksimum === "") {
        return posts.filter(
          (item) => item.mjesto === selectedMjesto && jobCondition(item)
        );
      }
      if (minimum === "" && maksimum !== "") {
        return posts.filter(
          (item) =>
            item.mjesto === selectedMjesto &&
            item.satnica <= maksimum &&
            jobCondition(item)
        );
      }
      if (minimum !== "" && maksimum === "") {
        return posts.filter(
          (item) =>
            item.mjesto === selectedMjesto &&
            item.satnica >= minimum &&
            jobCondition(item)
        );
      } else {
        console.log("3 " + selectedMjesto + minimum + maksimum);
        return posts.filter(
          (item) =>
            item.mjesto === selectedMjesto &&
            item.satnica >= minimum &&
            item.satnica <= maksimum &&
            jobCondition(item)
        );
      }
    }
  }

  function jobCondition(item) {
    // eslint-disable-next-line no-unreachable-loop
    if (
      item.posaoTipNaziv === selectedJobs[0] ||
      item.posaoTipNaziv === selectedJobs[1] ||
      item.posaoTipNaziv === selectedJobs[2] ||
      item.posaoTipNaziv === selectedJobs[3] ||
      item.posaoTipNaziv === selectedJobs[4]
    )
      return true;
    else return false;
  }

  const handleSubmit = () => {
    loadCurrentPosts();
    setPostsSize(currentPosts.length);
    console.log("broj postova" + currentPosts.length);
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ padding: 40, paddingRight: 10, width: "80%" }}>
        <div
          style={{
            display: "grid",

            gridTemplateColumns: "repeat(4, 1fr)",
            gridGap: "20px",
          }}
        >
          {currentPosts.map((post) => (
            <CustomCard
              id={post.id}
              posaoNaziv={post.posaoTipNaziv}
              key={post.id}
            />
          ))}
          {Array(Math.max(0, 4 - currentPosts.length))
            .fill()
            .map((_, i) => (
              <div key={i} />
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
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Prethodna
          </Button>
          <Button
            disabled={currentPage * pageSize >= postsSize}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Sledeća
          </Button>
        </div>
      </div>
      <div
        className="filter-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
        }}
      >
        <div
          className="mjestoFilter"
          style={{
            display: "flex",
            justifyContent: "space-between",
            columnGap: 30,
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
              style={{ width: "170px" }}
              value={selectedMjesto}
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
            <input
              onChange={handleMinimumChange}
              value={minimum}
              style={{ width: "30px" }}
            ></input>
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
            <input
              onChange={handleMaksimumChange}
              value={maksimum}
              style={{ width: "30px" }}
            ></input>
          </div>
          <div>
            <b>KM</b>
          </div>
        </div>

        <div
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
        <div style={{ display: "flex" }}>
          <Select
            className="selectSort"
            name="selectSort"
            id="category-listSort"
            style={{ width: "170px" }}
            onChange={handleSortChange}
            value={selectedSort}
          >
            <option key={1}>Najnoviji</option>
            <option key={2}>Najstariji</option>
          </Select>
        </div>
      </div>
    </div>
  );
}
