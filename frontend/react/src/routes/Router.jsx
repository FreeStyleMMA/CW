import {BrowserRouter,Routes,Route} from "react-router-dom";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import RecipeMainPage from "../recipe/RecipeMainPage";
import RecipeWrite from "../recipe/RecipeWrite";
import EspressoMain from "../recipe/espresso/EspressoMain";
import EspressoWrite from "../recipe/espresso/EspressoWrite";
import EspressoDetail from "../recipe/espresso/EspressoDetail";
import EspressoUpdate from "../recipe/espresso/EspressoUpdate";

export default function Router(){
    return(
        <BrowserRouter>
        <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/register" element={<RegisterPage/>}/>
    <Route path="/recipe" element={<RecipeMainPage/>}/>
    <Route path="/recipe/write" element={<RecipeWrite/>}/>
    <Route path="/recipe/espresso" element={<EspressoMain/>}/>
    <Route path="/recipe/espresso/write" element={<EspressoWrite/>}/>
    <Route path="/recipe/espresso/:id" element={<EspressoDetail/>}/>
    <Route path="/recipe/espresso/:id/edit" element={<EspressoUpdate/>}/>

        </Routes>
        </BrowserRouter>
    )
}