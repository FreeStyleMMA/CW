import { Link } from "react-router-dom";
import "./RecipeMainPage.css";
import MainLayout from "../layouts/MainLayout";

export default function RecipeMainPage() {
  return (
    <MainLayout>
    <div className="recipe-page">

      <section className="recipe-header">
        <p className="recipe-eyebrow">
          COFFEE WRITER
        </p>

        <h1>Recipe</h1>

        <p className="recipe-description">
          나만의 커피 추출 레시피를 기록하고 관리하세요.
        </p>
      </section>


      <section className="recipe-menu">

        <Link
          to="/recipe/espresso"
          className="recipe-card espresso-card"
        >
          <div className="recipe-card-content">

            <p className="recipe-card-category">
              ESPRESSO
            </p>

            <h2>Espresso</h2>

            <p>
              에스프레소 추출 레시피를 기록하고
              <br />
              나만의 샷을 관리하세요.
            </p>

          </div>

          <span className="recipe-card-arrow">
            →
          </span>
        </Link>


        <Link
          to="/recipe/brewing"
          className="recipe-card brewing-card"
        >
          <div className="recipe-card-content">

            <p className="recipe-card-category">
              BREWING
            </p>

            <h2>Brewing</h2>

            <p>
              핸드드립과 다양한 브루잉 레시피를
              <br />
              기록하고 관리하세요.
            </p>

          </div>

          <span className="recipe-card-arrow">
            →
          </span>
        </Link>

      </section>

    </div>
    </MainLayout>
  );
}