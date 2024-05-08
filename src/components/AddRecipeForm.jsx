/** @format */
import styles from './AddRecipeForm.module.css';
function AddRecipeForm() {
	return (
		<div className={styles.modalContainer}>
			<h1>Add Recipe</h1>
			<form className={styles.form}>
				<div className={styles.formGroup}>
					<label htmlFor='name'>Name:</label>
					<input className={styles.input} type='text' id='name' name='name' />
				</div>

				<div className={styles.formGroup}>
					<label htmlFor='price'>Price:</label>
					<input
						className={styles.input}
						type='number'
						id='price'
						name='price'
						step='0.01'
					/>
				</div>

				<div className={styles.formGroup}>
					<label htmlFor='picture'>Picture:</label>
					<input
						className={styles.input}
						type='text'
						id='picture'
						name='picture'
					/>
				</div>

				<div className={styles.formGroup}>
					<label htmlFor='ingredients'>Ingredients:</label>
					<textarea id='ingredients' name='ingredients'></textarea>
				</div>

				<div className={styles.formGroup}>
					<label htmlFor='description'>Description:</label>
					<textarea id='description' name='description'></textarea>
				</div>

				<div className={styles.formGroup}>
					<label htmlFor='timing'>Timing:</label>
					<input
						className={styles.input}
						type='text'
						id='timing'
						name='timing'
					/>
				</div>

				<div className={styles.formGroup}>
					<label htmlFor='options'>Options:</label>
					<div>
						<label htmlFor='regular'>
							<input type='radio' id='regular' name='options' value='Regular' />
							Regular
						</label>
					</div>
					<div>
						<label htmlFor='extraCheese'>
							<input
								type='radio'
								id='extraCheese'
								name='options'
								value='Extra Cheese'
							/>
							Extra Cheese (+$1.5)
						</label>
					</div>
					<div>
						<label htmlFor='stuffedCrust'>
							<input
								type='radio'
								id='stuffedCrust'
								name='options'
								value='Stuffed Crust'
							/>
							Stuffed Crust (+$2.0)
						</label>
					</div>
				</div>

				<div className={styles.formGroup}>
					<label htmlFor='cuisine'>Cuisine:</label>
					<input
						className={styles.input}
						type='text'
						id='cuisine'
						name='cuisine'
					/>
				</div>

				<div className={styles.formGroup}>
					<label htmlFor='type'>Type:</label>
					<input className={styles.input} type='text' id='type' name='type' />
				</div>

				<div className={styles.formGroup}>
					<label htmlFor='perks'>Perks:</label>
					<textarea id='perks' name='perks'></textarea>
				</div>
			</form>
		</div>
	);
}

export default AddRecipeForm;
