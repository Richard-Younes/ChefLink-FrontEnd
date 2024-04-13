/** @format */
import { useNavigate } from 'react-router-dom';
export default function Header({ user }) {
	return (
		<div className='header__container'>
			<div className='header'>
				<LogoHeader />
				<HeaderPagesList user={user} />
			</div>
		</div>
	);
}

export function LogoHeader() {
	const navigate = useNavigate();

	function handleClick() {
		navigate('/');
	}

	return (
		<div className='header__logo-container'>
			<img
				src='public/Logo.webp'
				alt='Logo image'
				className='header__logo-image'
				onClick={handleClick}
			/>
			<h2 className='header__logo-text' onClick={handleClick}>
				ChefLink
			</h2>
		</div>
	);
}

function HeaderPagesList({ user }) {
	return (
		<div className='page__list'>
			<div className='profile-pic'>
				<ion-icon name='person-circle'></ion-icon>
			</div>
			<p className='page__list-username'>{user}</p>
			<p className='page__list-elements active-page'>Home</p>
			<p className='page__list-elements'>Bookmark</p>
			<p className='page__list-elements'>Cart</p>
			<p className='page__list-elements'>Analytics</p>
			<p className='page__list-elements'>About Us</p>
			<p className='page__list-elements'>Settings</p>
		</div>
	);
}
