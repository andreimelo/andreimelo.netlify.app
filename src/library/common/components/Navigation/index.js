import React, { useState } from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import {
	nav_wrapper,
	nav_container,
	mylogo,
	nav_item_container,
	nav_item,
	nav_item_container_mobile,
	nav_line_menu,
	half,
	start,
	end,
	open,
	white,
	nav_background,
	nav_opt_out,
	nav_menu_mobile,
	nav_item_mobile,
	theme_toggle,
} from 'styles/components_style/navigation.module.css';
import { useContext } from 'react';
import ThemeContext from 'src/library/common/context/ThemeContext';
import { Link } from 'react-scroll';
import { useRouter } from 'next/router';

function Navigation({ logo, data }){
	const [
		openNav,
		setOpenNav,
	] = useState(false);
	const router = useRouter();
	const { isDark, toggleTheme } = useContext(ThemeContext);
	const isBlogPostsPath =
		router.pathname === '/posts' || router.pathname.includes('/posts');
	const bgLineMenu =
		!openNav ? nav_line_menu :
		`${nav_line_menu} ${white}`;

	function handleNavState(){
		setOpenNav(!openNav);
	}
	return (
		<div className={nav_wrapper}>
			<nav className={nav_container}>
				<NextLink href={`/`}>
					<img className={mylogo} src={logo} alt='my Logo' />
				</NextLink>
				{/* Web Nav */}
				<div className={nav_item_container}>
					{!isBlogPostsPath &&
						data.map((item, i) => {
							return (
								item && (
									<div key={i} className={nav_item}>
										<Link
											href={`#${item}`}
											smooth
											offset={-70}
											hashSpy
											to={item}
										>
											{item}
										</Link>
									</div>
								)
							);
						})}
					{isBlogPostsPath &&
						data.map((item, i) => {
							return (
								item && (
									<div key={i} className={nav_item}>
										<NextLink href={`/`}>{item}</NextLink>
									</div>
								)
							);
						})}
					<div className={nav_item}>
						<NextLink href='/posts'>Blog </NextLink>
					</div>
				</div>
				{/* Mobile Nav */}
				{/* Theme toggle */}
				<button
					className={theme_toggle}
					aria-label='Toggle theme'
					onClick={() => toggleTheme()}
				>
					{isDark ? '🌙' : '☀️'}
				</button>
				<div
					className={`${nav_item_container_mobile} ${
						openNav ? open :
						''}`}
					onClick={handleNavState}
				>
					<div
						className={

								openNav ? nav_background :
								`${nav_background} ${nav_opt_out}`
						}
					/>
					<div className={`${bgLineMenu} ${start} ${half}`} />
					<div className={bgLineMenu} />
					<div className={`${bgLineMenu} ${end} ${half}`} />
				</div>
				{
					openNav ? <div className={nav_menu_mobile}>
						{!isBlogPostsPath &&
							data.map((item, i) => {
								return (
									item && (
										//class
										<div key={i} className={nav_item_mobile}>
											<Link
												href={`#${item}`}
												smooth
												offset={-70}
												hashSpy
												to={item}
												onClick={handleNavState}
											>
												{item}
											</Link>
										</div>
									)
								);
							})}
						{isBlogPostsPath &&
							data.map((item, i) => {
								return (
									item && (
										<div key={i} className={nav_item_mobile}>
											<NextLink href={`/`} onClick={handleNavState}>
												{item}
											</NextLink>
										</div>
									)
								);
							})}
						<NextLink
							href='/posts'
							className={nav_item_mobile}
							onClick={handleNavState}
						>
							Blog
						</NextLink>
					</div> :
					''}
			</nav>
		</div>
	);
}

Navigation.propTypes = {
	logo : PropTypes.string,
	data : PropTypes.array.isRequired,
};

Navigation.defaultProps = {
	logo : '',
	data : [],
};

export default React.memo(Navigation);
