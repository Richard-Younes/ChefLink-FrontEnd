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
import PaginationComponent from './PaginationComponent';
import SpinnerImage from './SpinnerImage';

function BookmarkedItems() {
	const { bookmarkedItems, bookmarkUnbookmark } = useBookmark();
	const [bookmarkedItemsInfo, setBookmarkedItemsInfo] = useState([]);
	const [foodImageURL, setFoodImageURL] = useState([]);
	const { id } = useParams();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	let items = [...bookmarkedItemsInfo];
	items = items?.map((item, index) => ({
		...item,
		picture: foodImageURL.length !== 0 ? foodImageURL[index] : '.',
	}));
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

	function removeBookmarkLocally(foodId, index) {
		const newItems = [...items]; // Create a copy of the array
		newItems.splice(index, 1); // Remove the item at the specified index

		// Update state with the modified array
		setBookmarkedItemsInfo(prevBookmarkedItems =>
			prevBookmarkedItems.filter(item => item.id_food !== foodId)
		);
		setFoodImageURL(prevFoodImageURL =>
			prevFoodImageURL.filter((_, i) => i !== index)
		);

		bookmarkUnbookmark(foodId);
	}

	const { isLogged } = useUser();

	useEffect(() => {
		let timer;
		if (bookmarkedItemsInfo?.length === 0) {
			timer = setTimeout(() => {
				setLoading(false);
			}, 2000);
		} else {
			setLoading(false);
		}
		return () => clearTimeout(timer);
	}, [bookmarkedItemsInfo?.length]);

	useEffect(() => {
		const foodIds = bookmarkedItemsInfo?.map(item => `food/${item.id_food}`);
		async function getFoodImages() {
			try {
				const res = await fetch(`${url}media/generate_image_url_bulk`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					include: 'credentials',
					body: JSON.stringify({ paths: foodIds }),
				});

				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.message);
				}

				setFoodImageURL(data.data);
			} catch (error) {
				console.error(error);
			}
		}
		if (foodIds) getFoodImages();
	}, [bookmarkedItemsInfo]);

	console.log(foodImageURL);
	console.log(bookmarkedItemsInfo);

	if (!isLogged) {
		return (
			<h2 className={styles.noBookmark}>Please login to view your bookmarks</h2>
		);
	}

	if (!bookmarkedItems) {
		return <Spinner />;
	}

	if (loading) {
		return <Spinner />;
	} else if (items?.length === 0) {
		return <h2 className={styles.noBookmark}>You have no bookmarked items</h2>;
	}

	return (
		<div className={styles.bookmarkContainer}>
			<PaginationComponent>
				{items?.map((item, index) => (
					<div className='food-container' key={index}>
						{foodImageURL.length !== 0 ? (
							<img
								className='food-container__image'
								src={item.picture}
								alt='Food image'
							/>
						) : (
							<SpinnerImage />
						)}
						<div className='food-container__header'>
							<p className='food-container__name'>{item.name}</p>
							<div
								className='food-container__bookmark-icon'
								onClick={() => removeBookmarkLocally(item.id_food, index)}>
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
								{close => (
									<Modal
										foodName={item.name}
										foodId={item.id_food}
										close={close}
									/>
								)}
							</Popup>
						</div>
					</div>
				))}
			</PaginationComponent>
		</div>
	);
}

export default BookmarkedItems;
