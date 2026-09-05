import { useEffect, useState } from "react";
import "./EspressoForm.css";

export default function EspressoForm({
  initialData = {},
  onSubmit,
  submitText = "Save",
}) {

  const [bean, setBean] = useState("");
  const [dose, setDose] = useState("");
  const [grindingSize, setGrindingSize] = useState("");
  const [espressoOutput, setEspressoOutput] = useState("");
  const [extractSecond, setExtractSecond] = useState("");
  const [temperature, setTemperature] = useState("");
  const [rating, setRating] = useState(0);
  const [note, setNote] = useState("");


  // Update 페이지에서 기존 데이터 주입
  useEffect(() => {

    setBean(initialData.bean ?? "");
    setDose(initialData.dose ?? "");
    setGrindingSize(initialData.grindingSize ?? "");
    setEspressoOutput(initialData.espressoOutput ?? "");
    setExtractSecond(initialData.extractSecond ?? "");
    setTemperature(initialData.temperature ?? "");
    setRating(initialData.rating ?? 0);
    setNote(initialData.note ?? "");

  }, [initialData]);


  const ratio =
    dose && espressoOutput
      ? (Number(espressoOutput) / Number(dose)).toFixed(2)
      : "";


  const handleSubmit = (e) => {

    e.preventDefault();

    onSubmit({

      bean,

      dose,

      grindingSize,

      espressoOutput,

      extractSecond,

      temperature,

      ebr: ratio,

      rating,

      note,

    });
  };


  return (

    <form
      className="espresso-form"
      onSubmit={handleSubmit}
    >

      <section className="form-section">

        <h2>Coffee</h2>

        <div className="form-field">

          <label>Bean</label>

          <input
            value={bean}
            onChange={(e) => setBean(e.target.value)}
            placeholder="예: Ethiopia Guji"
          />

        </div>

      </section>


      <section className="form-section">

        <h2>Recipe</h2>

        <div className="form-grid">

          <div className="form-field">

            <label>Dose</label>

            <input
              type="number"
              step="0.1"
              value={dose}
              onChange={(e) => setDose(e.target.value)}
              placeholder="18"
            />

          </div>


          <div className="form-field">

            <label>Output</label>

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


          <div className="form-field">

            <label>Grind Size</label>

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


          <div className="form-field">

            <label>Extraction Time</label>

            <input
              type="number"
              value={extractSecond}
              onChange={(e) =>
                setExtractSecond(e.target.value)
              }
              placeholder="28"
            />

          </div>


          <div className="form-field">

            <label>Temperature</label>

            <input
              type="number"
              value={temperature}
              onChange={(e) =>
                setTemperature(e.target.value)
              }
              placeholder="93"
            />

          </div>


          <div className="form-field">

            <label>Ratio</label>

            <div className="ratio-display">

              1 : {ratio || "-"}

            </div>

          </div>

        </div>

      </section>


      <section className="form-section">

        <h2>Tasting</h2>


        <div className="form-field">

          <label>Rating</label>

          <div className="rating-stars">

            {[1, 2, 3, 4, 5].map((star) => (

              <button
                type="button"
                key={star}
                className={
                  star <= rating
                    ? "active"
                    : ""
                }
                onClick={() => setRating(star)}
              >
                ★
              </button>

            ))}

          </div>

        </div>


        <div className="form-field">

          <label>Note</label>

          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="맛과 추출 결과를 기록하세요."
          />

        </div>

      </section>


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