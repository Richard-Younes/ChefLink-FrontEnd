/** @format */
import FoodInfoContainer from './FoodInfoContainer';
import CustomSwiper from './CustomSwiper';

function CategoryFoodInfo({ food = null }) {
	if (!food) {
		return null;
	}

	return (
		<div className='category-food-info-container'>
			<h2 className='category-food-info-container__title'>{food._id}</h2>
			<div className='category-food-info-container__container'>
				<CustomSwiper>
					{food.collections.map(item => (
						<FoodInfoContainer key={item.id_food} item={item} />
					))}
				</CustomSwiper>
			</div>
		</div>
	);
}

export default CategoryFoodInfo;
