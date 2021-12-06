
import {
	BrowserRouter as Routes,
	Route,
} from "react-router-dom";
import Reports from './pages/Reports';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Books from './pages/Books';
import BookInfo from "./pages/BookInfo";

const App = () => {

	const NavRoute = ({ exact, path, component: Component }) => (
		<Route exact={exact} path={path} render={(props) => (
			<div>
				<Navbar />
				<Component {...props} />
			</div>
		)} />
	)

	return (
		<div >
			<Routes>
				<NavRoute exact path='/' component={Home}></NavRoute>
				<NavRoute exact path='/relatorios' component={Reports}></NavRoute>
				<NavRoute exact path='/livros' component={Books}></NavRoute>
				<NavRoute exact path='/livros/bookInfo/:id' component={BookInfo}></NavRoute>
			</Routes>
		</div>
	);
}

export default App;
