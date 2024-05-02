/** @format */
import styles from './BookmarkedItems.module.css';

import { useEffect, useState } from 'react';
import Spinner from './Spinner';
import { url } from '../values';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Popup from 'reactjs-popup';
import Modal from './Modal';
import { useBookmark } from '../contexts/BookmarkContext';
import { useUser } from '../contexts/UserContext';
import Pagination from './PaginationComponent';

function BookmarkedItems() {
	const { bookmarkedItems, bookmarkUnbookmark } = useBookmark();
	const [bookmarkedItemsInfo, setBookmarkedItemsInfo] = useState([]);
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (bookmarkedItems?.length === 0 || bookmarkedItems === null)
			return () => {};

		async function getFoodInfo() {
			try {
				const response = await fetch(`${url}food/get_minimal_info_food`, {
					method: 'POST',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ id_foods: bookmarkedItems }),
				});

				const data = await response.json();

				if (!response.ok) {
					throw new Error(`Failed to fetch bookmarks: ${data.error}`);
				}
				setBookmarkedItemsInfo(data.data);
			} catch (error) {
				console.error(`Error with checking bookmark💥💥:${error}`);
			}
		}

		getFoodInfo();
	}, [bookmarkedItems]);

	function removeBookmarkLocally(foodId) {
		const newBookmarkedItems = bookmarkedItemsInfo.filter(
			item => item.id_food !== foodId
		);

		setBookmarkedItemsInfo(newBookmarkedItems);

		bookmarkUnbookmark(foodId);
	}

	const { isLogged } = useUser();

	if (!isLogged) {
		return (
			<h2 className={styles.noBookmark}>Please login to view your bookmarks</h2>
		);
	}
	if (bookmarkedItemsInfo.length === 0) {
		return <h2 className={styles.noBookmark}>No bookmarked foods</h2>;
	}
	if (!bookmarkedItems) {
		return <Spinner />;
	}

	return (
		<div className={styles.bookmarkContainer}>
			<Pagination>
				{bookmarkedItemsInfo.map((item, index) => (
					<div className='food-container' key={index}>
						<img
							className='food-container__image'
							src='burger1.jpg'
							alt='Food image'
						/>
						<div className='food-container__header'>
							<p className='food-container__name'>{item.name}</p>
							<div
								className='food-container__bookmark-icon'
								onClick={() => removeBookmarkLocally(item.id_food)}>
								<ion-icon name='bookmark'></ion-icon>
							</div>
						</div>

						<div className='food-container__info'>
							<ion-icon name='star'></ion-icon>
							<p className='food-container__rating'>
								{item.total_rating.toFixed(1)}
							</p>
							<span className='food-container__time'>
								<ion-icon name='timer-outline'></ion-icon>
								<p className='food-container__time-text'>
									{item.timing.split(' ')[0]} min
								</p>
							</span>
						</div>

						<div className='food-container__footer'>
							<p>{`$${item.price}`}</p>
							<Popup
								open={() => (id === item.id_food ? true : false)}
								trigger={
									<Link to={`${item.id_food}`}>
										<button className='btn category__btn category__btn-active food-container__button'>
											Order
										</button>
									</Link>
								}
								modal
								onClose={() => {
									navigate('/bookmark');
								}}>
								<Modal foodName={item.name} />
							</Popup>
						</div>
					</div>
				))}
			</Pagination>
		</div>
	);
}

export default BookmarkedItems;
