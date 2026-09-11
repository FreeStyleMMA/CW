import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createBean } from "../api/BeanApi";

import { getRoasteries } from "../api/RoasteryApi";

import { getCountries } from "../api/CountryApi";

import {
  createCoffeeOrigin,
  getCoffeeOriginOptions,
} from "../api/CoffeeOriginApi";

import "./Bean.css";


const BeanWrite = () => {

  const navigate = useNavigate();


  // =========================
  // Bean
  // =========================

  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [roasteryId, setRoasteryId] = useState("");
  const [roastLevel, setRoastLevel] = useState("");
  const [roastDate, setRoastDate] = useState("");
  const [description, setDescription] = useState("");


  // =========================
  // CoffeeOrigin
  // =========================

  const [useOrigin, setUseOrigin] = useState(false);

  const [countryId, setCountryId] = useState("");
  const [region, setRegion] = useState("");
  const [producer, setProducer] = useState("");
  const [farm, setFarm] = useState("");
  const [variety, setVariety] = useState("");
  const [process, setProcess] = useState("");
  const [grade, setGrade] = useState("");
  const [altitude, setAltitude] = useState("");
  const [harvestYear, setHarvestYear] = useState("");
  const [originDescription, setOriginDescription] =
    useState("");


  // =========================
  // 공통 데이터
  // =========================

  const [roasteries, setRoasteries] = useState([]);
  const [countries, setCountries] = useState([]);


  // =========================
  // Origin 옵션
  // =========================

  const [originOptions, setOriginOptions] = useState({
    regions: [],
    varieties: [],
    processes: [],
    grades: [],
  });


  // =========================
  // 초기 데이터 조회
  // =========================

  useEffect(() => {

    const loadData = async () => {

      try {

        const [
          roasteryData,
          countryData,
        ] = await Promise.all([
          getRoasteries(),
          getCountries(),
        ]);

        setRoasteries(roasteryData);
        setCountries(countryData);

      } catch (error) {

        console.error(
          "등록 화면 데이터 조회 실패:",
          error
        );

      }

    };

    loadData();

  }, []);


  // =========================
  // 국가 선택
  // =========================

  const handleCountryChange = async (e) => {

    const selectedCountryId =
      e.target.value;

    setCountryId(selectedCountryId);


    // 국가 선택 해제
    if (!selectedCountryId) {

      setOriginOptions({
        regions: [],
        varieties: [],
        processes: [],
        grades: [],
      });

      return;
    }


    try {

      const options =
        await getCoffeeOriginOptions(
          selectedCountryId
        );

      setOriginOptions(options);

    } catch (error) {

      console.error(
        "CoffeeOrigin 옵션 조회 실패:",
        error
      );

    }

  };


  // =========================
  // 원산지 사용 해제
  // =========================

  const handleOriginToggle = (e) => {

    const checked = e.target.checked;

    setUseOrigin(checked);


    // 해제하면 입력값 초기화
    if (!checked) {

      setCountryId("");
      setRegion("");
      setProducer("");
      setFarm("");
      setVariety("");
      setProcess("");
      setGrade("");
      setAltitude("");
      setHarvestYear("");
      setOriginDescription("");

      setOriginOptions({
        regions: [],
        varieties: [],
        processes: [],
        grades: [],
      });

    }

  };


  // =========================
  // Bean 등록
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();


    try {

      let coffeeOriginId = null;


      // =========================
      // CoffeeOrigin 생성
      // =========================

      if (useOrigin) {

        if (!countryId) {

          alert(
            "원산지를 사용하는 경우 국가를 선택해주세요."
          );

          return;

        }


        const originData = {

          countryId:
            Number(countryId),

          region:
            region || null,

          producer:
            producer || null,

          farm:
            farm || null,

          variety:
            variety || null,

          process:
            process || null,

          grade:
            grade || null,

          altitude:
            altitude !== ""
              ? Number(altitude)
              : null,

          harvestYear:
            harvestYear || null,

          description:
            originDescription || null,

        };


        const createdOrigin =
          await createCoffeeOrigin(
            originData
          );


        coffeeOriginId =
          createdOrigin.id;

      }


      // =========================
      // Bean 생성
      // =========================

      const beanData = {

        coffeeOriginId,

        roasteryId:
          roasteryId
            ? Number(roasteryId)
            : null,

        name,

        nickName,

        roastLevel,

        roastDate:
          roastDate || null,

        description,

      };


      await createBean(beanData);


      alert(
        "원두가 등록되었습니다."
      );


      navigate("/beans");

    } catch (error) {

      console.error(
        "Bean 등록 실패:",
        error
      );

      alert(
        "원두 등록에 실패했습니다."
      );

    }

  };


  return (

    <div className="bean-page">

      <h1>
        원두 등록
      </h1>


      <form
        className="bean-form"
        onSubmit={handleSubmit}
      >


        {/* ========================= */}
        {/* 원두명 */}
        {/* ========================= */}

        <div className="bean-form-group">

          <label>
            원두명
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="원두명을 입력하세요"
            required
          />

        </div>


        {/* ========================= */}
        {/* 닉네임 */}
        {/* ========================= */}

        <div className="bean-form-group">

          <label>
            닉네임
          </label>

          <input
            type="text"
            value={nickName}
            onChange={(e) =>
              setNickName(e.target.value)
            }
            placeholder="원두를 부를 이름"
          />

        </div>


        {/* ========================= */}
        {/* 로스터리 */}
        {/* ========================= */}

        <div className="bean-form-group">

          <label>
            로스터리
          </label>

          <select
            value={roasteryId}
            onChange={(e) =>
              setRoasteryId(e.target.value)
            }
          >

            <option value="">
              로스터리 선택 안 함
            </option>

            {roasteries.map(
              (roastery) => (

                <option
                  key={roastery.id}
                  value={roastery.id}
                >
                  {roastery.name}
                </option>

              )
            )}

          </select>

        </div>


        {/* ========================= */}
        {/* 로스팅 레벨 */}
        {/* ========================= */}

        <div className="bean-form-group">

          <label>
            로스팅 레벨
          </label>

          <input
            type="text"
            value={roastLevel}
            onChange={(e) =>
              setRoastLevel(e.target.value)
            }
            placeholder="예: Light, Medium, Dark"
          />

        </div>


        {/* ========================= */}
        {/* 로스팅 날짜 */}
        {/* ========================= */}

        <div className="bean-form-group">

          <label>
            로스팅 날짜
          </label>

          <input
            type="date"
            value={roastDate}
            onChange={(e) =>
              setRoastDate(e.target.value)
            }
          />

        </div>


        {/* ========================= */}
        {/* 원두 설명 */}
        {/* ========================= */}

        <div className="bean-form-group">

          <label>
            원두 설명
          </label>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="원두에 대한 설명을 입력하세요"
          />

        </div>


        {/* ========================= */}
        {/* 원산지 사용 */}
        {/* ========================= */}

        <div className="bean-form-group">

          <label className="bean-origin-checkbox">

            <input
              type="checkbox"
              checked={useOrigin}
              onChange={handleOriginToggle}
            />

            원산지 상세정보 입력

          </label>

        </div>


        {/* ========================= */}
        {/* CoffeeOrigin */}
        {/* ========================= */}

        {useOrigin && (

          <div className="bean-origin-form">

            <h2>
              원산지 정보
            </h2>


            {/* ========================= */}
            {/* 국가 */}
            {/* ========================= */}

            <div className="bean-form-group">

              <label>
                국가
              </label>

              <select
                value={countryId}
                onChange={handleCountryChange}
                required
              >

                <option value="">
                  국가 선택
                </option>

                {countries.map(
                  (country) => (

                    <option
                      key={country.id}
                      value={country.id}
                    >
                      {country.name}
                    </option>

                  )
                )}

              </select>

            </div>


            {/* ========================= */}
            {/* 지역 */}
            {/* ========================= */}

            <div className="bean-form-group">

              <label>
                지역
              </label>

              <input
                type="text"
                list="region-options"
                value={region}
                onChange={(e) =>
                  setRegion(e.target.value)
                }
                placeholder="예: 예가체프"
              />

              <datalist id="region-options">

                {originOptions.regions.map(
                  (value) => (

                    <option
                      key={value}
                      value={value}
                    />

                  )
                )}

              </datalist>

            </div>


            {/* ========================= */}
            {/* 생산자 */}
            {/* ========================= */}

            <div className="bean-form-group">

              <label>
                생산자
              </label>

              <input
                type="text"
                value={producer}
                onChange={(e) =>
                  setProducer(e.target.value)
                }
                placeholder="생산자"
              />

            </div>


            {/* ========================= */}
            {/* 농장 */}
            {/* ========================= */}

            <div className="bean-form-group">

              <label>
                농장
              </label>

              <input
                type="text"
                value={farm}
                onChange={(e) =>
                  setFarm(e.target.value)
                }
                placeholder="농장명"
              />

            </div>


            {/* ========================= */}
            {/* 품종 */}
            {/* ========================= */}

            <div className="bean-form-group">

              <label>
                품종
              </label>

              <input
                type="text"
                list="variety-options"
                value={variety}
                onChange={(e) =>
                  setVariety(e.target.value)
                }
                placeholder="예: 74110, SL28"
              />

              <datalist id="variety-options">

                {originOptions.varieties.map(
                  (value) => (

                    <option
                      key={value}
                      value={value}
                    />

                  )
                )}

              </datalist>

            </div>


            {/* ========================= */}
            {/* 가공 */}
            {/* ========================= */}

            <div className="bean-form-group">

              <label>
                가공 방식
              </label>

              <input
                type="text"
                list="process-options"
                value={process}
                onChange={(e) =>
                  setProcess(e.target.value)
                }
                placeholder="예: Natural, Washed"
              />

              <datalist id="process-options">

                {originOptions.processes.map(
                  (value) => (

                    <option
                      key={value}
                      value={value}
                    />

                  )
                )}

              </datalist>

            </div>


            {/* ========================= */}
            {/* 등급 */}
            {/* ========================= */}

            <div className="bean-form-group">

              <label>
                등급
              </label>

              <input
                type="text"
                list="grade-options"
                value={grade}
                onChange={(e) =>
                  setGrade(e.target.value)
                }
                placeholder="예: G1, AA, Supremo"
              />

              <datalist id="grade-options">

                {originOptions.grades.map(
                  (value) => (

                    <option
                      key={value}
                      value={value}
                    />

                  )
                )}

              </datalist>

            </div>


            {/* ========================= */}
            {/* 고도 */}
            {/* ========================= */}

            <div className="bean-form-group">

              <label>
                고도 (m)
              </label>

              <input
                type="number"
                value={altitude}
                onChange={(e) =>
                  setAltitude(e.target.value)
                }
                placeholder="예: 2000"
              />

            </div>


            {/* ========================= */}
            {/* 수확년도 */}
            {/* ========================= */}

            <div className="bean-form-group">

              <label>
                수확년도
              </label>

              <input
                type="text"
                value={harvestYear}
                onChange={(e) =>
                  setHarvestYear(e.target.value)
                }
                placeholder="예: 2025"
              />

            </div>


            {/* ========================= */}
            {/* 원산지 설명 */}
            {/* ========================= */}

            <div className="bean-form-group">

              <label>
                원산지 설명
              </label>

              <textarea
                value={originDescription}
                onChange={(e) =>
                  setOriginDescription(
                    e.target.value
                  )
                }
                placeholder="원산지에 대한 설명"
              />

            </div>

          </div>

        )}


        {/* ========================= */}
        {/* Buttons */}
        {/* ========================= */}

        <div>

          <button
            type="submit"
            className="bean-button"
          >
            등록
          </button>

          <button
            type="button"
            className="bean-button bean-button-secondary"
            onClick={() =>
              navigate("/beans")
            }
          >
            취소
          </button>

        </div>

      </form>

    </div>

  );
};

export default BeanWrite;