/** @format */

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import './CustomSwiper.css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function CustomSwiper({ children, spaceBetween = 50, slidesPerView = 5 }) {
	return (
		<Swiper
			modules={[Navigation, Pagination, Scrollbar, A11y]}
			spaceBetween={spaceBetween}
			slidesPerView={slidesPerView}
			navigation
			scrollbar={{ draggable: true }}>
			{children.map((child, index) => (
				<SwiperSlide key={index}>{child}</SwiperSlide>
			))}
		</Swiper>
	);
}

export default CustomSwiper;
