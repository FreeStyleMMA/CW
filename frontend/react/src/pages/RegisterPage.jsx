import MainLayout from "../layouts/MainLayout";
import Header from "../components/Header";
import {useState,useEffect} from "react"
import axios from "axios";

export default function RegisterPage(){

    // 회원가입 변수 세팅
    const [memberId,setMemberId] = useState("");
    const [password,setPassword] = useState("");
    const [nickname,setNickname] = useState("");
    const [email ,setEmail] = useState("");
    // const [nickName,setNickName] = useState("");
    // const [role,setRole] = useState("");

     
    const handleRegister = async (e) => { /*회원가입 로직 세팅*/ 
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:8080/members/register",
                {memberId: memberId, password: password, nickname: nickname, email:email}
                ,{withCredentials: true}
            );
            console.log("요청 데이터:"+response.data);
        }catch(error){
        console.log("회원가입 에러 발생")
    } 
}
    return(
        <div id='MainLayout'>
<form onSubmit={handleRegister} id=''>
        <input
          className="input_box"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
          placeholder="아이디"
        />
        <input
          className="input_box"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
        />
        <input
          className="input_box"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="이름"
        />
         <input
          className="input_box"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
        />
        <button type="submit" id=""
        >회원가입
        </button>
       
       
      </form>

        </div>
    )
}