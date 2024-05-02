/** @format */

import React, { useEffect, useState } from 'react';
import styles from './PaginationComponent.module.css';
import { Pagination, ThemeProvider, createTheme } from '@mui/material';

function PaginationComponent({
	children,
	rowsPerPage = 3,
	columnsPerPage = 5,
}) {
	const [currentPage, setCurrentPage] = useState(1);

	const totalItems = React.Children.count(children);
	const totalPages = Math.ceil(totalItems / (rowsPerPage * columnsPerPage));

	const theme = createTheme({
		palette: {
			green: {
				main: '#55c57a',
				light: '#7ed56f',
				dark: '#28b485',
				contrastText: '#333',
			},
		},
	});

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [currentPage]);

	const goToPage = page => {
		setCurrentPage(page);
	};

	const renderItems = () => {
		// Calculate the range of items to display on the current page
		const startIndex = (currentPage - 1) * rowsPerPage * columnsPerPage;
		const endIndex = Math.min(
			startIndex + rowsPerPage * columnsPerPage,
			totalItems
		);

		const itemsToDisplay = React.Children.toArray(children).slice(
			startIndex,
			endIndex
		);

		return itemsToDisplay;
	};
	const handleChange = (event, value) => {
		goToPage(value);
	};
	return (
		<div className={styles.paginationContainer}>
			{/* Display items for the current page */}
			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: '4rem',
					alignContent: 'center',
					justifyContent: 'center',
				}}>
				{renderItems()}
			</div>
			{/* Pagination controls */}
			{/* <div className={styles.controlsContainer}>
				<button onClick={prevPage} disabled={currentPage === 1}>
					Previous
				</button>
				{renderPageNumbers()}
				<button onClick={nextPage} disabled={currentPage === totalPages}>
					Next
				</button>
			</div> */}
			<ThemeProvider theme={theme}>
				<Pagination
					count={totalPages}
					page={currentPage}
					onChange={handleChange}
					variant='outlined'
					color='green'
				/>
			</ThemeProvider>
		</div>
	);
}

export default PaginationComponent;
