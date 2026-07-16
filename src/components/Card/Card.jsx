import React from 'react'
import styles from './Card.module.css'
import { Link } from 'react-router-dom'

function Card({ product }) {
	const { thumbnail, title, description, category, price, rating } = product

	return (
		<div className={styles.card}>
			<img src={thumbnail} alt={title} className={styles.cardImage} />
			<span className={styles.badge}>{category}</span>
			<h3 className={styles.cardTitle}>{title}</h3>
			<p className={styles.cardText}>{description}</p>
			<div className={styles.priceRow}>
				<span className={styles.price}>${price}</span>
				<span className={styles.rating}>★ {rating}</span>
			</div>
			<div className={styles.actions}>
				<button className={styles.primaryBtn}>Купить</button>
				<Link to={`/detail/${product.id}`}>
					<button className={styles.secondaryBtn}>Подробнее</button>
				</Link>
			</div>
		</div>
	)
}

export default Card