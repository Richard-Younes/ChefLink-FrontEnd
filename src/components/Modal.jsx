/** @format */
import { useParams } from 'react-router-dom';
import styles from './Modal.module.css';

function Modal() {
	const { id } = useParams();
	return <div>Modal {id}</div>;
}

export default Modal;
