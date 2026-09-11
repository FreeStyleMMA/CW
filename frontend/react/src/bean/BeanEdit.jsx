import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getBean,
  updateBean,
} from "../api/BeanApi";

import {
  getRoasteries,
} from "../api/RoasteryApi";

import {
  getCountries,
} from "../api/CountryApi";

import {
  getCoffeeOrigin,
  createCoffeeOrigin,
  updateCoffeeOrigin,
  getCoffeeOriginOptions,
} from "../api/CoffeeOriginApi";

import "./Bean.css";


const BeanEdit = () => {

  const { id } = useParams();
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

  const [verificationStatus, setVerificationStatus] =
    useState("UNVERIFIED");


  // =========================
  // CoffeeOrigin
  // =========================

  const [useOrigin, setUseOrigin] =
    useState(false);

  const [coffeeOriginId, setCoffeeOriginId] =
    useState(null);

  const [countryId, setCountryId] =
    useState("");

  const [region, setRegion] =
    useState("");

  const [producer, setProducer] =
    useState("");

  const [farm, setFarm] =
    useState("");

  const [variety, setVariety] =
    useState("");

  const [process, setProcess] =
    useState("");

  const [grade, setGrade] =
    useState("");

  const [altitude, setAltitude] =
    useState("");

  const [harvestYear, setHarvestYear] =
    useState("");

  const [originDescription, setOriginDescription] =
    useState("");


  // =========================
  // 공통 데이터
  // =========================

  const [roasteries, setRoasteries] =
    useState([]);

  const [countries, setCountries] =
    useState([]);


  // =========================
  // Origin 옵션
  // =========================

  const [originOptions, setOriginOptions] =
    useState({
      regions: [],
      varieties: [],
      processes: [],
      grades: [],
    });


  // =========================
  // 데이터 조회
  // =========================

  useEffect(() => {

    const loadData = async () => {

      try {

        const [
          bean,
          roasteryData,
          countryData,
        ] = await Promise.all([
          getBean(id),
          getRoasteries(),
          getCountries(),
        ]);


        // Bean
        setName(bean.name || "");
        setNickName(bean.nickName || "");

        setRoasteryId(
          bean.roasteryId
            ? String(bean.roasteryId)
            : ""
        );

        setRoastLevel(
          bean.roastLevel || ""
        );

        setRoastDate(
          bean.roastDate || ""
        );

        setDescription(
          bean.description || ""
        );

        setVerificationStatus(
          bean.verificationStatus ||
          "UNVERIFIED"
        );


        // 공통 데이터
        setRoasteries(roasteryData);
        setCountries(countryData);


        // CoffeeOrigin
        if (bean.coffeeOriginId) {

          setUseOrigin(true);

          setCoffeeOriginId(
            bean.coffeeOriginId
          );


          const origin =
            await getCoffeeOrigin(
              bean.coffeeOriginId
            );


          setCountryId(
            origin.countryId
              ? String(origin.countryId)
              : ""
          );

          setRegion(
            origin.region || ""
          );

          setProducer(
            origin.producer || ""
          );

          setFarm(
            origin.farm || ""
          );

          setVariety(
            origin.variety || ""
          );

          setProcess(
            origin.process || ""
          );

          setGrade(
            origin.grade || ""
          );

          setAltitude(
            origin.altitude != null
              ? String(origin.altitude)
              : ""
          );

          setHarvestYear(
            origin.harvestYear || ""
          );

          setOriginDescription(
            origin.description || ""
          );


          // 국가별 옵션
          if (origin.countryId) {

            const options =
              await getCoffeeOriginOptions(
                origin.countryId
              );

            setOriginOptions(options);

          }

        }

      } catch (error) {

        console.error(
          "Bean 수정 정보 조회 실패:",
          error
        );

        alert(
          "원두 정보를 불러오지 못했습니다."
        );

      }

    };


    loadData();

  }, [id]);


  // =========================
  // 국가 변경
  // =========================

  const handleCountryChange = async (e) => {

    const selectedCountryId =
      e.target.value;

    setCountryId(
      selectedCountryId
    );


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
  // 수정
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();


    try {

      let newCoffeeOriginId = null;


      // =========================
      // CoffeeOrigin
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


        // 기존 Origin 수정
        if (coffeeOriginId) {

          const updatedOrigin =
            await updateCoffeeOrigin(
              coffeeOriginId,
              originData
            );

          newCoffeeOriginId =
            updatedOrigin.id;

        }


        // 새로운 Origin 생성
        else {

          const createdOrigin =
            await createCoffeeOrigin(
              originData
            );

          newCoffeeOriginId =
            createdOrigin.id;

        }

      }


      // =========================
      // Bean
      // =========================

      const beanData = {

        coffeeOriginId:
          newCoffeeOriginId,

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

        verificationStatus,

      };


      await updateBean(
        id,
        beanData
      );


      alert(
        "원두가 수정되었습니다."
      );

      navigate(`/beans/${id}`);

    } catch (error) {

      console.error(
        "Bean 수정 실패:",
        error
      );

      alert(
        "원두 수정에 실패했습니다."
      );

    }

  };


  return (

    <div className="bean-page">

      <h1>
        원두 수정
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
              선택 안 함
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
          />

        </div>


        {/* ========================= */}
        {/* Origin 사용 */}
        {/* ========================= */}

        <div className="bean-form-group">

          <label className="bean-origin-checkbox">

            <input
              type="checkbox"
              checked={useOrigin}
              onChange={(e) =>
                setUseOrigin(
                  e.target.checked
                )
              }
            />

            원산지 상세정보 수정

          </label>

        </div>


        {/* ========================= */}
        {/* Origin Form */}
        {/* ========================= */}

        {useOrigin && (

          <div className="bean-origin-form">

            <h2>
              원산지 정보
            </h2>


            {/* 국가 */}

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


            {/* 지역 */}

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


            {/* 생산자 */}

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
              />

            </div>


            {/* 농장 */}

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
              />

            </div>


            {/* 품종 */}

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


            {/* 가공 */}

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


            {/* 등급 */}

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


            {/* 고도 */}

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
              />

            </div>


            {/* 수확년도 */}

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
              />

            </div>


            {/* 원산지 설명 */}

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
            수정
          </button>

          <button
            type="button"
            className="bean-button bean-button-secondary"
            onClick={() =>
              navigate(`/beans/${id}`)
            }
          >
            취소
          </button>

        </div>

      </form>

    </div>

  );
};

export default BeanEdit;