import LibraryRouter from '../src/routes/LibraryRoutes';


import {
	BrowserRouter as Routes,
	Route,
	Switch
} from "react-router-dom";
import { NavRoute } from "./routes/NavRoute";
import Reports from './pages/Reports';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Books from './pages/Books';
import ReportPage from './pages/GenerateReport';
import BookInfo from "./pages/BookInfo";
import BookRegister from "./pages/BookRegister";
import Home from "./pages/Home";
import Suggestions from './pages/Suggestions';


const App = () => {

	return (
		<div >

			<LibraryRouter />			
		</div>
	);
}
//relatorios / tem que ser alguma regex vendo o path do usuario, e com algum objeto literal pra retornar o component com o parametro, algo assim

export default App;
