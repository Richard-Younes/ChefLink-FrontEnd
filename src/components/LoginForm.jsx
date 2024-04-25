/** @format */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { url } from '../values';
import { useUser } from '../contexts/UserContext';
function LoginForm() {
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [response, setResponse] = useState(true);

	const { setUser } = useUser();

	const navigate = useNavigate();

	function handleSubmit(e) {
		e.preventDefault();

		const sendData = { username: userName, password: password };
		async function getUserProfile() {
			try {
				const res = await fetch(`${url}auth/get_profile`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
					credentials: 'include',
				});

				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.error);
				}
				setUser(data.data.username);

				navigate('/');
			} catch (error) {
				console.error(`Get user profile error 💥💥:${error}`);
			}
		}

		async function Login() {
			try {
				const res = await fetch(`${url}auth/login`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					credentials: 'include',

					body: JSON.stringify(sendData),
				});
				setResponse(res.ok);

				const data = await res.json();

				if (data.error === 'ALREADY_LOGGED_IN') {
					getUserProfile();
					return;
				}
				if (!res.ok) {
					throw new Error(`${data.error}`);
				}

				if (userName) {
					setUser(userName);
					navigate('/');
				}

				console.log(`Login: ${data.status}`);
			} catch (error) {
				console.error(`Log in error 💥💥:${error}`);
			}
		}

		Login();
	}

	return (
		<form className='form login__form' onSubmit={handleSubmit}>
			<img
				className='logo u-margin-bottom-small'
				src='public/Logo.webp'
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

export default LoginForm;
