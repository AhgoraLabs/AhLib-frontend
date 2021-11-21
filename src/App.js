
import './App.css';
import Navbar from './components/Navbar';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from "react-router-dom";

function App() {
	return (
		<>
			<Router>
				<Switch>
				<Navbar/>
					<Route exact path='/'>
					</Route>
					<Route exact path='/relatorios'>
					</Route>
				</Switch>
			</Router>

		</>
	);
}

export default App;
