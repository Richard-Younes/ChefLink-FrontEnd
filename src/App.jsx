/** @format */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import SignUp from './pages/SignUp';
import { UserProvider } from './contexts/UserContext';
import Modal from './components/Modal';

export default function App() {
	return (
		<UserProvider>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />}>
						<Route path='/:id' element={<Modal />} />
					</Route>
					<Route path='/login' element={<Login />} />
					<Route path='/signup' element={<SignUp />} />
				</Routes>
			</BrowserRouter>
		</UserProvider>
	);
}
