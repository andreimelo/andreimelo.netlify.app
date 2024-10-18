import React from 'react';
import {
	card_content,
	card_item,
	card_icon,
	enable_animation,
	marquee,
} from 'styles/components_style/card.module.css';
import PropTypes from 'prop-types';

function Card({ data }){
	return (
		<div className={marquee}>
			<section className={enable_animation}>
				<div className={card_content}>
					{data &&
						data.map((item) => (
							<div key={item.id} className={card_item}>
								{item &&
								item.link && (
									<a
										href={item.link}
										target={'_blank'}
										rel='noopener noreferrer'
									>
										<img
											src={item.image}
											className={card_icon}
											alt={`techStack${item.name}`}
										/>
									</a>
								)}
							</div>
						))}
					{data &&
						data.map((item) => (
							<div key={item.id} className={card_item}>
								{item &&
								item.link && (
									<a
										href={item.link}
										target={'_blank'}
										rel='noopener noreferrer'
									>
										<img
											src={item.image}
											className={card_icon}
											alt={`techStack${item.name}`}
										/>
									</a>
								)}
							</div>
						))}
					{data &&
						data.map((item) => (
							<div key={item.id} className={card_item}>
								{item &&
								item.link && (
									<a
										href={item.link}
										target={'_blank'}
										rel='noopener noreferrer'
									>
										<img
											src={item.image}
											className={card_icon}
											alt={`techStack${item.name}`}
										/>
									</a>
								)}
							</div>
						))}
				</div>
			</section>
		</div>
	);
}

Card.propTypes = {
	data : PropTypes.array,
};

Card.defaultProps = {
	data : [],
};

export default Card;
