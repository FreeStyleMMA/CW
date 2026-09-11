import "./EspressoWrite.css";

import { useNavigate } from "react-router-dom";

import EspressoForm from "../../components/espresso/EspressoForm";

import { createRecipe } from "../../api/RecipeApi";

import { useAuth } from "../../context/AuthContext";

export default function EspressoWrite() {
  const navigate = useNavigate();
 const { user } = useAuth();


 
  const handleCreate = async (data) => {
    try {
      console.log("전송 memberId: "+ user.memberId)
      await createRecipe({
        ...data,
        
        memberId: user.memberId,
      });
      alert("Espresso 기록이 저장되었습니다.");

      navigate("/recipe/espresso");

    } catch (error) {

      console.error(
        "Espresso 저장 실패:",
        error
      );

      alert(
        "Espresso 기록 저장에 실패했습니다."
      );
    }
  };


  return (

    <div className="espresso-write-page">

      <div className="espresso-write-container">

        <header className="write-header">

          <p>COFFEE JOURNAL</p>

          <h1>에스프레소 노트</h1>

          <span>
            당신의 에스프레소를 기록하세요
          </span>

        </header>

        <EspressoForm
          onSubmit={handleCreate}
          submitText="저장"
        />

      </div>

    </div>
  );
}