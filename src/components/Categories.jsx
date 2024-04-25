/** @format */
function Categories({ types = [] }) {
	const categories = ['All', ...types];

	return (
		<div className='categories'>
			<p style={{ marginBottom: '1rem' }}>Select Category</p>
			<div className='categories-container'>
				{categories.map((category, index) => (
					<Category categ={category} key={index} />
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
