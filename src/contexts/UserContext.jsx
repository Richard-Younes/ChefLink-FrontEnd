/** @format */

import { createContext, useContext, useEffect, useState } from 'react';
import { url } from '../values';

const Base_URL = url;

const UserContext = createContext();

function UserProvider({ children }) {
	const [user, setUser] = useState('Guest');
	const [isLogged, setIsLogged] = useState(false);

	useEffect(
		function () {
			async function fetchUser() {
				try {
					const response = await fetch(`${Base_URL}auth/get_profile`, {
						credentials: 'include',
					});
					const data = await response.json();

					if (data.data !== '') {
						setUser(data.data?.username);
						setIsLogged(true);
						console.log('User Provide Success');
					}
				} catch {
					console.error('Failed to fetch USER');
				}
			}

			fetchUser();
		},
		[user]
	);

	return (
		<UserContext.Provider
			value={{
				user,
				setUser,
				isLogged,
				setIsLogged,
			}}>
			{children}
		</UserContext.Provider>
	);
}

function useUser() {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error('User context was used outside the UserContext');
	}
	return context;
}

export { UserProvider, useUser };
