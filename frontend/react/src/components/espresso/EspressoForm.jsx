
import { useEffect, useState } from "react";
import "./EspressoForm.css";

import { getBeans } from "../../api/BeanApi";
import { getRoasteries } from "../../api/RoasteryApi";

const EMPTY_INITIAL_DATA = {};

export default function EspressoForm({
  initialData = EMPTY_INITIAL_DATA,
  onSubmit,
  submitText = "Save",
}) {
  // =========================
  // Bean / Roastery
  // =========================

  const [beans, setBeans] = useState([]);
  const [roasteries, setRoasteries] = useState([]);

  const [selectedRoastery, setSelectedRoastery] = useState("");
  const [customRoastery, setCustomRoastery] = useState("");

  const [beanId, setBeanId] = useState("");
  const [customBean, setCustomBean] = useState("");

  // =========================
  // Recipe
  // =========================

  const [dose, setDose] = useState("");
  const [grindingSize, setGrindingSize] = useState("");
  const [espressoOutput, setEspressoOutput] = useState("");
  const [extractSecond, setExtractSecond] = useState("");
  const [temperature, setTemperature] = useState("");

  // =========================
  // Tasting
  // =========================

  const [rating, setRating] = useState(0);
  const [note, setNote] = useState("");

  // =========================
  // Bean / Roastery 독립 조회
  // =========================

  useEffect(() => {
    const loadData = async () => {
      try {
        const [beanData, roasteryData] = await Promise.all([
          getBeans(),
          getRoasteries(),
        ]);


        setBeans(Array.isArray(beanData) ? beanData : []);
        setRoasteries(Array.isArray(roasteryData) ? roasteryData : []);
      } catch (error) {
        console.error("Bean / Roastery 조회 실패:", error);
        alert("Bean 정보를 불러오지 못했습니다.");
      }
    };

    loadData();
  }, []);

  // =========================
  // 수정 페이지 기존 데이터
  // =========================

  useEffect(() => {
    if (
      !initialData ||
      Object.keys(initialData).length === 0
    ) {
      return;
    }

    setBeanId(
      initialData.beanId != null
        ? String(initialData.beanId)
        : ""
    );

    setCustomBean(initialData.beanName ?? "");

    setDose(initialData.dose ?? "");
    setGrindingSize(initialData.grindingSize ?? "");
    setEspressoOutput(initialData.espressoOutput ?? "");
    setExtractSecond(initialData.extractSecond ?? "");
    setTemperature(initialData.temperature ?? "");
    setRating(initialData.rating ?? 0);
    setNote(initialData.note ?? "");

    if (initialData.roasteryId) {
      setSelectedRoastery(String(initialData.roasteryId));
    }

    if (initialData.roasteryName) {
      setSelectedRoastery("custom");
      setCustomRoastery(initialData.roasteryName);
    }
  }, [initialData]);

  // =========================
  // 기존 Bean의 Roastery 자동 선택
  // =========================

  useEffect(() => {
    if (
      !initialData?.beanId ||
      beans.length === 0
    ) {
      return;
    }

    const selectedBean = beans.find(
      (bean) =>
        bean.id === Number(initialData.beanId)
    );

    if (selectedBean?.roasteryId) {
      setSelectedRoastery(
        String(selectedBean.roasteryId)
      );
    }
  }, [initialData, beans]);

  // =========================
  // Ratio 계산
  // =========================

  const ratio =
    dose &&
    espressoOutput &&
    Number(dose) > 0
      ? (
          Number(espressoOutput) / Number(dose)
        ).toFixed(2)
      : "";

  // =========================
  // Roastery 변경
  // =========================

  const handleRoasteryChange = (e) => {
    const value = e.target.value;

    setSelectedRoastery(value);

    if (value !== "custom") {
      setCustomRoastery("");
    }

    // 로스터리가 변경되면 Bean 선택 초기화
    setBeanId("");
    setCustomBean("");
  };

  // =========================
  // Bean 변경
  // =========================

  const handleBeanChange = (e) => {
    const value = e.target.value;

    setBeanId(value);

    if (value !== "custom") {
      setCustomBean("");
    }
  };

  // =========================
  // Submit
  // =========================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!beanId) {
      alert("Bean을 선택하거나 직접 입력해주세요.");
      return;
    }

    if (
      beanId === "custom" &&
      !customBean.trim()
    ) {
      alert("원두 이름을 입력해주세요.");
      return;
    }

    if (
      selectedRoastery === "custom" &&
      !customRoastery.trim()
    ) {
      alert("로스터리 이름을 입력해주세요.");
      return;
    }

    onSubmit({
      // 기존 Bean
      beanId:
        beanId === "custom"
          ? null
          : Number(beanId),

      // 직접 입력 Bean
      beanName:
        beanId === "custom"
          ? customBean.trim()
          : null,

      // 기존 Roastery
      roasteryId:
        selectedRoastery &&
        selectedRoastery !== "custom"
          ? Number(selectedRoastery)
          : null,

      // 직접 입력 Roastery
      roasteryName:
        selectedRoastery === "custom"
          ? customRoastery.trim()
          : null,

      // Recipe
      dose: dose === "" ? null : Number(dose),

      grindingSize:
        grindingSize === ""
          ? null
          : Number(grindingSize),

      espressoOutput:
        espressoOutput === ""
          ? null
          : Number(espressoOutput),

      extractSecond:
        extractSecond === ""
          ? null
          : Number(extractSecond),

      temperature:
        temperature === ""
          ? null
          : Number(temperature),

      ebr:
        ratio === ""
          ? null
          : Number(ratio),

      // Tasting
      rating,
      note,
    });
  };

  // =========================
  // 선택된 Bean 정보
  // =========================

  const selectedBean =
    beanId && beanId !== "custom"
      ? beans.find(
          (item) =>
            item.id === Number(beanId)
        )
      : null;

  // =========================
  // Render
  // =========================

  return (
    <form
      className="espresso-form"
      onSubmit={handleSubmit}
    >
      {/* =========================
          Coffee
      ========================= */}

      <section className="form-section">
        <h2>원두 정보</h2>

        {/* Roastery */}

        <div className="form-field">
          <label>로스터리 선택</label>

          <select
            value={selectedRoastery}
            onChange={handleRoasteryChange}
          >
            <option value="">
              로스터리를 선택하세요
            </option>

            {roasteries.map((roastery) => (
              <option
                key={roastery.id}
                value={roastery.id}
              >
                {roastery.name}
              </option>
            ))}

            <option value="custom">
              직접 입력
            </option>
          </select>

          {selectedRoastery === "custom" && (
            <input
              type="text"
              value={customRoastery}
              onChange={(e) =>
                setCustomRoastery(e.target.value)
              }
              placeholder="로스터리 이름을 입력하세요"
            />
          )}
        </div>

        {/* Bean */}

        <div className="form-field">
          <label>원두 선택</label>

          <select
            value={beanId}
            onChange={handleBeanChange}
          >
            <option value="">
              원두를 선택하세요
            </option>

            {/* 전체 Bean 목록을 독립적으로 표시 */}
            {beans.map((bean) => (
              <option
                key={bean.id}
                value={bean.id}
              >
                {bean.name}
                {bean.roasteryName
                  ? ` · ${bean.roasteryName}`
                  : ""}
              </option>
            ))}

            <option value="custom">
              직접 입력
            </option>
          </select>

          {beanId === "custom" && (
            <input
              type="text"
              value={customBean}
              onChange={(e) =>
                setCustomBean(e.target.value)
              }
              placeholder="원두 이름을 입력하세요"
            />
          )}
        </div>

        {/* 선택된 Bean 정보 */}

        {selectedBean && (
          <div className="selected-bean-info">
            <strong>{selectedBean.name}</strong>

            {selectedBean.roasteryName && (
              <span>
                {selectedBean.roasteryName}
              </span>
            )}

            {selectedBean.coffeeOriginRegion && (
              <span>
                {selectedBean.coffeeOriginRegion}
              </span>
            )}
          </div>
        )}

        {/* 직접 입력 Bean 정보 */}

        {beanId === "custom" && customBean && (
          <div className="selected-bean-info">
            <strong>{customBean}</strong>

            {selectedRoastery === "custom" &&
              customRoastery && (
                <span>{customRoastery}</span>
              )}
          </div>
        )}
      </section>

      {/* =========================
          Recipe
      ========================= */}

      <section className="form-section">
        <h2>오늘의 레시피</h2>

        <div className="form-grid">
          {/* Dose */}

          <div className="form-field">
            <label>도징량(원두량)</label>

            <input
              type="number"
              step="0.1"
              value={dose}
              onChange={(e) =>
                setDose(e.target.value)
              }
              placeholder="18"
            />
          </div>

          {/* Output */}

          <div className="form-field">
            <label>추출량</label>

            <input
              type="number"
              step="0.1"
              value={espressoOutput}
              onChange={(e) =>
                setEspressoOutput(e.target.value)
              }
              placeholder="40"
            />
          </div>

          {/* Grind Size */}

          <div className="form-field">
            <label>분쇄도</label>

            <input
              type="number"
              step="0.1"
              value={grindingSize}
              onChange={(e) =>
                setGrindingSize(e.target.value)
              }
              placeholder="2.5"
            />
          </div>

          {/* Extraction Time */}

          <div className="form-field">
            <label>추출 시간</label>

            <input
              type="number"
              value={extractSecond}
              onChange={(e) =>
                setExtractSecond(e.target.value)
              }
              placeholder="28"
            />
          </div>

          {/* Temperature */}

          <div className="form-field">
            <label>추출 온도</label>

            <input
              type="number"
              value={temperature}
              onChange={(e) =>
                setTemperature(e.target.value)
              }
              placeholder="93"
            />
          </div>

          {/* Ratio */}

          <div className="form-field">
            <label>추출 비율</label>

            <div className="ratio-display">
              1 : {ratio || "-"}
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          Tasting
      ========================= */}

      <section className="form-section">
        <h2>관능 평가</h2>

        {/* Rating */}

        <div className="form-field">
          <label>만족도</label>

          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                className={
                  star <= rating ? "active" : ""
                }
                onClick={() => setRating(star)}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* Note */}

        <div className="form-field">
          <label>총평</label>

          <textarea
            value={note}
            onChange={(e) =>
              setNote(e.target.value)
            }
            placeholder="오늘의 추출 결과를 기록하세요"
          />
        </div>
      </section>

      {/* Submit */}

      <div className="form-actions">
        <button
          type="submit"
          className="save-button"
        >
          {submitText}
        </button>
      </div>
    </form>
  );
}