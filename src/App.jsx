/** @format */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import SignUp from './pages/SignUp';
import { UserProvider } from './contexts/UserContext';
import Modal from './components/Modal';
import Bookmark from './pages/Bookmark';
import Cart from './pages/Cart';
import Layout from './pages/Layout';

export default function App() {
	return (
		<UserProvider>
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={
							<Layout>
								<Home />
							</Layout>
						}>
						<Route path='/:id' element={<Modal />} />
					</Route>
					<Route path='/login' element={<Login />} />
					<Route path='/signup' element={<SignUp />} />
					<Route
						path='/bookmark'
						element={
							<Layout>
								<Bookmark />
							</Layout>
						}
					/>
					<Route
						path='/cart'
						element={
							<Layout>
								<Cart />
							</Layout>
						}
					/>
				</Routes>
			</BrowserRouter>
		</UserProvider>
	);
}
