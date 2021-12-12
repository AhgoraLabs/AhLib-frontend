
import {
	BrowserRouter as Routes,
	Route,
} from "react-router-dom";
import { NavRoute } from "./routes/NavRoute";
import Reports from './pages/Reports';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Books from './pages/Books';
import BookInfo from "./pages/BookInfo";
import BookRegister from "./pages/BookRegister";
import Home from "./pages/Home";

const App = () => {

	return (
			<div >
				<Routes>
					<Route exact path='/' component={Login}></Route>
					<NavRoute exact path='/home' header={<Navbar />} component={Home}></NavRoute>
					<NavRoute exact path='/relatorios' header={<Navbar />} component={Reports}></NavRoute>
					<NavRoute exact path='/livros' header={<Navbar />} component={Books}></NavRoute>
					<NavRoute exact path='/livros/bookInfo/:id' header={<Navbar />} component={BookInfo}></NavRoute>
					<NavRoute exact path='/livros/cadastrar' header={<Navbar />} component={BookRegister}></NavRoute>
				</Routes>
			</div>
	);
}

export default App;
