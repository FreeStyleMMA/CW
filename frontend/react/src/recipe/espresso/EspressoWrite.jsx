import "./EspressoWrite.css";
import { useNavigate } from "react-router-dom";
import EspressoForm from "../../components/espresso/EspressoForm";
import { createEspresso } from "../../api/EspressoApi";

export default function EspressoWrite() {

  const navigate = useNavigate();


  const handleCreate = async (data) => {

    try {

      await createEspresso({

        ...data,

        memberId: "admin",

      });

      navigate("/recipe/espresso");

    } catch (error) {

      console.error("Espresso 저장 실패:", error);

      alert("Espresso 기록 저장에 실패했습니다.");
    }
  };


  return (

    <div className="espresso-write-page">

      <div className="espresso-write-container">

        <header className="write-header">

          <p>ESPRESSO JOURNAL</p>

          <h1>Record Espresso</h1>

          <span>
            오늘 추출한 에스프레소를 기록하세요.
          </span>

        </header>


        <EspressoForm
          onSubmit={handleCreate}
          submitText="Save Espresso"
        />

      </div>

    </div>
  );
}