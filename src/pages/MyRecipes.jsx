/** @format */

import { useEffect, useState } from 'react';
import { url } from '../values';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import styles from './MyRecipes.module.css';
import PaginationComponent from '../components/PaginationComponent';
import SpinnerImage from '../components/SpinnerImage';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Popup from 'reactjs-popup';
import AddRecipeForm from '../components/AddRecipeForm';
function MyRecipes() {
	const { role } = useUser();
	const navigate = useNavigate();

	const [myRecipes, setMyRecipes] = useState([]);
	const [image, setImage] = useState([]);
	useEffect(() => {
		if (role !== 'chef') {
			return navigate('/');
		}
		async function getMyRecipes() {
			try {
				const res = await fetch(`${url}food/get_chef_foods`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
					credentials: 'include',
				});
				const data = await res.json();
				setMyRecipes(data.data);
			} catch (error) {
				console.log(error);
			}
		}

		getMyRecipes();
	}, [role]);

	useEffect(() => {
		if (myRecipes.length === 0) return;
		async function getImageUrl() {
			const foodIds = myRecipes.map(item => `food/${item.id_food}`);
			try {
				const res = await fetch(`${url}media/generate_image_url_bulk`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					credentials: 'include',
					body: JSON.stringify({ paths: [...foodIds] }),
				});
				const data = await res.json();
				setImage(data.data);
			} catch (error) {
				console.log(error);
			}
		}

		getImageUrl();
	}, [myRecipes.length]);

	useEffect(() => {
		setMyRecipes(prevState =>
			prevState.map((item, index) => ({
				...item,
				picture: image[index],
			}))
		);
	}, [image]);

	function handleDeleteMyRecipe(foodId) {
		async function deleteMyRecipe() {
			try {
				const res = await fetch(`${url}food/delete_food`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
					},
					credentials: 'include',
					body: JSON.stringify({ id_food: foodId }),
				});
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error);
				}
				setMyRecipes(prevState =>
					prevState.filter(item => item.id_food !== foodId)
				);
			} catch (error) {
				console.log(error);
			}
		}

		deleteMyRecipe();
	}

	function handleAddRecipe() {}
	return (
		<div>
			<h1>
				My recipe{' '}
				<Popup
					trigger={
						<AddCircleOutlineRoundedIcon
							sx={{
								fontSize: 25,
								color: '#28b485',
								cursor: 'pointer',
								marginBottom: '-3px',
							}}
						/>
					}
					modal>
					<AddRecipeForm />
				</Popup>
			</h1>
			<div className={styles.bookmarkContainer}>
				<PaginationComponent>
					{myRecipes?.map((item, index) => (
						<div className='food-container' key={index}>
							{image.length !== 0 ? (
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
							</div>

							<div className='food-container__info'>
								<ion-icon name='star'></ion-icon>
								<p className='food-container__rating'>
									{item.total_rating.toFixed(1)}
								</p>
								<ion-icon
									name='trash-outline'
									class={styles.trashIcon}
									onClick={() => handleDeleteMyRecipe(item.id_food)}></ion-icon>
							</div>
						</div>
					))}
				</PaginationComponent>
			</div>
		</div>
	);
}

export default MyRecipes;
