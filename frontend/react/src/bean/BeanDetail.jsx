import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getBean,
  deleteBean,
} from "../api/BeanApi";

import "./Bean.css";


const BeanDetail = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [bean, setBean] = useState(null);


  // =========================
  // 상세 조회
  // =========================

  const loadBean = async () => {

    try {

      const data = await getBean(id);

      setBean(data);

    } catch (error) {

      console.error(
        "Bean 상세 조회 실패:",
        error
      );

      alert(
        "원두 정보를 불러오지 못했습니다."
      );

    }

  };


  useEffect(() => {
    loadBean();
  }, [id]);


  // =========================
  // 삭제
  // =========================

  const handleDelete = async () => {

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

      navigate("/beans");

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


  // =========================
  // Loading
  // =========================

  if (!bean) {

    return (

      <div className="bean-page">

        <p>
          불러오는 중...
        </p>

      </div>

    );

  }


  return (

    <div className="bean-page">

      {/* ========================= */}
      {/* 제목 */}
      {/* ========================= */}

      <h1>
        {bean.name}
      </h1>


      {/* ========================= */}
      {/* Bean 기본 정보 */}
      {/* ========================= */}

      <div className="bean-detail-section">

        <h2>
          원두 정보
        </h2>


        {bean.nickName && (

          <div className="bean-detail-row">

            <span className="bean-detail-label">
              닉네임
            </span>

            <span className="bean-detail-value">
              {bean.nickName}
            </span>

          </div>

        )}


        {bean.roasteryName && (

          <div className="bean-detail-row">

            <span className="bean-detail-label">
              로스터리
            </span>

            <span className="bean-detail-value">
              {bean.roasteryName}
            </span>

          </div>

        )}


        {bean.roastLevel && (

          <div className="bean-detail-row">

            <span className="bean-detail-label">
              로스팅 레벨
            </span>

            <span className="bean-detail-value">
              {bean.roastLevel}
            </span>

          </div>

        )}


        {bean.roastDate && (

          <div className="bean-detail-row">

            <span className="bean-detail-label">
              로스팅 날짜
            </span>

            <span className="bean-detail-value">
              {bean.roastDate}
            </span>

          </div>

        )}


        {bean.description && (

          <div className="bean-detail-row">

            <span className="bean-detail-label">
              설명
            </span>

            <span className="bean-detail-value">
              {bean.description}
            </span>

          </div>

        )}


        <div className="bean-detail-row">

          <span className="bean-detail-label">
            검증 상태
          </span>

          <span className="bean-detail-value">

            <span className="bean-status">
              {bean.verificationStatus}
            </span>

          </span>

        </div>

      </div>


      {/* ========================= */}
      {/* Coffee Origin */}
      {/* ========================= */}

      {bean.coffeeOriginId && (

        <div className="bean-origin">

          <h2>
            원산지 정보
          </h2>


          <div className="bean-origin-grid">


            {bean.coffeeOriginCountry && (

              <div className="bean-detail-row">

                <span className="bean-detail-label">
                  국가
                </span>

                <span className="bean-detail-value">
                  {bean.coffeeOriginCountry}
                </span>

              </div>

            )}


            {bean.coffeeOriginRegion && (

              <div className="bean-detail-row">

                <span className="bean-detail-label">
                  지역
                </span>

                <span className="bean-detail-value">
                  {bean.coffeeOriginRegion}
                </span>

              </div>

            )}


            {bean.producer && (

              <div className="bean-detail-row">

                <span className="bean-detail-label">
                  생산자
                </span>

                <span className="bean-detail-value">
                  {bean.producer}
                </span>

              </div>

            )}


            {bean.farm && (

              <div className="bean-detail-row">

                <span className="bean-detail-label">
                  농장
                </span>

                <span className="bean-detail-value">
                  {bean.farm}
                </span>

              </div>

            )}


            {bean.variety && (

              <div className="bean-detail-row">

                <span className="bean-detail-label">
                  품종
                </span>

                <span className="bean-detail-value">
                  {bean.variety}
                </span>

              </div>

            )}


            {bean.process && (

              <div className="bean-detail-row">

                <span className="bean-detail-label">
                  가공
                </span>

                <span className="bean-detail-value">
                  {bean.process}
                </span>

              </div>

            )}


            {bean.grade && (

              <div className="bean-detail-row">

                <span className="bean-detail-label">
                  등급
                </span>

                <span className="bean-detail-value">
                  {bean.grade}
                </span>

              </div>

            )}


            {bean.altitude != null && (

              <div className="bean-detail-row">

                <span className="bean-detail-label">
                  고도
                </span>

                <span className="bean-detail-value">
                  {bean.altitude}m
                </span>

              </div>

            )}


            {bean.harvestYear && (

              <div className="bean-detail-row">

                <span className="bean-detail-label">
                  수확년도
                </span>

                <span className="bean-detail-value">
                  {bean.harvestYear}
                </span>

              </div>

            )}

          </div>


          {bean.coffeeOriginDescription && (

            <div className="bean-origin-description">

              <h3>
                원산지 설명
              </h3>

              <p>
                {bean.coffeeOriginDescription}
              </p>

            </div>

          )}

        </div>

      )}


      {/* ========================= */}
      {/* Buttons */}
      {/* ========================= */}

      <div style={{ marginTop: "30px" }}>

        <button
          className="bean-button"
          onClick={() =>
            navigate(`/beans/${bean.id}/edit`)
          }
        >
          수정
        </button>


        <button
          className="bean-button bean-button-danger"
          onClick={handleDelete}
        >
          삭제
        </button>


        <button
          className="bean-button bean-button-secondary"
          onClick={() =>
            navigate("/beans")
          }
        >
          목록
        </button>

      </div>

    </div>

  );
};

export default BeanDetail;