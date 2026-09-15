import {BrowserRouter,Routes,Route} from "react-router-dom";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import RecipeMainPage from "../recipe/RecipeMainPage";
import EspressoMain from "../recipe/espresso/EspressoMain";
import EspressoWrite from "../recipe/espresso/EspressoWrite";
import EspressoDetail from "../recipe/espresso/EspressoDetail";
import EspressoUpdate from "../recipe/espresso/EspressoUpdate";
import BeanComparePage from "../recipe/espresso/BeanCompairPage";
import BeanMain from "../bean/BeanMain";
import BeanWrite from "../bean/BeanWrite";
import BeanDetail from "../bean/BeanDetail";
import BeanEdit from "../bean/BeanEdit";


export default function Router(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signup" element={<RegisterPage/>}/>
            <Route path="/recipe" element={<RecipeMainPage/>}/>
            <Route path="/recipe/espresso" element={<EspressoMain/>}/>
            <Route path="/recipe/espresso/write" element={<EspressoWrite/>}/>
            <Route path="/recipe/espresso/:id" element={<EspressoDetail/>}/>
            <Route path="/recipe/espresso/:id/edit" element={<EspressoUpdate/>}/>
            <Route path="/beans"  element={<BeanMain />}/>
            <Route path="/beans/write" element={<BeanWrite />} />
            <Route path="/beans/:id" element={<BeanDetail />}/>
            <Route path="/beans/:id/edit" element={<BeanEdit />}/>
            <Route  path="/recipe/espresso/compare" element={<BeanComparePage />}/>
        </Routes>
        </BrowserRouter>
    )
}