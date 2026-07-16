import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import Card from "../components/Card/Card";

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
					<div className={styles.grid}>
						{list.map((product) => (
							<Card key={product.id} product={product} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;