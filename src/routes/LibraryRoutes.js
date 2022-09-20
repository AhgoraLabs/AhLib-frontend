import { BrowserRouter as Routes, Route } from "react-router-dom";
import { NavRoute } from "../routes/NavRoute";
import Reports from "../pages/Reports";
import Login from "../pages/Login/index";
import Navbar from "../components/Navbar/Navbar";
import Books from "../pages/ListBooks/index";
import ReportPage from "../pages/GenerateReport";
import BookInfo from "../pages/BookInfo";
import BookLoan from "../pages/BookLoan";
import BookRegister from "../pages/BookRegister";
import Home from "../pages/Home/index.js";
import Suggestions from "../pages/Suggestions";
import Profile from "../pages/Profile";
import UserRegister from "../pages/Login/UserRegister";
import Season from "../pages/Seasons/index";
import AboutUs from "../pages/AboutUs/index";
import download from "../pages/Download";
import SeasonRegister from "../pages/Seasons/SeasonRegister";
import Requests from '../pages/Requests/index'
import ManagerLoans from '../pages/ManagerLoans/index';

const LibraryRouter = () => {
    return (
        <div>
            <Routes>
                <Route exact path="/" component={Login}></Route>
                <Route exact path="/register" component={UserRegister}></Route>
                <NavRoute exact path="/home" header={<Navbar />} component={Home}></NavRoute>
                <NavRoute exact path="/relatorios" header={<Navbar />} component={Reports}></NavRoute>
                <NavRoute exact path="/livros" header={<Navbar />} component={Books}></NavRoute>
                <NavRoute exact path="/recomendacao" header={<Navbar />} component={Season}></NavRoute>
                <NavRoute exact path="/recomendacao/adicionar" header={<Navbar />} component={SeasonRegister}></NavRoute>
                <NavRoute exact path="/livros/info/:id" header={<Navbar />} component={BookInfo}></NavRoute>
                <NavRoute exact path="/livros/loan/:id" header={<Navbar />} component={BookLoan}></NavRoute>
                <NavRoute exact path="/livros/cadastrar" header={<Navbar />} component={BookRegister}></NavRoute>
                <NavRoute exact path="/perfil" header={<Navbar />} component={Profile}></NavRoute>
                <NavRoute exact path="/livros/edit/:id" header={<Navbar />} component={BookRegister}></NavRoute>
                <NavRoute exact path="/relatorios/avaliacoes" header={<Navbar />} component={ReportPage}></NavRoute>
                <NavRoute exact path="/sugestoes/" header={<Navbar />} component={Suggestions}></NavRoute>
                <NavRoute exact path="/sobre" header={<Navbar />} component={AboutUs}></NavRoute>
                <NavRoute exact path='/emprestimos' header={<Navbar />} component={ManagerLoans}></NavRoute>
                <NavRoute exact path="/download" header={<Navbar />} component={download}></NavRoute>
                <NavRoute exact path="/requests" header={<Navbar />} component={Requests}></NavRoute>

            </Routes>
        </div>
    );
};

export default LibraryRouter;
