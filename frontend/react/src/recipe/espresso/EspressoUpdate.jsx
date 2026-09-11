import "./EspressoUpdate.css";


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

import EspressoForm from "../../components/espresso/EspressoForm";

import {
  getRecipe,  
  updateRecipe,
} from "../../api/RecipeApi";


export default function EspressoUpdate() {

  const { id } = useParams();

  const navigate = useNavigate();

  const queryClient = useQueryClient();



  // 상세 데이터

  const {
    data: recipe,
    isLoading,
    isError,
  } = useQuery({

    queryKey: ["espresso", id],

    queryFn: () => getEspresso(id),

  });


  // 수정

  const updateMutation = useMutation({

    mutationFn: (data) =>
      updateEspresso(id, data),

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["espresso", id],
      });

      queryClient.invalidateQueries({
        queryKey: ["espressos"],
      });

      navigate(`/recipe/espresso/${id}`);

    },

    onError: () => {

      alert("수정에 실패했습니다.");

    },

  });


  const handleUpdate = (data) => {

    updateMutation.mutate(data);

  };


  if (isLoading) {

    return (
      <div className="espresso-update-message">
        Loading...
      </div>
    );

  }


  if (isError || !recipe) {

    return (
      <div className="espresso-update-message">
        기록을 불러오지 못했습니다.
      </div>
    );

  }


  return (

    <div className="espresso-update-page">

      <div className="espresso-update-container">


        <div className="update-navigation">

          <Link
            to={`/recipe/espresso/${id}`}
          >
            ← Back to Espresso
          </Link>

        </div>


        <header className="update-header">

          <p>ESPRESSO JOURNAL</p>

          <h1>
            Edit Espresso
          </h1>

          <span>
            추출 기록을 수정하세요.
          </span>

        </header>


        <EspressoForm

          initialData={recipe}

          onSubmit={handleUpdate}

          submitText={
            updateMutation.isPending
              ? "Saving..."
              : "Save Changes"
          }

        />

      </div>

    </div>
  );
}