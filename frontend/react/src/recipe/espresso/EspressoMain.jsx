import "./EspressoMain.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

// Espresso 기록 조회
const getEspressoRecords = async () => {
  const response = await axios.get(
    "http://localhost:8080/api/recipe/getRecipes",
    {
      params: {
        memberId: "admin", // *** 추후 id 동적으로 가져오게 수정 ***
      },
      withCredentials: true,
    }
  );

  return response.data;
};

export default function EspressoMain() {
  const {
    data: recipes = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["espressoRecords"],
    queryFn: getEspressoRecords,
  });

  if (isLoading) {
    return (
      <div className="espresso-page">
        <div className="espresso-message">
          데이터 불러오는중...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="espresso-page">
        <div className="espresso-message">
          데이터를 불러오지 못했습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="espresso-page">

      {/* Header */}

      <section className="espresso-header">

        <div>
          <p className="espresso-eyebrow">
            ESPRESSO JOURNAL
          </p>

          <h1>My Espresso</h1>

          <p className="espresso-description">
            내가 추출한 에스프레소를 기록하고 관리하세요.
          </p>
        </div>

        <Link
          to="/recipe/espresso/write"
          className="espresso-write-button"
        >
          + Record Espresso
        </Link>

      </section>


      {/* Record Count */}

      <div className="espresso-toolbar">

        <span>
          {recipes.length} records
        </span>

      </div>


      {/* Records */}

      <section className="espresso-list">

        {recipes.length === 0 ? (

          <div className="espresso-empty">

            <p>아직 기록된 Espresso가 없습니다.</p>

            <Link to="/recipe/espresso/write">
              첫 번째 Espresso 기록하기
            </Link>

          </div>

        ) : (

          recipes.map((recipe) => {

            const dose = Number(recipe.dose);
            const output = Number(recipe.espressoOutput);

            const ratio =
              dose && output
                ? (output / dose).toFixed(2)
                : "-";

            return (
              <Link
                to={`/recipe/espresso/${recipe.id}`}
                key={recipe.id}
                className="espresso-record"
              >

                {/* Bean */}

                <div className="record-bean">

                  <p className="record-label">
                    BEAN
                  </p>

                  <h2>
                    {recipe.bean}
                  </h2>

                </div>


                {/* Recipe Data */}

                <div className="record-data">

                  <div className="record-item">

                    <span className="record-label">
                      DOSE
                    </span>

                    <strong>
                      {recipe.dose}
                      <small> g</small>
                    </strong>

                  </div>


                  <div className="record-arrow">
                    →
                  </div>


                  <div className="record-item">

                    <span className="record-label">
                      OUTPUT
                    </span>

                    <strong>
                      {recipe.espressoOutput}
                      <small> g</small>
                    </strong>

                  </div>


                  <div className="record-item">

                    <span className="record-label">
                      TIME
                    </span>

                    <strong>
                      {recipe.extractSecond}
                      <small> sec</small>
                    </strong>

                  </div>


                  <div className="record-item">

                    <span className="record-label">
                      TEMP
                    </span>

                    <strong>
                      {recipe.temperature}
                      <small> °C</small>
                    </strong>

                  </div>


                  <div className="record-item ratio">

                    <span className="record-label">
                      RATIO
                    </span>

                    <strong>
                      1 : {ratio}
                    </strong>

                  </div>

                </div>


                {/* Arrow */}

                <div className="record-link">
                  →
                </div>

              </Link>
            );
          })

        )}

      </section>

    </div>
  );
}