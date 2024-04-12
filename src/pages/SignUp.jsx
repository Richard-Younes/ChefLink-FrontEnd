/** @format */
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
		<form className={styles.form}>
			<img src={logo} alt='logo' className={styles.logo} />

			<div className={styles.inputContainer}>
				<label
					htmlFor='firstName'
					className={`${styles.label} ${styles.col1row1}`}>
					FirstName
				</label>
				<input
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
						<input required type='radio' name='gender' id='male' />
						<span className={styles.radio}></span>
					</label>

					<label
						htmlFor='female'
						className={`${styles.label} ${styles.customRadio}`}>
						<span className={styles.radioLabel}>Female</span>
						<input required type='radio' name='gender' id='female' />
						<span className={styles.radio}></span>
					</label>
				</div>
				<label
					htmlFor='dateOfBirth'
					className={`${styles.label} ${styles.col2row5}`}>
					Date of Birth
				</label>
				<input
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
					required
					type='email'
					id='email'
					className={`${styles.input} ${styles.row8}`}
					placeholder='luidovic.zgheib@lau.edu'
				/>
				<label htmlFor='password' className={`${styles.label} ${styles.row9}`}>
					Password
				</label>
				<input
					required
					type='password'
					id='password'
					className={`${styles.input} ${styles.row10}`}
					placeholder='passowrd1234'
				/>

				<label
					htmlFor='verifyPassword'
					className={`${styles.label} ${styles.row11}`}>
					Verify Password
				</label>
				<input
					required
					type='password'
					id='verifyPassword'
					className={styles.input + ' ' + styles.row12}
					placeholder='passowrd1234'
				/>
				<div className={styles.row13}>
					<label
						htmlFor='user'
						className={`${styles.label} ${styles.customRadio}`}>
						<span className={styles.radioLabel}>user</span>
						<input required type='radio' id='user' name='userType' />
						<span className={styles.radio}></span>
					</label>
					<label
						htmlFor='chef'
						className={`${styles.label} ${styles.customRadio}`}>
						<span className={styles.radioLabel}>chef</span>
						<input required type='radio' id='chef' name='userType' />
						<span className={styles.radio}></span>
					</label>
				</div>
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
