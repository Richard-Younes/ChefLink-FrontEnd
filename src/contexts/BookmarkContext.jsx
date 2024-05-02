/** @format */

import { createContext, useContext, useEffect, useState } from 'react';
import { url } from '../values';
import { useUser } from './UserContext';

const Base_URL = url;

const BookmarkContext = createContext();

function BookmarkProvider({ children }) {
	const [bookmarkedItems, setBookmarkedItems] = useState(null);
	const [synchronizeBookmark, setSynchronizeBookmark] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const { isLogged } = useUser();

	useEffect(() => {
		if (!isLogged) return () => {};
		async function fetchBookmarks() {
			try {
				setIsLoading(true);
				const response = await fetch(`${Base_URL}auth/get_bookmarks`, {
					method: 'GET',
					credentials: 'include',
				});

				const data = await response.json();

				if (!response.ok) {
					throw new Error(`Failed to fetch bookmarks: ${data.error}`);
				}
				setBookmarkedItems(data.msg.Bookmarks);
			} catch (error) {
				console.error(`Error with checking bookmark💥💥:${error}`);
			} finally {
				setIsLoading(false);
			}
		}
		fetchBookmarks();
	}, [synchronizeBookmark, isLogged]);

	function bookmarkUnbookmark(foodId, setIsBookmarked = () => {}) {
		const sentData = { food_id: foodId };

		async function addremoveBookmark() {
			try {
				setIsLoading(true);

				const response = await fetch(`${url}auth/add_rem_bookmarks`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					credentials: 'include',
					body: JSON.stringify(sentData),
				});

				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.error);
				}

				setSynchronizeBookmark(() => !synchronizeBookmark);

				if (data.msg === 'BOOKMARKED') {
					setIsBookmarked(true);
				}
				if (data.msg === 'UNBOOKMARKED') {
					setIsBookmarked(false);
				}
			} catch (error) {
				console.error(`Error with adding/removing bookmark💥💥:${error}`);
			} finally {
				setIsLoading(false);
			}
		}
		addremoveBookmark();
	}

	return (
		<BookmarkContext.Provider
			value={{ bookmarkedItems, bookmarkUnbookmark, isLoading }}>
			{children}
		</BookmarkContext.Provider>
	);
}

function useBookmark() {
	const context = useContext(BookmarkContext);
	if (context === undefined) {
		throw new Error('Bookmark context was used outside the BookmarkContext');
	}
	return context;
}

export { BookmarkProvider, useBookmark };
