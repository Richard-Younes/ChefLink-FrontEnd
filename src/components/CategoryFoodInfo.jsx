/** @format */
import FoodInfoContainer from './FoodInfoContainer';
import CustomSwiper from './CustomSwiper';
const items = [1, 2, 3, 4, 5, 6, 7, 8];

function CategoryFoodInfo() {
	return (
		<div className='category-food-info-container'>
			<h2 className='category-food-info-container__title'>Top Rated🔥</h2>
			<div className='category-food-info-container__container'>
				<CustomSwiper>
					{items.map(item => (
						<FoodInfoContainer key={item} />
					))}
				</CustomSwiper>
			</div>
		</div>
	);
}

export default CategoryFoodInfo;
