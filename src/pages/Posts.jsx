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
		background:
			"radial-gradient(circle at top, #312e81 0%, #111827 35%, #020617 100%)",
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
		background: "rgba(15, 23, 42, 0.75)",
		border: "1px solid rgba(34, 211, 238, 0.25)",
		borderRadius: 20,
		padding: "24px",
		backdropFilter: "blur(24px)",
		WebkitBackdropFilter: "blur(24px)",
		boxShadow:
			"0 0 25px rgba(34,211,238,0.15), 0 0 50px rgba(168,85,247,0.15)",
		transition:
			"transform .3s ease, box-shadow .3s ease, border-color .3s ease",
	},

	badge: {
		display: "inline-block",
		alignSelf: "flex-start",
		padding: "4px 12px",
		fontSize: 11,
		fontWeight: 700,
		letterSpacing: 1,
		textTransform: "uppercase",
		color: "#22d3ee",
		background: "rgba(34,211,238,0.12)",
		border: "1px solid rgba(34,211,238,0.35)",
		borderRadius: 999,
		marginBottom: 14,
		boxShadow: "0 0 15px rgba(34,211,238,.3)",
	},

	title: {
		margin: "0 0 10px",
		fontSize: 17,
		fontWeight: 700,
		lineHeight: 1.35,
		color: "#ffffff",
		letterSpacing: -0.3,
		textTransform: "capitalize",
		textShadow: "0 0 12px rgba(168,85,247,.5)",
	},

	body: {
		margin: 0,
		fontSize: 14,
		lineHeight: 1.65,
		color: "rgba(226,232,240,.75)",
		display: "-webkit-box",
		WebkitLineClamp: 4,
		WebkitBoxOrient: "vertical",
		overflow: "hidden",
	},
};

export default Posts;