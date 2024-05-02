/** @format */
import { useParams } from 'react-router-dom';
import styles from './Modal.module.css';
import { useEffect, useState } from 'react';
import { url } from '../values';

function Modal({ foodName }) {
	const { id } = useParams();
	const [foodInfo, setFoodInfo] = useState({});

	useEffect(() => {
		async function getFoodInfo() {
			try {
				const res = await fetch(`${url}food/get_ingred_options?food_id=${id}`, {
					credentials: 'include',
				});

				const data = await res.json();

				if (!res.ok) {
					throw new Error(`Failed to fetch food info: ${data.error}`);
				}

				setFoodInfo(data.data);
			} catch (error) {
				console.error(`Error with fetching food info💥💥:${error}`);
			}
		}

		getFoodInfo();
	}, [id]);

	console.log(foodInfo);

	return (
		<div className={styles.modalContainer}>
			<h1>{foodName}</h1>
			<img src='../public/burger1.jpg' alt='Burger' />
		</div>
	);
}

export default Modal;
