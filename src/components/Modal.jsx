/** @format */
import { useParams } from 'react-router-dom';
import styles from './Modal.module.css';
import { useEffect, useState } from 'react';
import { url } from '../values';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import SpinnerImage from './SpinnerImage';
function Modal({ foodName, foodId }) {
	const { id } = useParams();
	const [foodInfo, setFoodInfo] = useState({});
	const [foodImage, setFoodImage] = useState('');
	const [quantity, setQuantity] = useState(1);
	const [instructions, setInstructions] = useState('');
	const [options, setOptions] = useState({});

	useEffect(() => {
		const foodOptions = foodInfo?.options?.map(option => option.option_name);
		const optionObject = foodOptions
			?.map(option => ({
				[option]: false,
			}))
			.reduce((acc, curr) => ({ ...acc, ...curr }), {});

		setOptions(() => ({ ...optionObject }));
	}, [foodInfo?.options]);

	useEffect(() => {
		async function getFoodInfo() {
			try {
				const res = await fetch(
					`${url}food/get_ingred_options?food_id=${id ? id : foodId}`,
					{
						credentials: 'include',
					}
				);

				const data = await res.json();

				if (!res.ok) {
					throw new Error(`Failed to fetch food info: ${data.error}`);
				}

				setFoodInfo(data.data);
			} catch (error) {
				console.error(`Error with fetching food info💥💥:${error}`);
			}
		}

		async function getFoodImage() {
			try {
				const res = await fetch(
					`${url}media/generate_image_url?path=food/${id ? id : foodId}`,
					{
						credentials: 'include',
					}
				);

				const data = await res.json();

				if (!res.ok) {
					throw new Error(`Failed to fetch food image: ${data.error}`);
				}

				setFoodImage(data.data);
			} catch (error) {
				console.error(`Error with fetching food image💥💥:${error}`);
			}
		}

		getFoodInfo();
		getFoodImage();
	}, [id, foodId]);

	const handleIncrement = () => {
		setQuantity(quantity + 1);
	};

	const handleDecrement = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};

	function handleAddCart() {
		async function addCart() {
			try {
				const res = await fetch(`${url}cart/add_to_cart`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					credentials: 'include',
					body: JSON.stringify({
						food_id: id ? id : foodId,
						quantity: quantity,
						options,
						special_instructions: instructions,
					}),
				});

				const data = await res.json();

				if (!res.ok) {
					throw new Error(`Failed to add to cart: ${data.error}`);
				}

				console.log(data);
			} catch (error) {
				console.error(`Error with adding to cart💥💥:${error}`);
			}
		}

		addCart();
	}
	console.log(foodInfo);
	return (
		<div className={styles.modalContainer}>
			<h1 className={styles.foodname}>{foodName}</h1>
			<div className={styles.foodInfoContainer}>
				{foodImage !== '' ? (
					<img src={foodImage} alt='Burger' className={styles.image} />
				) : (
					<SpinnerImage />
				)}
				<div>
					<div>
						<h2 className={styles.extraHeader}>Ingredients</h2>
						<ul className={styles.twoColumns}>
							{foodInfo.ingredients?.map((ingredient, index) => (
								<li key={index}>
									<CheckRoundedIcon sx={{ fontSize: 20, color: '#28b485' }} />
									{ingredient}
								</li>
							))}
						</ul>
					</div>

					<div>
						<h2 className={styles.extraHeader}>Extras</h2>
						<ul className={styles.extrasContainer}>
							{foodInfo.options?.map((option, index) =>
								option.option_type === 'Extras' ? (
									<li key={index}>
										<input
											type='checkbox'
											value={true}
											id={option.option_name}
											onChange={e => {
												setOptions({
													...options,
													[option.option_name]: e.target.checked,
												});
											}}
										/>
										<label htmlFor={option.option_name}>
											{' '}
											{option.option_name}
										</label>

										<p className={styles.textSecondary}>
											+${option.option_price}
										</p>
									</li>
								) : null
							)}
						</ul>
					</div>
					{foodInfo.options?.map((option, index) =>
						option.option_type === 'Size' ? (
							<div key={index}>
								<h2 className={styles.extraHeader}>Size</h2>
								<ul className={styles.extrasContainer}>
									<li key={index}>
										<input
											type='checkbox'
											value={true}
											id={option.option_name}
											onChange={e => {
												setOptions({
													...options,
													[option.option_name]: e.target.checked,
												});
											}}
										/>
										<label htmlFor={option.option_name}>
											{' '}
											{option.option_name}
										</label>

										<p className={styles.textSecondary}>
											+${option.option_price}
										</p>
									</li>
								</ul>
							</div>
						) : null
					)}

					<div>
						<h2 className={styles.extraHeader}>Instructions</h2>
						<textarea
							onChange={e => setInstructions(e.target.value)}
							placeholder='Add special instructions here...'
							className={styles.textarea}></textarea>
					</div>
					<div className={styles.quatityContainer}>
						<h4>Select Quantity:</h4>
						<a className={styles.quantityBtn} onClick={handleDecrement}>
							-
						</a>
						<span>{quantity}</span>
						<a className={styles.quantityBtn} onClick={handleIncrement}>
							+
						</a>
					</div>

					<div className={styles.btnContainer}>
						<button className='btn btn--green-small' onClick={handleAddCart}>
							Add to cart
						</button>
						<button className='btn btn--orange'>Check more info</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Modal;
