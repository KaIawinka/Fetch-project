import React, { useState, useEffect } from "react";

const photosAPI = "https://jsonplaceholder.typicode.com/photos";

function Photos() {
	const [list, setList] = useState([]);

	async function getPhotos() {
		try {
			const res = await fetch(photosAPI);
			const data = await res.json();
			setList(data);
		} catch (error) {
			console.log("Ошибка", error);
		}
	}

	useEffect(() => {
		getPhotos();
	}, []);

	return (
		<div style={styles.wrapper}>
			<div style={styles.grid}>
				{list.map((photo) => (
					<div
						key={photo.id}
						style={styles.card}
						onMouseEnter={(e) => {
							e.currentTarget.style.transform = "translateY(-4px)";
							e.currentTarget.style.boxShadow =
								"0 8px 32px rgba(167, 139, 250, 0.25)";
							e.currentTarget.style.borderColor =
								"rgba(167, 139, 250, 0.3)";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.transform = "translateY(0)";
							e.currentTarget.style.boxShadow =
								"0 8px 32px rgba(0, 0, 0, 0.4)";
							e.currentTarget.style.borderColor =
								"rgba(255, 255, 255, 0.12)";
						}}
					>
						<img
							src={photo.thumbnailUrl}
							alt={photo.title}
							style={styles.image}
						/>
						<p style={styles.text}>{photo.title}</p>
					</div>
				))}
			</div>
		</div>
	);
}

const styles = {
	wrapper: {
		position: "relative",
		minHeight: "100vh",
		background: "#0a0a12",
		overflow: "hidden",
		padding: "24px",
		fontFamily:
			"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
	},
	grid: {
		position: "relative",
		zIndex: 1,
		display: "grid",
		gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
		gap: 20,
		maxWidth: 1600,
		margin: "0 auto",
	},
	card: {
		display: "flex",
		flexDirection: "column",
		background: "rgba(255, 255, 255, 0.06)",
		border: "1px solid rgba(255, 255, 255, 0.12)",
		borderRadius: 20,
		padding: "16px",
		backdropFilter: "blur(20px)",
		WebkitBackdropFilter: "blur(20px)",
		boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
		transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
	},
	image: {
		width: "100%",
		height: 180,
		objectFit: "cover",
		borderRadius: 12,
		marginBottom: 12,
		border: "1px solid rgba(255, 255, 255, 0.08)",
	},
	text: {
		margin: 0,
		fontSize: 14,
		lineHeight: 1.65,
		color: "rgba(245, 245, 247, 0.7)",
		display: "-webkit-box",
		WebkitLineClamp: 3,
		WebkitBoxOrient: "vertical",
		overflow: "hidden",
		textTransform: "capitalize",
	},
};

export default Photos;