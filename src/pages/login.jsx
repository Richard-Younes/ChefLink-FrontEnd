/** @format */
import LoginForm from '../components/LoginForm';
export default function Login({ setUser }) {
	return (
		<main className='login'>
			<LoginForm setUser={setUser} />
		</main>
	);
}
