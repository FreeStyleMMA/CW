import "./EspressoDetail.css";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getEspresso,
  deleteEspresso,
} from "../../api/EspressoApi";


export default function EspressoDetail() {

  const { id } = useParams();

  const navigate = useNavigate();

  const queryClient = useQueryClient();


  // =========================
  // 상세 조회
  // =========================

  const {
    data: recipe,
    isLoading,
    isError,
  } = useQuery({

    queryKey: ["espresso", id],

    queryFn: () => getEspresso(id),

  });


  // =========================
  // 삭제
  // =========================

  const deleteMutation = useMutation({

    mutationFn: () => deleteEspresso(id),

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["espressos"],
      });

      navigate("/recipe/espresso");

    },

    onError: () => {

      alert("삭제에 실패했습니다.");

    },

  });


  const handleDelete = () => {

    const confirmed = window.confirm(
      "이 Espresso 기록을 삭제하시겠습니까?"
    );

    if (!confirmed) return;

    deleteMutation.mutate();

  };


  // =========================
  // 상태
  // =========================

  if (isLoading) {

    return (
      <div className="espresso-detail-message">
        Loading...
      </div>
    );

  }


  if (isError || !recipe) {

    return (
      <div className="espresso-detail-message">
        기록을 불러오지 못했습니다.
      </div>
    );

  }


  const ratio =
    recipe.dose && recipe.espressoOutput
      ? (
          Number(recipe.espressoOutput) /
          Number(recipe.dose)
        ).toFixed(2)
      : "-";


  return (

    <div className="espresso-detail-page">

      <div className="espresso-detail-container">


        {/* Navigation */}

        <div className="detail-navigation">

          <Link
            to="/recipe/espresso"
            className="back-link"
          >
            ← Espresso Journal
          </Link>


          <div className="detail-actions">

            <button
              type="button"
              className="edit-button"
              onClick={() =>
                navigate(`/recipe/espresso/${id}/edit`,
                  {state:{recipe}}
                )
                }
            >
              Edit
            </button>


            <button
              type="button"
              className="delete-button"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending
                ? "Deleting..."
                : "Delete"}
            </button>

          </div>

        </div>


        {/* Header */}

        <header className="detail-header">

          <p>ESPRESSO RECORD</p>

          <h1>
            {recipe.bean}
          </h1>

        </header>


        {/* Recipe */}

        <section className="detail-recipe">

          <div>
            <span>DOSE</span>
            <strong>{recipe.dose}g</strong>
          </div>

          <div>
            <span>OUTPUT</span>
            <strong>
              {recipe.espressoOutput}g
            </strong>
          </div>

          <div>
            <span>TIME</span>
            <strong>
              {recipe.extractSecond}s
            </strong>
          </div>

          <div>
            <span>TEMP</span>
            <strong>
              {recipe.temperature}°C
            </strong>
          </div>

          <div>
            <span>GRIND</span>
            <strong>
              {recipe.grindingSize}
            </strong>
          </div>

          <div>
            <span>RATIO</span>
            <strong>
              1 : {ratio}
            </strong>
          </div>

        </section>


        {/* Media */}

        <section className="detail-section">

          <div className="detail-title">

            <span>01</span>

            <div>

              <h2>Media</h2>

              <p>
                추출 과정과 결과
              </p>

            </div>

          </div>


          <div className="media-empty">

            <span>+</span>

            <strong>
              Add Photo / Video
            </strong>

            <p>
              사진과 영상을 추가할 수 있습니다.
            </p>

          </div>

        </section>


        {/* Tasting */}

        <section className="detail-section">

          <div className="detail-title">

            <span>02</span>

            <div>

              <h2>Tasting</h2>

              <p>
                추출 결과와 맛
              </p>

            </div>

          </div>


          <div className="detail-rating">

            {[1, 2, 3, 4, 5].map((star) => (

              <span
                key={star}
                className={
                  star <= (recipe.rating ?? 0)
                    ? "active"
                    : ""
                }
              >
                ★
              </span>

            ))}

          </div>


          <p className="detail-note">

            {recipe.note ||
              "작성된 tasting note가 없습니다."}

          </p>

        </section>

      </div>

    </div>
  );
}