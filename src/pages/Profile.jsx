import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";

const productsAPI = "https://dummyjson.com/products";

function Profile() {
	const [list, setList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	async function getProducts() {
		try {
			setLoading(true);
			const res = await fetch(productsAPI);
			const data = await res.json();
			setList(data.products);
		} catch (error) {
			console.log("Ошибка", error);
			setError("Не удалось загрузить товары");
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		getProducts();
	}, []);

	return (
		<div className={styles.wrapper}>

			<div className={styles.content}>
				{loading && <p className={styles.status}>Загрузка...</p>}
				{error && <p className={styles.status}>{error}</p>}

				<div className={styles.grid}>
					{list.map((product) => (
						<div className={styles.card} key={product.id}>
							<img
								src={product.thumbnail}
								alt={product.title}
								className={styles.cardImage}
							/>
							<span className={styles.badge}>{product.category}</span>
							<h3 className={styles.cardTitle}>{product.title}</h3>
							<p className={styles.cardText}>{product.description}</p>
							<div className={styles.priceRow}>
								<span className={styles.price}>${product.price}</span>
								<span className={styles.rating}>★ {product.rating}</span>
							</div>
							<div className={styles.actions}>
								<button className={styles.primaryBtn}>Купить</button>
								<button className={styles.secondaryBtn}>Подробнее</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Profile;