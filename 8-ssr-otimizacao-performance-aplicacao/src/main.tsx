import ReactDOM from 'react-dom/client';
import './index.css';
import '@fontsource/poppins';
import '@fontsource/poppins/700.css';

import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Routes } from './routes';
import { AppContext } from './store/app';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<AppContext>
		<Header />
		<Router>
			<Routes />
		</Router>
		<Footer />
	</AppContext>
);
