import MainLayout from "../layouts/MainLayout";
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';

export default function LoginPage(){
      // 로그인 페이지
      const [email ,setEmail] = useState("");
    const [password,setPassword] = useState("");
    
     
    const handleLogin = async (e) => { /*로그인 로직 세팅*/ 
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:8080/api/auth",
                {email:email, password: password}
                ,{withCredentials: true}
            );
            console.log("요청 데이터:"+response.data);
        }catch(error){
        console.log("로그인 에러 발생")
    } 
}

    return(
        <div id='MainLayout'>
<form onSubmit={handleLogin} id=''>
       <input // 이메일 입력창
          className="input_box"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
        />
        <input //비밀번호 입력창
          className="input_box"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
        />
       
        
        <button type="submit" id=""
        >로그인
        </button>
       
      </form>

        </div>
    )
}