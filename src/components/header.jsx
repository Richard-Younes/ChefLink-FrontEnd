/** @format */
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './header.module.css';
import Popup from 'reactjs-popup';
import { useEffect, useState } from 'react';
import { url } from '../values';
import { useUser } from '../contexts/UserContext';

export default function Header() {
	return (
		<div className='header__container'>
			<div className='header'>
				<LogoHeader />
				<HeaderPagesList />
			</div>
		</div>
	);
}

export function LogoHeader() {
	const navigate = useNavigate();

	function handleClick() {
		navigate('/');
	}

	return (
		<div className='header__logo-container'>
			<img
				src='Logo.webp'
				alt='Logo image'
				className='header__logo-image'
				onClick={handleClick}
			/>
			<h2 className='header__logo-text' onClick={handleClick}>
				ChefLink
			</h2>
		</div>
	);
}

function HeaderPagesList() {
	const [profileImage, setProfileImage] = useState(null);
	const { user, isLogged, role } = useUser();

	// This useEffect is used to get the Image URL as well as synchronise with uploading and deleting images
	useEffect(() => {
		async function getImageUrl() {
			try {
				const res = await fetch(
					`${url}media/generate_image_url?path=profile/${user}`,
					{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
						},
						credentials: 'include',
					}
				);

				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.error);
				}

				setProfileImage(data.data);
			} catch (error) {
				console.error(`Get user profile error 💥💥:${error}`);
			}
		}

		getImageUrl();
	}, [user, profileImage]);

	// Function used to upload Images to the backend
	function uploadImage(e) {
		const file = e.target.files[0];
		let formData = new FormData();

		async function sendImage() {
			try {
				formData.append('image', file);
				formData.append('path', `profile/${user}`);
				const res = await fetch(`${url}media/upload_image`, {
					method: 'POST',
					credentials: 'include',
					body: formData,
				});

				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.error);
				}

				if (data.status === 'SUCCESS') {
					setProfileImage(file);
				}

				console.log('Profile Image Uploaded');
			} catch (error) {
				console.error(`Upload image error 💥💥: ${error}`);
			}
		}

		sendImage();
	}

	// Function used to delete the image that is saved on the backend
	function deleteImage() {
		const sentData = { path: `profile/${user}` };

		async function deleteImageUrl() {
			try {
				const res = await fetch(`${url}media/remove_image`, {
					method: 'DELETE',
					headers: { 'Content-Type': 'application/json' },
					credentials: 'include',
					body: JSON.stringify(sentData),
				});

				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.error);
				}

				if (data.status === 'SUCCESS') {
					setProfileImage('.');
					console.log('Profile Image Deleted');
				}
			} catch (error) {
				console.error(`Upload image error 💥💥: ${error}`);
			}
		}

		deleteImageUrl();
	}

	const displayImageJSX =
		profileImage && profileImage === '.' ? (
			<ion-icon name='person-circle' style={{ cursor: 'pointer' }}></ion-icon>
		) : (
			<div className={styles.profileImageContainer}>
				<img src={profileImage} className={styles.profileImage} />
			</div>
		);

	return (
		<div className='page__list'>
			<div className='profile-pic'>
				{!isLogged ? (
					<ion-icon name='person-circle'></ion-icon>
				) : (
					<Popup
						trigger={displayImageJSX}
						position='right center'
						closeOnDocumentClick>
						<ul className={styles.imageList}>
							<li>
								<label htmlFor='uploadImage'>Upload Image</label>
								<input
									type='file'
									id='uploadImage'
									style={{ display: 'none' }}
									accept='image/*'
									placeholder='Upload Image'
									onChange={uploadImage}
								/>
							</li>

							<li onClick={deleteImage}>Delete Image</li>
						</ul>
					</Popup>
				)}
			</div>
			<p className='page__list-username'>{user}</p>
			{role === 'chef' ? (
				<NavLink to='/myrecipe' className='page__list-elements'>
					My Recipes
				</NavLink>
			) : null}
			<NavLink to='/' className='page__list-elements'>
				Home
			</NavLink>
			<NavLink to='/bookmark' className='page__list-elements'>
				Bookmark
			</NavLink>
			<NavLink to='/cart' className='page__list-elements'>
				Cart
			</NavLink>
			<NavLink to='/analytics' className='page__list-elements'>
				Analytics
			</NavLink>
			<NavLink to='/aboutus' className='page__list-elements'>
				About Us
			</NavLink>
			<NavLink to='/settings' className='page__list-elements'>
				Settings
			</NavLink>
		</div>
	);
}
