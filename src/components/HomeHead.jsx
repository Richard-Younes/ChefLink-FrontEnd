/** @format */

import { Link } from 'react-router-dom';
import { url } from '../values';
import { useUser } from '../contexts/UserContext';
import { useState, useEffect } from 'react';

/** @format */

function HomeHead({ navigate }) {
	const [searchQuery, setSearchQuery] = useState('');

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

	useEffect(() => {
		if (searchQuery !== '') {
			navigate(`/search?q=${searchQuery}`);
		} else navigate('/');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchQuery]);
	const handleChange = e => {
		setSearchQuery(e.target.value);
	};

	function handleSubmit(e) {
		e.preventDefault();
		setSearchQuery(e.target[0].value);
		document.activeElement.blur();
		navigate(`/search?q=${searchQuery}`);
	}

	return (
		<div className='home__content--top'>
			<form className='searchbar-form' onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='Search'
					className='searchbar-form__input'
					onChange={handleChange}
				/>
				<span className='search-icon'>
					<ion-icon name='search-sharp'></ion-icon>
				</span>
			</form>
			{user === 'Guest' ? (
				<Link to='/login' className='btn btn--green-small home__btn'>
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
