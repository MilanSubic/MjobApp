import React, { useState, useEffect } from "react";
import { Button } from "antd";
import CustomCard from "../components/CustomCard";
import oglasService from "../services/OglasService";

import OpstinaService from "../services/OpstinaService";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postsSize, setPostsSize] = useState(0);
  const [currentPosts, setCurrentPosts] = useState([]);

  const [selectedMjesto, setSelectedMjesto] = useState("");
  const [minimum, setMinimum] = useState("");
  const [maksimum, setMaksimum] = useState("");
  const [opstine, setOpstine] = useState([]);

  const navigate = useNavigate();

  const loadPosts = () => {
    oglasService.getAll().then((result) => {
      setPosts(result.data);
      setPostsSize(result.data.length);
      setIsLoaded(true);
    });
    setPageSize(12);
    setCurrentPage(1);
  };

  const loadCurrentPosts = () => {
    setCurrentPosts(getFilteredByMjesto);

    setIsLoaded(true);
    setPageSize(12);
    setCurrentPage(1);
  };

  const loadOpstina = () => {
    OpstinaService.getAll().then((result) => {
      setOpstine(result.data);
    });
  };

  useEffect(() => {
    const reloadCount = parseInt(localStorage.getItem("reloadCount"));
    if (reloadCount < 2) {
      localStorage.setItem("reloadCount", String(reloadCount + 1));
      window.location.reload();
    }

    loadPosts();
    loadOpstina();
    console.log("fnfn");
    navigate("/home");
  }, []);

  useEffect(() => {
    setCurrentPosts(
      posts.slice(currentPage * pageSize - pageSize, currentPage * pageSize)
    );
  }, [isLoaded]);

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
    setSelectedMjesto(event.target.value);
  }

  function handleMinimumChange(event) {
    setMinimum(event.target.value);
  }

  function handleMaksimumChange(event) {
    setMaksimum(event.target.value);
  }

  function getFilteredByMjesto() {
    if (!selectedMjesto && !minimum && !maksimum) {
      return posts;
    }
    if (
      (selectedMjesto === "" || selectedMjesto === "Izaberite") &&
      minimum !== "" &&
      maksimum !== ""
    ) {
      console.log("2" + selectedMjesto);
      return posts.filter(
        (item) => item.satnica >= minimum && item.satnica <= maksimum
      );
    }
    if (minimum === "" && maksimum === "") {
      return posts.filter((item) => item.mjesto === selectedMjesto);
    }
    if (minimum === "" && maksimum !== "") {
      return posts.filter((item) => item.satnica <= maksimum);
    }
    if (minimum !== "" && maksimum === "") {
      return posts.filter((item) => item.satnica >= minimum);
    } else {
      console.log("3 " + selectedMjesto + minimum + maksimum);
      return posts.filter(
        (item) =>
          item.mjesto === selectedMjesto &&
          item.satnica >= minimum &&
          item.satnica <= maksimum
      );
    }
  }

  const handleSubmit = () => {
    loadCurrentPosts();
    setPostsSize(currentPosts.length);
    console.log("broj postova" + currentPosts.length);
  };

  const clearFilters = () => {
    loadPosts();
    setCurrentPosts(
      posts.slice(currentPage * pageSize - pageSize, currentPage * pageSize)
    );
    setSelectedMjesto("Izaberite");
    setMinimum("");
    setMaksimum("");
  };

  console.log("current" + currentPosts);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ padding: 40, width: "80%" }}>
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
            padding: 40,
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
          <div style={{ display: "flex" }}>
            <select
              className="select_mjesto"
              name="category-list"
              id="category-list"
              onChange={handleMjestoChange}
              style={{ width: "120px" }}
              value={selectedMjesto}
            >
              <option>Izaberite</option>
              {opstine.map((opstina) => (
                <option key={opstina.id} value={opstina.naziv}>
                  {opstina.naziv}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div
          className="SatnicaMinimumFilter"
          style={{
            display: "flex",
            columnGap: 10,
            paddingTop: 25,
            paddingBottom: 15,
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
          style={{ display: "flex", columnGap: 10 }}
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
            justifyContent: "center",
            width: "100%",
            columnGap: 50,
            paddingTop: 20,
          }}
        >
          <Button onClick={handleSubmit}>Pretraži</Button>
          <Button onClick={clearFilters}>Poništi</Button>
        </div>
      </div>
    </div>
  );
}
