/** @format */

import {
	Link,
	useNavigate,
	useParams,
	useSearchParams,
} from 'react-router-dom';
import PaginationComponent from '../components/PaginationComponent';
import Spinner from '../components/Spinner';
import { useEffect, useState } from 'react';
import { url } from '../values';
import Popup from 'reactjs-popup';
import { useBookmark } from '../contexts/BookmarkContext';
import styles from './Search.module.css';
import Modal from '../components/Modal';
import SpinnerImage from '../components/SpinnerImage';

function Search() {
	const [searchResults, setSearchResults] = useState(null);
	const { id } = useParams();

	const [searchParams] = useSearchParams();
	const searchQuery = searchParams.get('q');
	const navigate = useNavigate();
	const { bookmarkedItems, bookmarkUnbookmark } = useBookmark();
	const [isLoading, setIsLoading] = useState(false);
	const [foodImageURL, setFoodImageURL] = useState([]);

	useEffect(() => {
		const handleSearch = async () => {
			try {
				setIsLoading(true);
				const res = await fetch(
					`${url}food/search_food?search=${searchQuery}`,
					{
						credentials: 'include',
					}
				);
				const data = await res.json();

				if (!res.ok) {
					throw new Error(`${data.error}`);
				}
				setSearchResults(data.data);
			} catch (error) {
				console.error(`Search error 💥💥:${error}`);
			} finally {
				setIsLoading(false);
			}
		};
		handleSearch();
	}, [searchQuery]);

	const foodIds = searchResults?.map(item => `food/${item.id_food}`);
	useEffect(() => {
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
	}, [foodIds]);

	if (searchResults === null || isLoading) return <Spinner />;
	if (searchResults.length === 0)
		return <h2 className={styles.noResults}>No results found</h2>;

	return (
		<div className={styles.searchContainer}>
			<h1>Search Results</h1>
			<PaginationComponent>
				{searchResults.map((item, index) => (
					<div className='food-container' key={index}>
						{foodImageURL.length !== 0 ? (
							<img
								className='food-container__image'
								src={foodImageURL?.[index]}
								alt='Food image'
							/>
						) : (
							<SpinnerImage />
						)}
						<div className='food-container__header'>
							<p className='food-container__name'>{item.name}</p>
							<div
								className='food-container__bookmark-icon'
								onClick={() => bookmarkUnbookmark(item.id_food)}>
								{bookmarkedItems?.find(element => element === item.id_food) !==
								undefined ? (
									<ion-icon name='bookmark'></ion-icon>
								) : (
									<ion-icon name='bookmark-outline'></ion-icon>
								)}
							</div>
						</div>

						<div className='food-container__info'>
							<ion-icon name='star'></ion-icon>
							<p className='food-container__rating'>
								{item.total_rating.toFixed(1)}
							</p>
							<span className='food-container__time'>
								<img
									src='chef.png'
									alt='chef logo'
									style={{
										width: '1.5rem',
										justifySelf: 'center',
										alignSelf: 'center',
										marginBottom: '0.2rem',
									}}
								/>
								<p className='food-container__time-text'>{item.chef_name}</p>
							</span>
						</div>

						<div className='food-container__footer'>
							<p>{`$${item.price}`}</p>
							<Popup
								open={() => (id === item.id_food ? true : false)}
								trigger={
									<button className='btn category__btn category__btn-active food-container__button'>
										Order
									</button>
								}
								modal
								onClose={() => {
									navigate(`/search?q=${searchQuery}`);
								}}>
								<Modal foodName={item.name} foodId={item.id_food} />
							</Popup>
						</div>
					</div>
				))}
			</PaginationComponent>
		</div>
	);
}

export default Search;
