/** @format */

import React, { useState } from 'react';
import styles from './AddRecipeForm.module.css';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { url } from '../values';

function AddRecipeForm(setMyRecipes, setImageUpload) {
	const [id, setId] = useState('');
	const [recipeData, setRecipeData] = useState({
		name: '',
		price: 0,
		picture: '',
		ingredients: '',
		description: '',
		timing: '',
		options: [{ option_name: '', option_price: 0, option_type: '' }],
		cuisine: '',
		type: '',
		perks: '',
	});

	const handleChange = event => {
		const { name, value } = event.target;
		setRecipeData({ ...recipeData, [name]: value });
	};

	const handleOptionChange = (index, event) => {
		const { name, value } = event.target;
		const newOptions = [...recipeData.options];
		newOptions[index][name] = value;
		setRecipeData({ ...recipeData, options: newOptions });
	};

	const handleAddOption = () => {
		setRecipeData({
			...recipeData,
			options: [...recipeData.options, { name: '', price: '', type: '' }],
		});
	};
	console.log([recipeData.ingredients.replace(/,\s*/g, ',').split(',')]);

	function handleAddRecipe(e) {
		e.preventDefault();
		const sendData = {
			name: recipeData.name,
			price: Number(recipeData.price),
			picture: 'recipeDatapicture.jpg',
			ingredients: [...recipeData.ingredients.replace(/,\s*/g, ',').split(',')],
			description: recipeData.description,
			timing: `${recipeData.timing} minutes`,
			options: [
				{
					option_name: recipeData.options[0].option_name,
					option_price: Number(recipeData.options[0].option_price),
					option_type: recipeData.options[0].option_type,
				},
			],
			category: {
				cuisine: recipeData.cuisine,
				type: recipeData.type,
				perks: [...recipeData.perks.replace(/,\s*/g, ',').split(',')],
			},
		};
		async function AddRecipe() {
			try {
				const res = await fetch(`${url}food/add_food`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					credentials: 'include',
					body: JSON.stringify(sendData),
				});
				const data = await res.json();
				if (res.ok) {
					alert('Recipe added successfully');
					// setMyRecipes(prevState => [...prevState, sendData]);
					setImageUpload();
					setId(data.data);
				} else {
					console.log(data.error);
					alert('Failed to add recipe');
				}
			} catch (error) {
				console.log(error);
			}
		}

		AddRecipe();
		console.log(sendData);
	}
	console.log(id);

	return (
		<div className={styles.modalContainer}>
			<h1>Add Recipe</h1>
			<form className={styles.form}>
				<div className={styles.formGroup}>
					<label htmlFor='name'>Name:</label>
					<input
						className={styles.input}
						type='text'
						id='name'
						name='name'
						value={recipeData.name}
						onChange={handleChange}
						placeholder='Pepperoni Pizza'
					/>
				</div>

				<div className={styles.formGroup}>
					<label htmlFor='price'>Price: (in USD)</label>
					<input
						className={styles.input}
						type='number'
						id='price'
						name='price'
						value={recipeData.price}
						onChange={handleChange}
						step='0.01'
						placeholder='10.00'
					/>
				</div>

				<div className={styles.formGroup}>
					<label htmlFor='picture'>Picture:</label>
					<input
						className={styles.file}
						type='file'
						id='uploadImage'
						accept='image/*'
						placeholder='Upload Image'
						onChange={e => {
							setImageUpload({ picture: e.target.files[0] });
						}}
					/>
				</div>

				<div className={styles.formGroup}>
					<label htmlFor='ingredients'>Ingredients:</label>
					<textarea
						className={styles.textarea}
						id='ingredients'
						name='ingredients'
						value={recipeData.ingredients}
						onChange={handleChange}
						placeholder='Pizza Dough, Tomato Sauce, Mozzarella Cheese, Pepperoni Slices'></textarea>
				</div>

				<div className={styles.formGroup}>
					<label htmlFor='description'>Description:</label>
					<textarea
						className={styles.textarea}
						id='description'
						name='description'
						value={recipeData.description}
						onChange={handleChange}
						placeholder='A classic favorite featuring a crispy pizza crust topped with tangy tomato sauce, melted mozzarella cheese, and savory pepperoni slices.'></textarea>
				</div>

				<div className={styles.formGroup}>
					<label htmlFor='timing'>Timing: (Minutes)</label>
					<input
						className={styles.input}
						type='number'
						id='timing'
						name='timing'
						value={recipeData.timing}
						onChange={handleChange}
					/>
				</div>

				<div className={styles.formGroup}>
					<label htmlFor='options'>
						Options:{' '}
						<AddCircleOutlineRoundedIcon
							onClick={handleAddOption}
							sx={{ cursor: 'pointer', fontSize: 15, marginBottom: '-2px' }}
						/>
					</label>
					{recipeData.options.map((option, index) => (
						<div key={index} className={styles.optionInputContainer}>
							<input
								className={styles.input}
								type='text'
								name={`option_name`}
								value={option.name}
								onChange={e => handleOptionChange(index, e)}
								placeholder='Option Name'
							/>
							<input
								className={styles.input}
								type='number'
								name={`option_price`}
								value={option.price}
								onChange={e => handleOptionChange(index, e)}
								step='0.01'
								placeholder='Option Price'
							/>

							<input
								className={styles.input}
								type='text'
								name={`option_type`}
								value={option.type}
								onChange={e => handleOptionChange(index, e)}
								placeholder='Option Type'
							/>
						</div>
					))}
				</div>

				<div className={styles.formGroup}>
					<label htmlFor='cuisine'>Cuisine:</label>
					<input
						className={styles.input}
						type='text'
						id='cuisine'
						name='cuisine'
						value={recipeData.cuisine}
						onChange={handleChange}
						placeholder='Italian'
					/>
				</div>

				<div className={styles.formGroup}>
					<label htmlFor='type'>Type:</label>
					<input
						className={styles.input}
						type='text'
						id='type'
						name='type'
						value={recipeData.type}
						onChange={handleChange}
						placeholder='Dinner'
					/>
				</div>

				<div className={styles.formGroup}>
					<label htmlFor='perks'>Perks:</label>
					<textarea
						className={styles.textarea}
						id='perks'
						name='perks'
						value={recipeData.perks}
						onChange={handleChange}
						placeholder='Classic, Crowd Favorite'></textarea>
				</div>

				<button
					className='btn btn--green-small'
					style={{ marginLeft: '6rem' }}
					onClick={handleAddRecipe}>
					Add
				</button>
			</form>
		</div>
	);
}

export default AddRecipeForm;
