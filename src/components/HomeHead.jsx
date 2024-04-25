/** @format */

import { Link } from 'react-router-dom';
import { url } from '../values';
import { useUser } from '../contexts/UserContext';

/** @format */

function HomeHead({ navigate }) {
	const { user, setUser } = useUser();

	function handleLogOut() {
		async function logOut() {
			try {
				const res = await fetch(`${url}auth/logout`, {
					credentials: 'include',
				});
				const data = await res.json();
				if (!res.ok) {
					throw new Error(`${data.error}`);
				}

				// Logout successful
				setUser('Guest');
				console.log(`Log Out: ${data.status}`);
				navigate('/login');
			} catch (error) {
				console.error(`LogOut error 💥💥:${error}`);
			}
		}
		logOut();
	}

	return (
		<div className='home__content--top'>
			<form className='searchbar-form'>
				<input
					type='text'
					placeholder='Search'
					className='searchbar-form__input'
				/>
				<span className='search-icon'>
					<ion-icon name='search-sharp'></ion-icon>
				</span>
			</form>
			{user === 'Guest' ? (
				<Link to='login' className='btn btn--green-small home__btn'>
					Login
				</Link>
			) : (
				<a className='btn btn--red-small home__btn' onClick={handleLogOut}>
					Logout
				</a>
			)}
		</div>
	);
}

export default HomeHead;
