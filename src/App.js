
import {
	BrowserRouter as Routes,
	Route,
} from "react-router-dom";
import Reports from './pages/Reports';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Books from './pages/Books';
import ReportPage from './pages/GenerateReport';

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
				<NavRoute exact path='/relatorios/avaliacoes' component={ReportPage}></NavRoute>
			</Routes>
		</div>
	);
}
//relatorios / tem que ser alguma regex vendo o path do usuario, e com algum objeto literal pra retornar o component com o parametro, algo assim

export default App;
