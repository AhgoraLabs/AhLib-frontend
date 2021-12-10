
import {
	BrowserRouter as Routes,
	Route,
} from "react-router-dom";
import Reports from './pages/Reports';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Books from './pages/Books';
import BookInfo from "./pages/BookInfo";
import BookRegister from "./pages/BookRegister";

const App = () => {

	const NavRoute = ({ exact, path, component: Component, header: Header }) => (
		<Route exact={exact} path={path} render={(props) => (
			<div>
				{Header}
				<Component {...props} />
			</div>
		)} />
	)

	return (
		<div >
			<Routes>
				<NavRoute exact path='/' component={Login}></NavRoute>
				<NavRoute exact path='/relatorios' header={<Navbar/>} component={Reports}></NavRoute>
				<NavRoute exact path='/livros' header={<Navbar/>} component={Books}></NavRoute>
				<NavRoute exact path='/livros/bookInfo/:id' header={<Navbar/>} component={BookInfo}></NavRoute>
				<NavRoute exact path='/livros/cadastrar' header={<Navbar/>} component={BookRegister}></NavRoute>
			</Routes>
		</div>
	);
}

export default App;
