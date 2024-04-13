/** @format */
import { useState } from 'react';
import logo from '../assets/Logo.webp';
import { Link, useNavigate } from 'react-router-dom';

function getCookie(cname) {
	let name = cname + '=';
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return '';
}

export default function Login({ setUser }) {
	return (
		<main className='login'>
			<Form setUser={setUser} />
		</main>
	);
}

function Form({ setUser }) {
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [response, setResponse] = useState(true);

	const navigate = useNavigate();

	function handleSubmit(e) {
		e.preventDefault();

		const sendData = { username: userName, password: password };

		async function Login() {
			try {
				const res = await fetch(
					'https://cheflink-gateway.onrender.com/auth/login',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						credentials: 'include',

						body: JSON.stringify(sendData),
					}
				);

				console.log(res);
				const data = await res.json();
				console.log(data);

				console.log(document.cookie);
			} catch (error) {
				console.error(`AJAX error 💥💥:${error}`);
			}
		}
		Login();
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
