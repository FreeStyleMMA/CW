import "./RecipeWrite.css";
import { useState } from "react";
import axios from "axios";

export default function RecipeWrite() {
  const [bean, setBean] = useState("");
  const [grindingSize, setGrindingSize] = useState("");
  const [espressoOutput, setEspressoOutput] = useState("");
  const [extractSecond, setExtractSecond] = useState("");
  const [temperature, setTemperature] = useState("");
  const [dose, setDose] = useState("");
  const [memberId, setMemberId] = useState("admin");

  const ebr =
    dose && espressoOutput
      ? (Number(espressoOutput) / Number(dose)).toFixed(2)
      : "";

  const handleWrite = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/recipe/write",
        {
          bean,
          grindingSize,
          espressoOutput,
          extractSecond,
          temperature,
          ebr,
          memberId,
          dose,
        },
        {
          withCredentials: true,
        }
      );

      console.log("글쓰기 통신 성공 여부:", response.status);
    } catch (error) {
      console.log("레시피 쓰기 에러 발생", error);
    }
  };

  return (
    <div className="recipe-write-page">

      <div className="recipe-write-container">

        <header className="write-header">
          <p className="write-eyebrow">
            ESPRESSO JOURNAL
          </p>

          <h1>Record Espresso</h1>

          <p>
            오늘 추출한 에스프레소를 기록해보세요.
          </p>
        </header>


        <form
          className="recipe-form"
          onSubmit={handleWrite}
        >

          {/* Coffee */}

          <section className="form-section">

            <div className="section-title">
              <span>01</span>
              <h2>Coffee</h2>
            </div>

            <div className="form-group">
              <label htmlFor="bean">
                Bean
              </label>

              <input
                id="bean"
                className="input-box"
                value={bean}
                onChange={(e) => setBean(e.target.value)}
                placeholder="원두 이름을 입력하세요"
              />
            </div>

          </section>


          {/* Recipe */}

          <section className="form-section">

            <div className="section-title">
              <span>02</span>
              <h2>Recipe</h2>
            </div>


            <div className="input-grid">

              <div className="form-group">
                <label htmlFor="dose">
                  Dose
                </label>

                <div className="input-with-unit">
                  <input
                    id="dose"
                    className="input-box"
                    type="number"
                    step="0.1"
                    value={dose}
                    onChange={(e) => setDose(e.target.value)}
                    placeholder="18.0"
                  />

                  <span>g</span>
                </div>
              </div>


              <div className="form-group">
                <label htmlFor="espressoOutput">
                  Output
                </label>

                <div className="input-with-unit">
                  <input
                    id="espressoOutput"
                    className="input-box"
                    type="number"
                    step="0.1"
                    value={espressoOutput}
                    onChange={(e) =>
                      setEspressoOutput(e.target.value)
                    }
                    placeholder="40.0"
                  />

                  <span>g</span>
                </div>
              </div>


              <div className="form-group">
                <label htmlFor="grindingSize">
                  Grind Size
                </label>

                <input
                  id="grindingSize"
                  className="input-box"
                  type="number"
                  step="0.1"
                  value={grindingSize}
                  onChange={(e) =>
                    setGrindingSize(e.target.value)
                  }
                  placeholder="2.5"
                />
              </div>


              <div className="form-group">
                <label htmlFor="temperature">
                  Temperature
                </label>

                <div className="input-with-unit">
                  <input
                    id="temperature"
                    className="input-box"
                    type="number"
                    value={temperature}
                    onChange={(e) =>
                      setTemperature(e.target.value)
                    }
                    placeholder="93"
                  />

                  <span>°C</span>
                </div>
              </div>


              <div className="form-group full-width">
                <label htmlFor="extractSecond">
                  Extraction Time
                </label>

                <div className="input-with-unit">
                  <input
                    id="extractSecond"
                    className="input-box"
                    type="number"
                    value={extractSecond}
                    onChange={(e) =>
                      setExtractSecond(e.target.value)
                    }
                    placeholder="28"
                  />

                  <span>sec</span>
                </div>
              </div>

            </div>

          </section>


          {/* Ratio */}

          <section className="ratio-section">

            <div>
              <p>BREW RATIO</p>

              <strong>
                {ebr ? `1 : ${ebr}` : "1 : —"}
              </strong>
            </div>

            <span>
              Output ÷ Dose
            </span>

          </section>


          {/* Submit */}

          <div className="form-actions">

            <button
              type="button"
              className="cancel-button"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-button"
            >
              Save Espresso
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}