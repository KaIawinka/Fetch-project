import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import Card from "../components/Card/Card";

const productsAPI = "https://dummyjson.com/products";

function Profile() {
	const [list, setList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [search, setSearch] = useState("")

	async function getProducts() {
		try {
			setLoading(true);
			const res = await fetch(`${productsAPI}/search?q=${search}`);
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
	}, [search]);

	return (
		<div className={styles.wrapper}>
		<div>
			<input
				type="text" 
				placeholder="поиск"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				style={{
					padding: "20px 10px",
					borderRadius: "20px",
					background: "black",
					border: "1px solid grey",
					color: "white"
				}}
			/>
		</div>

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