/** @format */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import SignUp from './pages/SignUp';
import { useEffect, useState } from 'react';

export default function App() {
	const [user, setUser] = useState('Guest');
	useEffect(() => {
		localStorage.getItem('user') && setUser(localStorage.getItem('user'));
	}, []);
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Home user={user} setUser={setUser} />} />
				<Route
					path='/login'
					element={
						user === 'Guest' ? <Login setUser={setUser} /> : <Navigate to='/' />
					}
				/>
				<Route path='/signup' element={<SignUp />} />
			</Routes>
		</BrowserRouter>
	);
}
