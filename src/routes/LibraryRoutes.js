import {
	BrowserRouter as Routes,
	Route,
} from "react-router-dom";
import { NavRoute } from "../routes/NavRoute";
import Reports from '../pages/Reports';
import Login from '../pages/Login';
import Navbar from '../components/Navbar';
import Books from '../pages/Books';
import ReportPage from '../pages/GenerateReport';
import BookInfo from "../pages/BookInfo";
import BookRegister from "../pages/BookRegister";
import Home from "../pages/Home";
import Suggestions from '../pages/Suggestions';

const LibraryRouter = () => {
    return (
		<div >
			<Routes>
				<Route exact path='/' component={Login}></Route>
				<NavRoute exact path='/home' header={<Navbar />} component={Home}></NavRoute>
				<NavRoute exact path='/relatorios' header={<Navbar />} component={Reports}></NavRoute>
				<NavRoute exact path='/livros' header={<Navbar />} component={Books}></NavRoute>
				<NavRoute exact path='/livros/info/:id' header={<Navbar />} component={BookInfo}></NavRoute>
				<NavRoute exact path='/livros/cadastrar' header={<Navbar />} component={BookRegister}></NavRoute>
                <NavRoute exact path='/livros/edit/:id' header={<Navbar />} component={BookRegister}></NavRoute>
				<NavRoute exact path='/relatorios/avaliacoes' header={<Navbar />} component={ReportPage}></NavRoute>
				<NavRoute exact path='/sugestoes/' header={<Navbar />} component={Suggestions}></NavRoute>
			</Routes>
		</div>
	);
}

export default LibraryRouter;