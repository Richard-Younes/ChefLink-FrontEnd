/** @format */
import { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Popup from 'reactjs-popup';
import Modal from './Modal';
import { useBookmark } from '../contexts/BookmarkContext';
import { url } from '../values';
import SpinnerImage from './SpinnerImage';

function FoodInfoContainer({ item }) {
	const [isBookmarked, setIsBookmarked] = useState(false);
	const [foodImageURL, setFoodImageURL] = useState('');
	const { isLogged } = useUser();
	const navigate = useNavigate();

	const { id } = useParams();
	const { bookmarkedItems, bookmarkUnbookmark } = useBookmark();

	useEffect(() => {
		if (bookmarkedItems !== null && bookmarkedItems.length !== 0) {
			bookmarkedItems.map(bookmark => {
				if (bookmark === item.id_food) {
					setIsBookmarked(true);
				}
			});
		}
		return () => {};
	}, [bookmarkedItems, item.id_food]);

	useEffect(() => {
		async function getFoodImages() {
			try {
				const res = await fetch(`${url}media/generate_image_url_bulk`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					include: 'credentials',
					body: JSON.stringify({ paths: [`food/${item.id_food}`] }),
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

		getFoodImages();
	}, [item.id_food]);

	function handleBookmark() {
		if (!isLogged) {
			navigate('/login');
			return;
		}

		bookmarkUnbookmark(item.id_food, setIsBookmarked);
	}

	return (
		<div className='food-container'>
			{foodImageURL !== '' ? (
				<img
					className='food-container__image'
					src={foodImageURL}
					alt='Food image'
				/>
			) : (
				<SpinnerImage />
			)}
			<div className='food-container__header'>
				<p className='food-container__name'>{item.name}</p>
				<div className='food-container__bookmark-icon' onClick={handleBookmark}>
					{isBookmarked ? (
						<ion-icon name='bookmark'></ion-icon>
					) : (
						<ion-icon name='bookmark-outline'></ion-icon>
					)}
				</div>
			</div>

			<div className='food-container__info'>
				<ion-icon name='star'></ion-icon>
				<p className='food-container__rating'>{item.total_rating.toFixed(1)}</p>
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
						navigate('/');
					}}>
					<Modal foodName={item.name} foodId={item.id_food} />
				</Popup>
			</div>
		</div>
	);
}

export default FoodInfoContainer;
