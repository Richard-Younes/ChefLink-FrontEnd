/** @format */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './SignUpForm.module.css';

function SignUpForm() {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		username: '',
		password: '',
		verifyPassword: '',
		email: '',
		phone_nb: '',
		gender: '',
		first_name: '',
		last_name: '',
		date_of_birth: '',
		pp_url: '/profile/test.jpg',
	});

	const [passwordVerified, setPasswordVerified] = useState(true);

	function handleSubmit(e) {
		e.preventDefault();
		if (formData.password === formData.verifyPassword) {
			setPasswordVerified(true);
		} else {
			setPasswordVerified(false);
		}

		if (!passwordVerified) return;

		const sentData = {
			username: formData.username,
			password: formData.password,
			email: formData.email,
			phone_nb: formData.phone_nb,
			gender: formData.gender,
			first_name: formData.first_name,
			last_name: formData.last_name,
			date_of_birth: formData.date_of_birth,
			pp_url: formData.pp_url,
		};
		console.log(sentData);

		async function handleSignUp() {
			try {
				const res = await fetch(
					'https://flask-cheflink.onrender.com/auth/register',
					{
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(sentData),
					}
				);

				if (!res.ok) {
					console.log(res);
					const data = await res.json();
					throw new Error(data.error);
				}
				console.log('User Created');
				navigate('/login');
			} catch (err) {
				console.error(`💥💥 Error 💥💥: ${err}`);
			}
		}
		handleSignUp();
	}

	function handleChange(e, changedInput) {
		const { value } = e.target;
		setFormData({ ...formData, [changedInput]: value });
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<img src='public/logo.webp' alt='logo' className={styles.logo} />

			<div className={styles.inputContainer}>
				<label
					htmlFor='firstName'
					className={`${styles.label} ${styles.col1row1}`}>
					FirstName
				</label>
				<input
					onChange={e => handleChange(e, 'first_name')}
					required
					type='text'
					id='firstName'
					className={`${styles.input} ${styles.col1row2}`}
					placeholder='Luidovic'
				/>
				<label
					htmlFor='lastName'
					className={`${styles.label} ${styles.col2row1}`}>
					LastName
				</label>
				<input
					onChange={e => handleChange(e, 'last_name')}
					required
					type='text'
					id='lastName'
					className={`${styles.input} ${styles.col2row2}`}
					placeholder='Zgheib'
				/>

				<label
					htmlFor='userName'
					className={`${styles.label} ${styles.col1row3}`}>
					UserName
				</label>
				<input
					onChange={e => handleChange(e, 'username')}
					required
					type='text'
					id='userName'
					className={`${styles.input} ${styles.col1row4}`}
					placeholder='OpTenzz'
				/>
				<label
					htmlFor='phoneNumber'
					className={`${styles.label} ${styles.col2row3}`}>
					PhoneNumber
				</label>
				<input
					onChange={e => handleChange(e, 'phone_nb')}
					required
					type='tel'
					id='phoneNumber'
					className={`${styles.input} ${styles.col2row4}`}
					placeholder='71744406'
				/>

				<div className={styles.col1row5}>
					<label
						htmlFor='male'
						className={`${styles.label} ${styles.customRadio}`}>
						<span className={styles.radioLabel}>Male</span>
						<input
							onChange={e => handleChange(e, 'gender')}
							required
							type='radio'
							name='gender'
							id='male'
							value='Male'
						/>
						<span className={styles.radio}></span>
					</label>

					<label
						htmlFor='female'
						className={`${styles.label} ${styles.customRadio}`}>
						<span className={styles.radioLabel}>Female</span>
						<input
							onChange={e => handleChange(e, 'gender')}
							required
							type='radio'
							name='gender'
							id='female'
							value='Female'
						/>
						<span className={styles.radio}></span>
					</label>
				</div>
				<label
					htmlFor='dateOfBirth'
					className={`${styles.label} ${styles.col2row5}`}>
					Date of Birth
				</label>
				<input
					onChange={e => handleChange(e, 'date_of_birth')}
					required
					type='date'
					id='dateOfBirth'
					className={`${styles.input} ${styles.col2row6}`}
					placeholder='Luidovic'
				/>
				<label htmlFor='email' className={`${styles.label} ${styles.row7}`}>
					Email
				</label>
				<input
					onChange={e => handleChange(e, 'email')}
					required
					type='email'
					id='email'
					className={`${styles.input} ${styles.row8}`}
					placeholder='luidovic.zgheib@lau.edu'
				/>
				<label
					htmlFor='password'
					className={`${styles.label} ${styles.row9} ${
						passwordVerified ? '' : styles.wrongPassword
					}`}>
					{passwordVerified ? 'Password' : '*Passwords Do Not Match'}
				</label>
				<input
					onChange={e => handleChange(e, 'password')}
					required
					type='password'
					id='password'
					className={`${styles.input} ${styles.row10} `}
					placeholder='passowrd1234'
				/>

				<label
					htmlFor='verifyPassword'
					className={`${styles.label} ${styles.row11} ${
						passwordVerified ? '' : styles.wrongPassword
					}`}>
					{passwordVerified ? 'Verify Password' : '*Passwords Do Not Match'}
				</label>
				<input
					onChange={e => handleChange(e, 'verifyPassword')}
					required
					type='password'
					id='verifyPassword'
					className={styles.input + ' ' + styles.row12}
					placeholder='passowrd1234'
				/>

				<button
					type='submit'
					className={`${styles.button} ${styles.row14} btn btn__login btn--orange btn--animated u-margin-bottom-ss`}>
					Sign Up
				</button>
				<p className={`${styles.text} ${styles.row15} form__text`}>
					Already have an account?{' '}
					<Link to='/login' className='link'>
						Login
					</Link>
				</p>
			</div>
		</form>
	);
}

export default SignUpForm;
