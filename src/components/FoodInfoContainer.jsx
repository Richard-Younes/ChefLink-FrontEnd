/** @format */
import { useEffect, useState } from 'react';
import { url } from '../values';
import { useUser } from '../contexts/UserContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Popup from 'reactjs-popup';
import Modal from './Modal';

function FoodInfoContainer({ item }) {
	const [isBookmarked, setIsBookmarked] = useState(false);
	const { isLogged } = useUser();
	const navigate = useNavigate();

	const { id } = useParams();

	useEffect(
		function () {
			async function checkBookmark() {
				try {
					const response = await fetch(`${url}auth/get_bookmarks`, {
						method: 'GET',
						credentials: 'include',
					});
					if (!response.ok) {
						throw new Error(`Failed to fetch bookmarks: ${data.error}`);
					}

					const data = await response.json();

					const bookmarks = data.msg.Bookmarks;

					if (bookmarks !== undefined && bookmarks.length !== 0) {
						bookmarks.map(bookmark => {
							if (bookmark === item.id_food) {
								setIsBookmarked(true);
							}
						});
					}
				} catch (error) {
					console.error(`Error with checking bookmark💥💥:${error}`);
				}
			}

			checkBookmark();
		},
		[isLogged, item]
	);

	function handleBookmark() {
		if (!isLogged) {
			navigate('/login');
			return;
		}

		const sentData = { food_id: item.id_food };

		async function addremoveBookmark() {
			try {
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

				if (data.msg === 'BOOKMARKED') {
					setIsBookmarked(true);
				}
				if (data.msg === 'UNBOOKMARKED') {
					setIsBookmarked(false);
				}
			} catch (error) {
				console.error(`Error with adding/removing bookmark💥💥:${error}`);
			}
		}

		addremoveBookmark();
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
