import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getBeans,
  searchBeans,
  deleteBean,
} from "../api/BeanApi";

import "./Bean.css";


const BeanMain = () => {

  const navigate = useNavigate();

  const [beans, setBeans] = useState([]);
  const [keyword, setKeyword] = useState("");


  // =========================
  // Bean 목록 조회 / 검색
  // =========================

  const loadBeans = async (searchKeyword = "") => {

    try {

      const data = searchKeyword.trim()
        ? await searchBeans(searchKeyword)
        : await getBeans();

      setBeans(data);

    } catch (error) {

      console.error(
        "Bean 목록 조회 실패:",
        error
      );

    }

  };


  // 최초 조회
  useEffect(() => {
    loadBeans();
  }, []);


  // 검색
  const handleSearch = () => {
    loadBeans(keyword);
  };


  // 엔터 검색
  const handleKeyDown = (e) => {

    if (e.key === "Enter") {
      handleSearch();
    }

  };


  // 전체보기
  const handleReset = () => {

    setKeyword("");
    loadBeans();

  };


  // 삭제
  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "이 원두를 삭제하시겠습니까?"
      );

    if (!confirmDelete) {
      return;
    }


    try {

      await deleteBean(id);

      alert("삭제되었습니다.");

      loadBeans(keyword);

    } catch (error) {

      console.error(
        "Bean 삭제 실패:",
        error
      );

      alert(
        "삭제에 실패했습니다."
      );

    }

  };


  return (

    <div className="bean-page">

      {/* ========================= */}
      {/* Header */}
      {/* ========================= */}

      <div className="bean-toolbar">

        <h1>
          원두 목록
        </h1>

        <button
          className="bean-button"
          onClick={() =>
            navigate("/beans/write")
          }
        >
          원두 등록
        </button>

      </div>


      {/* ========================= */}
      {/* Search */}
      {/* ========================= */}

      <div className="bean-search">

        <input
          type="text"
          value={keyword}
          onChange={(e) =>
            setKeyword(e.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder="원두명 또는 닉네임 검색"
        />

        <button
          className="bean-button"
          onClick={handleSearch}
        >
          검색
        </button>

        <button
          className="bean-button bean-button-secondary"
          onClick={handleReset}
        >
          전체보기
        </button>

      </div>


      {/* ========================= */}
      {/* Bean List */}
      {/* ========================= */}

      {beans.length === 0 ? (

        <div className="bean-empty">

          <p>
            검색 결과가 없습니다.
          </p>

        </div>

      ) : (

        beans.map((bean) => (

          <div
            key={bean.id}
            className="bean-card"
          >

            <h2>
              {bean.name}
            </h2>


            {bean.nickName && (
              <p>
                <strong>닉네임:</strong>{" "}
                {bean.nickName}
              </p>
            )}


            {bean.roasteryName && (
              <p>
                <strong>로스터리:</strong>{" "}
                {bean.roasteryName}
              </p>
            )}


            {bean.coffeeOriginCountry && (
              <p>
                <strong>국가:</strong>{" "}
                {bean.coffeeOriginCountry}
              </p>
            )}


            {bean.coffeeOriginRegion && (
              <p>
                <strong>지역:</strong>{" "}
                {bean.coffeeOriginRegion}
              </p>
            )}


            {bean.roastLevel && (
              <p>
                <strong>로스팅:</strong>{" "}
                {bean.roastLevel}
              </p>
            )}


            {bean.roastDate && (
              <p>
                <strong>로스팅 날짜:</strong>{" "}
                {bean.roastDate}
              </p>
            )}


            <div style={{ marginTop: "15px" }}>

              <button
                className="bean-button"
                onClick={() =>
                  navigate(
                    `/beans/${bean.id}`
                  )
                }
              >
                상세보기
              </button>

              <button
                className="bean-button bean-button-danger"
                onClick={() =>
                  handleDelete(bean.id)
                }
              >
                삭제
              </button>

            </div>

          </div>

        ))

      )}

    </div>

  );
};

export default BeanMain;