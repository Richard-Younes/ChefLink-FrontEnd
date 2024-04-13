/** @format */
const categories = [
	{ name: 'All', key: 1 },
	{ name: 'Pizza', key: 2 },
	{ name: 'Italian', key: 3 },
	{ name: 'Salad', key: 4 },
	{ name: 'Pasta', key: 5 },
	{ name: 'Desert', key: 6 },
];

function Categories() {
	return (
		<div className='categories'>
			<p style={{ marginBottom: '1rem' }}>Select Category</p>
			<div className='categories-container'>
				{categories.map(category => (
					<Category categ={category.name} key={category.key} />
				))}
			</div>
		</div>
	);
}
function Category({ categ }) {
	return (
		<button
			className={`btn category__btn ${
				categ === 'All' ? ' category__btn-active' : ''
			}`}>
			{categ}
		</button>
	);
}
export default Categories;
