import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import './Detail.css'
import {Link} from "react-router-dom"

const productsAPI = "https://dummyjson.com/products";

function Detail() {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	async function getProducts() {
		setLoading(true);
		setError(null);
		try {
			const res = await fetch(`${productsAPI}/${id}`);
			if (!res.ok) throw new Error('Товар не найден');
			const data = await res.json();
			setProduct(data);
		} catch (error) {
			console.log("Ошибка", error);
			setError(error.message);
		} finally {
			setLoading(false);
		}
	}

	React.useEffect(() => {
		getProducts();
	}, [id]);

	if (loading) {
		return <div className="detail-status">Загрузка...</div>;
	}

	if (error) {
		return <div className="detail-status detail-error">Ошибка: {error}</div>;
	}

	if (!product) {
		return null;
	}

	return (
		<div className="detail-wrapper">
			<div className="detail-card">
				<div className="detail-images">
					<img
						className="detail-main-image"
						src={product.thumbnail}
						alt={product.title}
					/>
					{product.images && product.images.length > 1 && (
						<div className="detail-thumbs">
							{product.images.slice(0, 5).map((img, i) => (
								<img key={i} src={img} alt={`${product.title} ${i + 1}`} />
							))}
						</div>
					)}
				</div>

				<div className="detail-info">
					<span className="detail-category">{product.category}</span>
					<h1 className="detail-title">{product.title}</h1>
					<p className="detail-brand">Бренд: {product.brand}</p>

					<div className="detail-rating">
						<span className="detail-rating-badge">★ {product.rating}</span>
						<span className="detail-stock">
							{product.stock > 0 ? `В наличии: ${product.stock} шт.` : 'Нет в наличии'}
						</span>
					</div>

					<p className="detail-description">{product.description}</p>

					<div className="detail-price-block">
						<span className="detail-price">${product.price}</span>
						{product.discountPercentage > 0 && (
							<span className="detail-discount">
								-{Math.round(product.discountPercentage)}%
							</span>
						)}
					</div>

					<Link to="/Profile" className="detail-buy-btn">
						Назад
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Detail