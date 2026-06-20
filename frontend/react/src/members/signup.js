import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import './signup.css';
export default function SignUp() {
const [id, setMemberId] = useState("");
const [pw, setMemberPw] = useState("");
const [nickname, setNickname] = useState("");

const handleSignUp = async (e) => {
    e.preventDefault();
    try{
         const response = await axios.post("http://localhost:8080/members/signUp",
        { id: id, pw: pw, nickname: nickname }
        , { withCredentials: true }
      );
    if(response.data.SignupSuccess){
        alert("회원가입 성공")
        // navigation("/signIn");
    }
}
    catch(error){
console.log("서버 에러 발생")
    }
return (
    <div id='myLayout'>
      <form onSubmit={handleSignUp} id='join_layout'>
        <input
          className="input_box"
          value={id}
          onChange={(e) => setId(e.target.value)}
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
          placeholder="닉네임"
        />
        <button type="submit" id="join_button"
        >회원가입</button>
      </form>
    </div>
  )
}
}