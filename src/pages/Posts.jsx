import React, { useState, useEffect } from "react";

const postsAPI = "https://jsonplaceholder.typicode.com/posts";

function Posts() {
	const [list, setList] = useState([]);

	async function getPosts() {
		try {
			const res = await fetch(postsAPI);
			const data = await res.json();
			setList(data);
		} catch (error) {
			console.log("Ошибка", error);
		}
	}

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<div style={styles.grid}>
			{list.map((item) => (
				<article key={item.id} style={styles.card}>
					<h3 style={styles.title}>{item.title}</h3>
					<p style={styles.body}>{item.body}</p>
				</article>
			))}
		</div>
	);
}

const styles = {
	grid: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
		gap: 20,
		maxWidth: 1600,
		margin: "0 auto",
		padding: "24px 16px",
		fontFamily:
			"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
	},
	card: {
		display: "flex",
		flexDirection: "column",
		background: "#ffffff",
		border: "1px solid #e5e5e5",
		borderRadius: 12,
		padding: "20px",
		boxShadow: "0 1px 3px rgba(0, 0, 0, 0.06)",
		background: "#fffde0"
	},
	title: {
		margin: "0 0 10px",
		fontSize: 17,
		fontWeight: 600,
		lineHeight: 1.35,
		color: "#1a1a1a",
		textTransform: "capitalize",
	},
	body: {
		margin: 0,
		fontSize: 14,
		lineHeight: 1.65,
		color: "#5a5a5a",
		display: "-webkit-box",
		WebkitLineClamp: 4,
		WebkitBoxOrient: "vertical",
		overflow: "hidden",
	},
};

export default Posts;