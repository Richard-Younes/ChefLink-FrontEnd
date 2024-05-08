/** @format */

import styles from './CartContainer.module.css';
import { useEffect, useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { url } from '../values.js';
import { useUser } from '../contexts/UserContext.jsx';
import Spinner from './Spinner.jsx';
import SpinnerImage from './SpinnerImage.jsx';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import { Button, ThemeProvider, createTheme } from '@mui/material';
import Popup from 'reactjs-popup';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification.jsx';

const theme = createTheme({
	palette: {
		green: {
			main: '#55c57a',
			light: '#7ed56f',
			dark: '#28b485',
			contrastText: '#000',
		},
	},
});

function CartContainer() {
	const [cartInfo, setCartInfo] = useState(null);
	const { isLogged } = useUser();
	const [imageURL, setImageURL] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const [paymentMethod, setPaymentMethod] = useState('');

	// Add Location states
	const [locationName, setLocationName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [street, setStreet] = useState('');
	const [building, setBuilding] = useState('');
	const [apartment, setApartment] = useState('');
	const [instructions, setInstructions] = useState('');
	const [selectedLocation, setSelectedLocation] = useState('');

	const navigate = useNavigate();

	// get location
	const [location, setLocation] = useState([]);

	const [selectedLocationEmpty, setSelectedLocationEmpty] = useState(false);
	const [paymentMethodEmpty, setPaymentMethodEmpty] = useState(false);
	const [notification, setNotification] = useState(null);

	useEffect(() => {
		async function fetchData() {
			const response = await fetch(`${url}cart/get_cart_details`, {
				credentials: 'include',
			});

			const data = await response.json();
			setCartInfo(data.data);
		}
		if (!cartInfo) {
			fetchData()
				.then(() => {
					return getLocation();
				})
				.then(() => console.log('Both fetchData and getLocation completed'));
		}

		async function getLocation() {
			const response = await fetch(`${url}location/get_locations`, {
				credentials: 'include',
			});
			const data = await response.json();
			setLocation(data.data);
		}

		async function fetchImages() {
			const response = await fetch(`${url}media/generate_image_url_bulk`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({ paths: foodIds }),
			});

			const data = await response.json();
			setImageURL(data.data);
		}
		if (cartInfo && !imageURL) fetchImages();
	}, [cartInfo]);

	let bundles, cart;

	let foodIds = cartInfo?.bundles.map(bundle => `food/${bundle.id_food}`);

	if (cartInfo) {
		bundles = cartInfo.bundles;
		cart = cartInfo.cart;
	}

	if (!isLogged) {
		return (
			<h2 className={styles.noBookmark}>Please login to view your cart</h2>
		);
	}

	if (!cartInfo || isLoading) return <Spinner />;

	function handleLocationSubmit(e, close) {
		e.preventDefault();

		const sendData = {
			location_name: locationName || 'XX',
			longitude: 2.4532,
			latitude: 4.4322,
			phone_number: phoneNumber || '+96181646453',
			street: street || 'N/A',
			building: building || 'XX',
			apartment: apartment || 'N/A',
			instructions: instructions || 'N/A',
		};

		async function getLocation() {
			const response = await fetch(`${url}location/get_locations`, {
				credentials: 'include',
			});
			const data = await response.json();
			setLocation(data.data);
		}

		async function addLocation() {
			const response = await fetch(`${url}location/add_location`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(sendData),
			});

			const data = await response.json();
			console.log(data);
		}

		addLocation().then(() => getLocation());
		close();
	}

	function handleDeleteAddress(locationId) {
		async function deleteAddress() {
			const response = await fetch(`${url}location/remove_location`, {
				method: 'DELETE',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },

				body: JSON.stringify({ id_location: locationId }),
			});

			const data = await response.json();
			console.log(data);
		}

		deleteAddress();
		setLocation(location.filter(loc => loc.id_location !== locationId));
	}

	function handleDeleteBundle(bundleId, index) {
		setImageURL(null);
		bundles.splice(index, 1);

		async function deleteBundle() {
			const response = await fetch(`${url}cart/remove_from_cart`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({ bundle_id: bundleId }),
			});

			const data = await response.json();
		}

		async function fetchData() {
			const response = await fetch(`${url}cart/get_cart_details`, {
				credentials: 'include',
			});

			const data = await response.json();
			setCartInfo(data.data);
		}

		async function fetchImages() {
			const response = await fetch(`${url}media/generate_image_url_bulk`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({ paths: foodIds }),
			});

			const data = await response.json();
			setImageURL(data.data);
		}

		deleteBundle()
			.then(() => {
				// Once deleteBundle finishes, call fetchData
				return fetchData();
			})
			.then(() => {
				return fetchImages();
			})
			.catch(error => {
				console.error('Error:', error);
			});
	}

	function deleteCart() {
		async function deleteCart() {
			setIsLoading(true);
			const response = await fetch(`${url}cart/delete_cart`, {
				method: 'DELETE',
				credentials: 'include',
			});

			const data = await response.json();
			setIsLoading(false);
		}

		setCartInfo(null);
		deleteCart();
	}

	function handleCheckout() {
		if (!selectedLocation) return setSelectedLocationEmpty(true);
		if (!paymentMethod) return setPaymentMethodEmpty(true);

		async function updateCart() {
			const sendData = {
				to_change: ['location', 'payment_method'],
				new_vals: [selectedLocation, paymentMethod],
			};

			const response = await fetch(`${url}cart/update_current_cart_attribute`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(sendData),
			});

			const data = await response.json();

			if (!response.ok) {
				setNotification({
					message: 'Error updating the cart',
					type: 'error',
				});
				setTimeout(() => {
					navigate('/');
				}, 2000);
			}
		}

		async function placeOrder() {
			const response = await fetch(`${url}cart/place_order`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			});

			const data = await response.json();
			if (data?.status === 'SUCCESS') {
				setTimeout(() => {
					navigate('/');
				}, 2000);
				setNotification({
					message: 'Order Placed Successfully',
					type: 'success',
				});
			}
			if (!response.ok) {
				setNotification({
					message: 'Error placing order',
					type: 'error',
				});

				setTimeout(() => {
					navigate('/');
				}, 2000);
			}

			console.log('Order Placed Successfully');
		}

		updateCart()
			.then(() => placeOrder())
			.catch(error => console.error(error));
	}

	function handlePaymentMethod(method) {
		setPaymentMethod(method);
	}

	function handleLocationSelect(locationId) {
		setSelectedLocation(locationId);
	}
	const handleNotificationClose = () => {
		setNotification(null);
	};

	return (
		<div>
			{cart.length === 0 && (
				<h2 className={styles.noBookmark}>Your cart is empty</h2>
			)}

			{/* <div>
				<h2>Items in your cart</h2>
				<div key={cart.iD}>
					<h3>Cart Id: {cart.iD}</h3>
					<p>Total Price: {cart.price}</p>
					<p>Status: {cart.status}</p>
				</div>
			</div> */}

			{bundles.length > 0 && (
				<div className={styles.bundlesContainer}>
					<h2>Bundles in your cart</h2>
					{bundles.map((bundle, index) => (
						<div key={bundle.id} className={styles.bundleContainer}>
							<h3 className={styles.bundleName}>
								{bundle.name}{' '}
								<ion-icon
									name='trash-outline'
									class={styles.trashIcon}
									onClick={() =>
										handleDeleteBundle(bundle.id_bundle, index)
									}></ion-icon>
							</h3>
							<div className={styles.flexContainer}>
								<div className={styles.imageFoodContainer}>
									{imageURL ? (
										<img
											src={imageURL[index]}
											alt='food image'
											className={styles.foodImage}
										/>
									) : (
										<SpinnerImage />
									)}
								</div>

								<div className={styles.foodInfoContainer}>
									<div className={styles.optionContainer}>
										<p className={styles.boldedText}>Options:</p>
										{bundle.id_options.map((option, index) => (
											<p key={index} className={styles.optionsText}>
												{option}
												<ion-icon
													name='checkmark-circle-outline'
													class='custom-icon'></ion-icon>
											</p>
										))}
									</div>

									<p>
										<span className={styles.boldedText}>
											Special instruction:
										</span>{' '}
										{bundle.special_instruction}
									</p>

									<p>Quantity: {bundle.quantity}</p>
									<p>Price: ${bundle.total_bundle_price}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			)}

			<h2>Total: ${cart.price}</h2>
			<div className={styles.buttonContainer}>
				<ThemeProvider theme={theme}>
					<Popup
						trigger={
							<Button variant='contained' color='green' size='large'>
								Checkout
							</Button>
						}
						modal
						nested>
						<div className={styles.modalContainer}>
							<div className={styles.addressContainer}>
								<h4 className={styles.addressHeader}>Delivery Address</h4>
								{selectedLocationEmpty ? (
									<p className={styles.error}>* Select a Location</p>
								) : null}
								{location?.map((loc, index) => (
									<div
										onClick={() => handleLocationSelect(loc.id_location)}
										className={`${styles.address} ${
											selectedLocation === loc.id_location
												? styles.addressSelected
												: ''
										}`}
										key={index}>
										<LocationOnIcon
											sx={{ fontSize: 60, marginBottom: '1rem' }}
										/>
										<div>
											<p>
												<strong>{loc.location_name}</strong>
												<ion-icon
													name='trash-outline'
													class={styles.trashIcon}
													onClick={() =>
														handleDeleteAddress(loc.id_location)
													}></ion-icon>
											</p>
											<p className={styles.textColor}>{loc.building}</p>
											<p>{loc.phone_number}</p>
										</div>
									</div>
								))}

								<Popup
									trigger={
										<a href='#' className={styles.addLocation}>
											Add +
										</a>
									}
									modal
									nested>
									{close => (
										<div className={styles.addressModalContainer}>
											<h3 style={{ marginBottom: '2rem', marginLeft: '2rem' }}>
												Add Address
											</h3>
											<form
												className={styles.form}
												onSubmit={e => handleLocationSubmit(e, close)}>
												<label className={styles.label}>
													Location name:
													<input
														type='text'
														placeholder='Location name'
														onChange={e => setLocationName(e.target.value)}
														className={styles.input}
														required></input>
												</label>
												<label className={styles.label}>
													Phone number:
													<input
														type='text'
														placeholder='Phone number'
														onChange={e => setPhoneNumber(e.target.value)}
														className={styles.input}
														required></input>
												</label>
												<label className={styles.label}>
													Street:
													<input
														type='text'
														onChange={e => setStreet(e.target.value)}
														placeholder='street'
														className={styles.input}
														required></input>
												</label>
												<label className={styles.label}>
													Building:
													<input
														type='text'
														onChange={e => setBuilding(e.target.value)}
														placeholder='Building'
														className={styles.input}
														required></input>
												</label>
												<label className={styles.label}>
													Apartment:
													<input
														type='text'
														onChange={e => setApartment(e.target.value)}
														placeholder='Apartment'
														className={styles.input}
														required></input>
												</label>
												<label className={styles.label}>
													Instructions:
													<input
														type='text'
														onChange={e => setInstructions(e.target.value)}
														placeholder='Instructions'
														className={styles.input}
														required></input>
												</label>
												<button
													className={`btn  btn--green-small ${styles.btnAddLocation}}`}>
													Add Location
												</button>
											</form>
										</div>
									)}
								</Popup>
							</div>

							<div className={styles.paymentMethod}>
								<h4 className={styles.addressHeader}>Payment Method</h4>

								{paymentMethodEmpty ? (
									<p className={styles.error}>* Select payment method</p>
								) : null}
								<div
									onClick={() => handlePaymentMethod('cash')}
									className={`${styles.cashContainer} ${
										paymentMethod === 'cash' ? styles.cashContainerSelected : ''
									}`}>
									<LocalAtmIcon sx={{ fontSize: 60 }} />
									<div>
										<p className={styles.paymentHeader}>Cash</p>
										<p className={styles.textColor}>
											Pay with cash upon delivery
										</p>
									</div>
									<button
										onClick={() => handlePaymentMethod('cash')}
										className={`btn ${styles.addCashMethodBtn}`}>
										Add
									</button>
								</div>

								<div
									onClick={() => handlePaymentMethod('credit')}
									className={`${styles.cashContainer} ${
										paymentMethod === 'credit'
											? styles.cashContainerSelected
											: ''
									}`}>
									<CreditCardOutlinedIcon sx={{ fontSize: 60 }} />
									<div>
										<p className={styles.paymentHeader}>Credit</p>
										<p className={styles.textColor}>
											Go cashless on your order!
										</p>
									</div>
									<button
										onClick={() => handlePaymentMethod('credit')}
										className={`btn ${styles.addCashMethodBtn}`}>
										Add
									</button>
								</div>

								<div className={styles.creditContainer}></div>
							</div>

							<div className={styles.totalPayment}>
								<div className={styles.payments}>
									<p className={styles.paymentHeader}>Subtotal</p>
									<p className={styles.paymentHeader}>${cart.price}</p>
								</div>

								<div className={`${styles.payments} ${styles.borderBottom}`}>
									<p className={styles.textColor}>Delevery charge</p>
									<p className={styles.textColor}>
										{cart.price !== '0.0' ? '$5' : '0'}
									</p>
								</div>

								<div className={styles.payments}>
									<p className={styles.paymentHeader}>Total</p>
									<p className={styles.paymentHeader}>
										${cart.price !== '0.0' ? Number(cart.price) + 5 : '0.0'}
									</p>
								</div>
							</div>

							<button
								onClick={handleCheckout}
								className={`btn btn--orange ${styles.placeOrderButton}`}>
								Place order
							</button>
						</div>
					</Popup>
				</ThemeProvider>
				{notification && (
					<Notification
						message={notification.message}
						type={notification.type}
						onClose={handleNotificationClose}
					/>
				)}

				<Button
					onClick={() => deleteCart()}
					variant='outlined'
					color='error'
					sx={{ color: 'red' }}
					size='small'
					startIcon={<DeleteOutlineIcon />}>
					Delete Cart
				</Button>
			</div>
		</div>
	);
}

export default CartContainer;
