/** @format */
/** @format */

import { CircularProgress } from '@mui/material';
import styles from './SpinnerImage.module.css';
function SpinnerImage() {
	return (
		<div className={styles.SpinnerImageContainer}>
			<CircularProgress color='inherit' />
		</div>
	);
}

export default SpinnerImage;
