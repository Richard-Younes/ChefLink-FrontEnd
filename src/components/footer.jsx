/** @format */
import { LogoHeader } from './header';
export default function Footer() {
	return (
		<div className='footer'>
			<div className='footer__first-colone'>
				<LogoHeader />
				<div className='footer__logo-container'>
					<ion-icon name='logo-instagram'></ion-icon>
					<ion-icon name='logo-facebook'></ion-icon>
					<ion-icon name='logo-twitter'></ion-icon>
				</div>
				<p className='footer__copyright'>
					Copyright ©2024 by{' '}
					<span className='footer__copyright--span'>
						ChefLink, Inc. All rights reserved
					</span>
				</p>
			</div>
			<div className='footer__flex'>
				<h3 className='footer__headers'>Contact us</h3>
				<p className='footer__address'>
					623 Harrison St., 2nd Floor, San Francisco, CA 94107
				</p>
				<p className='footer__address'>+961 81 646 453 chefLink@gmail.com</p>
			</div>
			<div className='footer__flex'>
				<h3 className='footer__headers'>Account</h3>
				<p>Create Account</p>
				<p>Sign in</p>
				<p>IOS App</p>
				<p>Android App</p>
			</div>
			<div className='footer__flex'>
				<h3 className='footer__headers'>Company</h3>
				<p>About ChefLink</p>
				<p>For Business</p>
				<p>Partners</p>
				<p>Careers</p>
			</div>
			<div className='footer__flex'>
				<h3 className='footer__headers'>Resources</h3>
				<p>Help center</p>
				<p>Privacy & terms</p>
			</div>
		</div>
	);
}
