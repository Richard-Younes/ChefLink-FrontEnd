/** @format */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import SignUp from './pages/SignUp';
import { UserProvider } from './contexts/UserContext';

export default function App() {
	return (
		<UserProvider>
			<BrowserRouter>
				<Routes>
					<Route index element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/signup' element={<SignUp />} />
				</Routes>
			</BrowserRouter>
		</UserProvider>
	);
}
