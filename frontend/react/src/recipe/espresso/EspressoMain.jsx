import MainLayout from "../../layouts/MainLayout";
import "./EspressoMain.css";

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { getRecipes } from "../../api/RecipeApi";

import { useAuth } from "../../context/AuthContext";


export default function EspressoMain() {

  const { user } = useAuth();

  const {
    data: recipes = [],
    isLoading,
    isError,
  } = useQuery({

    queryKey: ["espressoRecords"],

    queryFn: () =>
      getRecipes(user.memberId),

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
<MainLayout>
    <div className="espresso-page">


      {/* Header */}

      <section className="espresso-header">

        <div>

          <p className="espresso-eyebrow">
            ESPRESSO JOURNAL
          </p>

          <h1>
            My Espresso
          </h1>

          <p className="espresso-description">
            내가 추출한 에스프레소를 기록하고 관리하세요.
          </p>

        </div>


        <Link
          to="/recipe/espresso/write"
          className="espresso-write-button"
          >
          + 추출 일지 작성
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

            <p>
              아직 기록된 Espresso가 없습니다.
            </p>

            <Link
              to="/recipe/espresso/write"
              >
              첫 번째 Espresso 기록하기
            </Link>

          </div>

) : (
  
  recipes.map((recipe) => {
    
    const dose =
    Number(recipe.dose);
    
    const output =
    Number(recipe.espressoOutput);
    
    
    const ratio =
    dose && output
    ? (
      output / dose
    ).toFixed(2)
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
                    원두 종류
                  </p>

                  <h2>
                    {recipe.beanName}
                  </h2>

                </div>


                {/* Recipe Data */}

                <div className="record-data">


                  <div className="record-item">

                    <span className="record-label">
                      도징량
                    </span>

                    <strong>

                      {recipe.dose}

                      <small>
                        {" "}g
                      </small>

                    </strong>

                  </div>


                  <div className="record-arrow">
                    →
                  </div>


                  <div className="record-item">

                    <span className="record-label">
                      추출량
                    </span>

                    <strong>

                      {recipe.espressoOutput}

                      <small>
                        {" "}g
                      </small>

                    </strong>

                  </div>


                  <div className="record-item">

                    <span className="record-label">
                      추출 시간
                    </span>

                    <strong>

                      {recipe.extractSecond}

                      <small>
                        {" "}sec
                      </small>

                    </strong>

                  </div>


                  <div className="record-item">

                    <span className="record-label">
                      추출 온도
                    </span>

                    <strong>

                      {recipe.temperature}

                      <small>
                        {" "}°C
                      </small>

                    </strong>

                  </div>


                  <div className="record-item ratio">

                    <span className="record-label">
                      추출 비율
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
        </MainLayout>

  );

}