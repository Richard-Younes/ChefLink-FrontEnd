/** @format */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo.webp';
import styles from './SignUp.module.css';
export default function SignUp() {
	return (
		<main className='login'>
			<Form />
		</main>
	);
}

function Form() {
	return (
		<form action='' className={styles.form}>
			<img src={logo} alt='logo' className={styles.logo} />
			<label htmlFor='FirstName' className={styles.label}>
				FirstName
				<input
					type='text'
					id='FirstName'
					className={styles.input}
					placeholder='Luidovic'
				/>
			</label>
			<label htmlFor='LastName' className={styles.label}>
				LastName
				<input
					type='text'
					id='LastName'
					className={styles.input}
					placeholder='Luidovic'
				/>
			</label>
			<label htmlFor='UserName' className={styles.label}>
				UserName
				<input
					type='text'
					id='UserName'
					className={styles.input}
					placeholder='Luidovic'
				/>
			</label>
			<label htmlFor='PhoneNumber' className={styles.label}>
				PhoneNumber
				<input
					type='tel'
					id='PhoneNumber'
					className={styles.input}
					placeholder='Luidovic'
				/>
			</label>
			<label htmlFor='email' className={styles.label}>
				Email
				<input type='email' id='email' className={styles.input} />
			</label>
			<label htmlFor='password' className={styles.label}>
				Password
				<input type='password' id='password' className={styles.input} />
			</label>
			<label htmlFor='VerifyPassword' className={styles.label}>
				Verify Password
				<input
					type='VerifyPassword'
					id='VerifyPassword'
					className={styles.input}
				/>
			</label>
			<button type='submit' className={styles.button}>
				Sign Up
			</button>
			<p className={styles.text}>
				Already have an account? <Link to='/login'>Login</Link>
			</p>
		</form>
	);
}
