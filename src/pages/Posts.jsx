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
		<div style={styles.wrapper}>
			<div style={styles.grid}>
				{list.map((item) => (
					<article
						key={item.id}
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
						<span style={styles.badge}>Post #{item.id}</span>
						<h3 style={styles.title}>{item.title}</h3>
						<p style={styles.body}>{item.body}</p>
					</article>
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
		padding: "24px",
		backdropFilter: "blur(20px)",
		WebkitBackdropFilter: "blur(20px)",
		boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
		transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
	},
	badge: {
		display: "inline-block",
		alignSelf: "flex-start",
		padding: "4px 12px",
		fontSize: 11,
		fontWeight: 600,
		letterSpacing: 0.5,
		textTransform: "uppercase",
		color: "#a78bfa",
		background: "rgba(167, 139, 250, 0.12)",
		border: "1px solid rgba(167, 139, 250, 0.3)",
		borderRadius: 999,
		marginBottom: 14,
	},
	title: {
		margin: "0 0 10px",
		fontSize: 17,
		fontWeight: 700,
		lineHeight: 1.35,
		color: "#f5f5f7",
		letterSpacing: -0.3,
		textTransform: "capitalize",
	},
	body: {
		margin: 0,
		fontSize: 14,
		lineHeight: 1.65,
		color: "rgba(245, 245, 247, 0.6)",
		display: "-webkit-box",
		WebkitLineClamp: 4,
		WebkitBoxOrient: "vertical",
		overflow: "hidden",
	},
};

export default Posts;