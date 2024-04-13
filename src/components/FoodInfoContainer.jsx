/** @format */

function FoodInfoContainer() {
	return (
		<div className='food-container'>
			<img
				className='food-container__image'
				src='public/burger1.jpg'
				alt='Food image'
			/>
			<div className='food-container__header'>
				<p className='food-container__name'>Chicken</p>
				<div className='food-container__bookmark-icon'>
					<ion-icon name='bookmark-outline'></ion-icon>
				</div>
			</div>

			<div className='food-container__info'>
				<ion-icon name='star'></ion-icon>
				<p className='food-container__rating'>4.7</p>
				<span className='food-container__time'>
					<ion-icon name='timer-outline'></ion-icon>
					<p className='food-container__time-text'>25-30 min</p>
				</span>
			</div>

			<div className='food-container__footer'>
				<p>$15</p>
				<button className='btn category__btn category__btn-active food-container__button'>
					Order
				</button>
			</div>
		</div>
	);
}

export default FoodInfoContainer;
