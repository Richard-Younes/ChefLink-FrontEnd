/** @format */
import { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Popup from 'reactjs-popup';
import Modal from './Modal';
import { useBookmark } from '../contexts/BookmarkContext';

function FoodInfoContainer({ item }) {
	const [isBookmarked, setIsBookmarked] = useState(false);
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

	function handleBookmark() {
		if (!isLogged) {
			navigate('/login');
			return;
		}

		bookmarkUnbookmark(item.id_food, setIsBookmarked);
	}

	return (
		<div className='food-container'>
			<img
				className='food-container__image'
				src='public/burger1.jpg'
				alt='Food image'
			/>
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
					<Modal foodName={item.name} />
				</Popup>
			</div>
		</div>
	);
}

export default FoodInfoContainer;
