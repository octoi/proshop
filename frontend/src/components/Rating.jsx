import React from 'react';

export default function Rating({ value, text, color }) {
	const stars = [1, 2, 3, 4, 5];

	return (
		<div className="rating">
			{stars.map(number => (
				<span key={number}>
					<i style={{ color }} className={
						value >= number
							? 'fas fa-star'
							: value >= number - 0.5
								? 'fas fa-star-half-alt'
								: 'far fa-star'
					}></i>
				</span>
			))}
			<span>{text && text}</span>
		</div>
	)
}
