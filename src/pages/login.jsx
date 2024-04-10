/** @format */
import { useState } from 'react';
import logo from '../assets/Logo.webp';
import AJAX from './auth';
import { Link } from 'react-router-dom';

export default function Login() {
	return (
		<main className='login'>
			<Form />
		</main>
	);
}

function Form() {
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [response, setResponse] = useState(true);

	async function handleSubmit(e) {
		e.preventDefault();
		if (!userName || !password) return;

		const res = await AJAX('https://cheflink-gateway.onrender.com/auth/login', {
			username: userName,
			password: password,
		});

		setResponse(() => res);
		if (res) {
			window.location.href = '/';
		}
		console.log('Response:', res);
	}

	return (
		<form className='form login__form' onSubmit={handleSubmit}>
			<img
				className='logo u-margin-bottom-small'
				src={logo}
				alt='ChefLink logo'
			/>

			<div className={`form__input ${response ? 'u-margin-bottom-small' : ''}`}>
				<label htmlFor='username' className='form__input-label'>
					Username/Phone
				</label>
				<input
					type='text'
					className='form__input-box'
					id='email'
					name='email'
					placeholder='Luidovic'
					value={userName}
					onChange={e => setUserName(e.target.value)}
					required
				/>
			</div>
			{response ? (
				''
			) : (
				<p className='error__message'>* Incorrect username or password</p>
			)}
			<div className='form__input u-margin-bottom-small'>
				<label htmlFor='password' className='form__input-label'>
					Password
				</label>
				<input
					type='password'
					className='form__input-box u-margin-bottom-ss'
					id='password'
					name='password'
					placeholder='Password'
					value={password}
					onChange={e => setPassword(e.target.value)}
					required
				/>
				<br />
				<a href='#' className='link'>
					Forgot password?
				</a>
			</div>

			<button className='btn btn__login btn--orange btn--animated u-margin-bottom-ss'>
				Login
			</button>

			<p className='form__text'>
				Don&apos;t have an account? &nbsp;
				<Link className='link' to='/signup'>
					Sign up
				</Link>
			</p>
		</form>
	);
}
