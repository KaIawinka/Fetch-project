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
		<div style={{
			display: "grid",
			gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
			gap: 20,
			maxWidth: 1600,
			margin: "0 auto",
			padding: "24px 16px",
			fontFamily:
				"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
		}}>
			{list.map((photo) => (
				<div
					key={photo.id}
					style={{
									display: "flex",
									flexDirection: "column",
									background: "#ffffff",
									border: "1px solid #e5e5e5",
									borderRadius: 12,
									padding: "20px",
									boxShadow: "0 1px 3px rgba(0, 0, 0, 0.06)",
									background: "#fffde0"
								}}
				>
					<img
						src={photo.title}
						alt={photo.title}
						style={{
										margin: "0 0 10px",
										fontSize: 17,
										fontWeight: 600,
										lineHeight: 1.35,
										color: "#1a1a1a",
										textTransform: "capitalize",
									}}
					/>
					<p style={{
											margin: 0,
											fontSize: 14,
											lineHeight: 1.65,
											color: "#5a5a5a",
											display: "-webkit-box",
											WebkitLineClamp: 4,
											WebkitBoxOrient: "vertical",
											overflow: "hidden",
										}}
					>
						{photo.title}
					</p>
				</div>
			))}
		</div>
	)
}

export default Photos