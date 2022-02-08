import { BrowserRouter as Routes, Route } from "react-router-dom";
import { NavRoute } from "../routes/NavRoute";
import Reports from "../pages/Reports";
import Login from "../pages/Login";
import Navbar from "../components/Navbar";
import Books from "../pages/Books";
import ReportPage from "../pages/GenerateReport";
import BookInfo from "../pages/BookInfo";
import BookLoan from "../pages/BookLoan";
import BookRegister from "../pages/BookRegister";
import Home from "../pages/Home";
import Suggestions from "../pages/Suggestions";
import Profile from "../pages/Profile";
import UserRegister from "../pages/UserRegister";
import Season from "../pages/Season";
import AboutUs from "../pages/AboutUs/index";

const LibraryRouter = () => {
    return (
        <div>
            <Routes>
                <NavRoute exact path="/" component={Login}></NavRoute>
                <Route exact path="/register" component={UserRegister}></Route>
                <NavRoute exact path="/home" header={<Navbar />} component={Home}></NavRoute>
                <NavRoute exact path="/relatorios" header={<Navbar />} component={Reports}></NavRoute>
                <NavRoute exact path="/livros" header={<Navbar />} component={Books}></NavRoute>
                <NavRoute exact path="/recomendacao" header={<Navbar />} component={Season}></NavRoute>
                <NavRoute exact path="/livros/info/:id" header={<Navbar />} component={BookInfo}></NavRoute>
                <NavRoute exact path="/livros/loan/:id" header={<Navbar />} component={BookLoan}></NavRoute>
                <NavRoute exact path="/livros/cadastrar" header={<Navbar />} component={BookRegister}></NavRoute>
                <NavRoute exact path="/perfil" header={<Navbar />} component={Profile}></NavRoute>
                <NavRoute exact path="/livros/edit/:id" header={<Navbar />} component={BookRegister}></NavRoute>
                <NavRoute exact path="/relatorios/avaliacoes" header={<Navbar />} component={ReportPage}></NavRoute>
                <NavRoute exact path="/sugestoes/" header={<Navbar />} component={Suggestions}></NavRoute>
                <NavRoute exact path="/sobre" header={<Navbar />} component={AboutUs}></NavRoute>
            </Routes>
        </div>
    );
};

export default LibraryRouter;
