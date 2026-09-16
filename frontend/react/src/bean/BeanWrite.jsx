import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createBean } from "../api/BeanApi";

import { getCountries } from "../api/CountryApi";

import {
  getRoasteries,
  createRoastery,
} from "../api/RoasteryApi";

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
  const [roasteryName, setRoasteryName] = useState("");

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
  const [originDescription, setOriginDescription] = useState("");

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
  // 등록 상태
  // =========================

  const [isSubmitting, setIsSubmitting] = useState(false);

  // =========================
  // 초기 데이터 조회
  // =========================

  useEffect(() => {
    const loadData = async () => {
      try {
        const [roasteryData, countryData] = await Promise.all([
          getRoasteries(),
          getCountries(),
        ]);

        setRoasteries(roasteryData || []);
        setCountries(countryData || []);
      } catch (error) {
        console.error("등록 화면 데이터 조회 실패:", error);
      }
    };

    loadData();
  }, []);

  // =========================
  // 국가 선택
  // =========================

  const handleCountryChange = async (e) => {
    const selectedCountryId = e.target.value;

    setCountryId(selectedCountryId);

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
      const options = await getCoffeeOriginOptions(
        selectedCountryId
      );

      setOriginOptions({
        regions: options?.regions || [],
        varieties: options?.varieties || [],
        processes: options?.processes || [],
        grades: options?.grades || [],
      });
    } catch (error) {
      console.error("CoffeeOrigin 옵션 조회 실패:", error);

      setOriginOptions({
        regions: [],
        varieties: [],
        processes: [],
        grades: [],
      });
    }
  };

  // =========================
  // 원산지 사용 해제
  // =========================

  const handleOriginToggle = (e) => {
    const checked = e.target.checked;

    setUseOrigin(checked);

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
  // 로스터리 입력
  // =========================

  const handleRoasteryChange = (e) => {
    const value = e.target.value;

    setRoasteryName(value);

    const trimmedValue = value.trim().toLowerCase();

    const selectedRoastery = roasteries.find(
      (roastery) =>
        roastery.name?.trim().toLowerCase() === trimmedValue
    );

    if (selectedRoastery) {
      setRoasteryId(String(selectedRoastery.id));
    } else {
      setRoasteryId("");
    }
  };

  // =========================
  // 로스터리 ID 처리
  // =========================

  const resolveRoasteryId = async () => {
    const trimmedRoasteryName = roasteryName.trim();

    // 로스터리를 입력하지 않은 경우
    if (!trimmedRoasteryName) {
      return null;
    }

    // 기존 로스터리를 선택한 경우
    if (roasteryId) {
      return Number(roasteryId);
    }

    // 혹시 입력값과 기존 목록의 이름이 같은 경우 재확인
    const existingRoastery = roasteries.find(
      (roastery) =>
        roastery.name?.trim().toLowerCase() ===
        trimmedRoasteryName.toLowerCase()
    );

    if (existingRoastery) {
      return Number(existingRoastery.id);
    }

    // 신규 로스터리 생성
    const createdRoastery = await createRoastery({
      name: trimmedRoasteryName,
      location: null,
      discription: null,
    });

    // 새로 생성된 로스터리 ID 반환
    return createdRoastery.id;
  };

  // =========================
  // Bean 등록
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      let coffeeOriginId = null;

      // =========================
      // 기본 입력값 검증
      // =========================

      if (!name.trim()) {
        alert("원두명을 입력해주세요.");
        return;
      }

      if (useOrigin && !countryId) {
        alert("원산지를 사용하는 경우 국가를 선택해주세요.");
        return;
      }

      // =========================
      // CoffeeOrigin 생성
      // =========================

      if (useOrigin) {
        const originData = {
          countryId: Number(countryId),
          region: region || null,
          producer: producer || null,
          farm: farm || null,
          variety: variety || null,
          process: process || null,
          grade: grade || null,
          altitude: altitude !== "" ? Number(altitude) : null,
          harvestYear: harvestYear || null,
          description: originDescription || null,
        };

        const createdOrigin =
          await createCoffeeOrigin(originData);

        coffeeOriginId = createdOrigin.id;
      }

      // =========================
      // Roastery 처리
      // =========================

      const finalRoasteryId = await resolveRoasteryId();

      // =========================
      // Bean 생성
      // =========================

      const beanData = {
        coffeeOriginId,
        roasteryId: finalRoasteryId,
        name: name.trim(),
        nickName: nickName.trim() || null,
        roastLevel: roastLevel || null,
        roastDate: roastDate || null,
        description: description || null,
      };

      await createBean(beanData);

      alert("원두가 등록되었습니다.");

      navigate("/beans");
    } catch (error) {
      console.error("Bean 등록 실패:", error);

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "원두 등록에 실패했습니다.";

      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bean-page">
      <h1>원두 등록</h1>

      <form
        className="bean-form"
        onSubmit={handleSubmit}
      >
        {/* ========================= */}
        {/* 원두명 */}
        {/* ========================= */}

        <div className="bean-form-group">
          <label htmlFor="name">
            원두명
          </label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="원두명을 입력하세요"
            required
          />
        </div>

        {/* ========================= */}
        {/* 닉네임 */}
        {/* ========================= */}

        <div className="bean-form-group">
          <label htmlFor="nickName">
            닉네임
          </label>

          <input
            id="nickName"
            type="text"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
            placeholder="원두를 부를 이름"
          />
        </div>

        {/* ========================= */}
        {/* 로스터리 자동완성 */}
        {/* ========================= */}

        <div className="bean-form-group">
          <label htmlFor="roasteryName">
            로스터리
          </label>

          <input
            id="roasteryName"
            type="text"
            list="roastery-options"
            value={roasteryName}
            onChange={handleRoasteryChange}
            placeholder="로스터리 이름을 입력하거나 선택하세요"
          />

          <datalist id="roastery-options">
            {roasteries.map((roastery) => (
              <option
                key={roastery.id}
                value={roastery.name}
              />
            ))}
          </datalist>

          {roasteryName.trim() &&
            !roasteryId &&
            !roasteries.some(
              (roastery) =>
                roastery.name?.trim().toLowerCase() ===
                roasteryName.trim().toLowerCase()
            ) && (
              <small className="form-help">
                등록되지 않은 로스터리입니다.
                저장 시 새로 등록됩니다.
              </small>
            )}
        </div>

        {/* ========================= */}
        {/* 로스팅 레벨 */}
        {/* ========================= */}

        <div className="bean-form-group">
          <label htmlFor="roastLevel">
            로스팅 레벨
          </label>

          <input
            id="roastLevel"
            type="text"
            value={roastLevel}
            onChange={(e) => setRoastLevel(e.target.value)}
            placeholder="예: Light, Medium, Dark"
          />
        </div>

        {/* ========================= */}
        {/* 로스팅 날짜 */}
        {/* ========================= */}

        <div className="bean-form-group">
          <label htmlFor="roastDate">
            로스팅 날짜
          </label>

          <input
            id="roastDate"
            type="date"
            value={roastDate}
            onChange={(e) => setRoastDate(e.target.value)}
          />
        </div>

        {/* ========================= */}
        {/* 원두 설명 */}
        {/* ========================= */}

        <div className="bean-form-group">
          <label htmlFor="description">
            원두 설명
          </label>

          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            <h2>원산지 정보</h2>

            {/* 국가 */}

            <div className="bean-form-group">
              <label htmlFor="countryId">
                국가
              </label>

              <select
                id="countryId"
                value={countryId}
                onChange={handleCountryChange}
                required
              >
                <option value="">
                  국가 선택
                </option>

                {countries.map((country) => (
                  <option
                    key={country.id}
                    value={country.id}
                  >
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 지역 */}

            <div className="bean-form-group">
              <label htmlFor="region">
                지역
              </label>

              <input
                id="region"
                type="text"
                list="region-options"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="예: 예가체프"
              />

              <datalist id="region-options">
                {originOptions.regions.map((value) => (
                  <option
                    key={value}
                    value={value}
                  />
                ))}
              </datalist>
            </div>

            {/* 생산자 */}

            <div className="bean-form-group">
              <label htmlFor="producer">
                생산자
              </label>

              <input
                id="producer"
                type="text"
                value={producer}
                onChange={(e) => setProducer(e.target.value)}
                placeholder="생산자"
              />
            </div>

            {/* 농장 */}

            <div className="bean-form-group">
              <label htmlFor="farm">
                농장
              </label>

              <input
                id="farm"
                type="text"
                value={farm}
                onChange={(e) => setFarm(e.target.value)}
                placeholder="농장명"
              />
            </div>

            {/* 품종 */}

            <div className="bean-form-group">
              <label htmlFor="variety">
                품종
              </label>

              <input
                id="variety"
                type="text"
                list="variety-options"
                value={variety}
                onChange={(e) => setVariety(e.target.value)}
                placeholder="예: 74110, SL28"
              />

              <datalist id="variety-options">
                {originOptions.varieties.map((value) => (
                  <option
                    key={value}
                    value={value}
                  />
                ))}
              </datalist>
            </div>

            {/* 가공 */}

            <div className="bean-form-group">
              <label htmlFor="process">
                가공 방식
              </label>

              <input
                id="process"
                type="text"
                list="process-options"
                value={process}
                onChange={(e) => setProcess(e.target.value)}
                placeholder="예: Natural, Washed"
              />

              <datalist id="process-options">
                {originOptions.processes.map((value) => (
                  <option
                    key={value}
                    value={value}
                  />
                ))}
              </datalist>
            </div>

            {/* 등급 */}

            <div className="bean-form-group">
              <label htmlFor="grade">
                등급
              </label>

              <input
                id="grade"
                type="text"
                list="grade-options"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                placeholder="예: G1, AA, Supremo"
              />

              <datalist id="grade-options">
                {originOptions.grades.map((value) => (
                  <option
                    key={value}
                    value={value}
                  />
                ))}
              </datalist>
            </div>

            {/* 고도 */}

            <div className="bean-form-group">
              <label htmlFor="altitude">
                고도 (m)
              </label>

              <input
                id="altitude"
                type="number"
                value={altitude}
                onChange={(e) => setAltitude(e.target.value)}
                placeholder="예: 2000"
              />
            </div>

            {/* 수확년도 */}

            <div className="bean-form-group">
              <label htmlFor="harvestYear">
                수확년도
              </label>

              <input
                id="harvestYear"
                type="text"
                value={harvestYear}
                onChange={(e) => setHarvestYear(e.target.value)}
                placeholder="예: 2025"
              />
            </div>

            {/* 원산지 설명 */}

            <div className="bean-form-group">
              <label htmlFor="originDescription">
                원산지 설명
              </label>

              <textarea
                id="originDescription"
                value={originDescription}
                onChange={(e) =>
                  setOriginDescription(e.target.value)
                }
                placeholder="원산지에 대한 설명"
              />
            </div>
          </div>
        )}

        {/* ========================= */}
        {/* Buttons */}
        {/* ========================= */}

        <div className="bean-button-group">
          <button
            type="submit"
            className="bean-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "등록 중..." : "등록"}
          </button>

          <button
            type="button"
            className="bean-button bean-button-secondary"
            onClick={() => navigate("/beans")}
            disabled={isSubmitting}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default BeanWrite;