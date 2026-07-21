import React, { useState, useEffect } from "react"
import { Plus, Trash2, ImageOff, Loader2, PackageOpen } from "lucide-react"

const API = "https://65ab6a1efcd1c9dcffc659a4.mockapi.io/api/v1/list"

const COLORS = {
	bg: "#F6F3EC",
	ink: "#1C2620",
	card: "#13332F",
	cardDeep: "#0D2622",
	gold: "#C9A24B",
	goldSoft: "#E4CE8F",
	mist: "#8FA39A",
	line: "#E1DACB",
}

function Contact() {
	const [list, setList] = useState([])
	const [data, setData] = useState({ title: "", category: "", avatar: "" })
	const [loading, setLoading] = useState(true)
	const [adding, setAdding] = useState(false)
	const [deletingId, setDeletingId] = useState(null)

	async function getProduct() {
		setLoading(true)
		try {
			const res = await fetch(API)
			const data = await res.json()
			setList(data)
		} catch (error) {
			console.log("Ошибка", error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		getProduct()
	}, [])

	function addProduct() {
		if (!data.title.trim() || !data.category.trim()) return
		setAdding(true)
		fetch(API, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((newItem) => {
				setList([...list, newItem])
				setData({ title: "", category: "", avatar: "" })
			})
			.finally(() => setAdding(false))
	}

	function deleteProduct(id) {
		setDeletingId(id)
		fetch(`${API}/${id}`, { method: "DELETE" })
			.then((res) => res.json())
			.then(() => {
				setList(list.filter((item) => item.id !== id))
			})
			.finally(() => setDeletingId(null))
	}
	
	function deleteAllProducts() {
		setDeletingId("all")
		Promise.all(list.map((item) => fetch(`${API}/${item.id}`, { method: "DELETE" })))
			.then(() => {
				setList([])
			})
			.finally(() => setDeletingId(null))
	}

	function updateProduct(id, updatedData) {
		const currentItem = list.find((item) => item.id === id)
		const mergedData = {
			...currentItem,
			title: updatedData.title.trim() !== "" ? updatedData.title : currentItem.title,
			category: updatedData.category.trim() !== "" ? updatedData.category : currentItem.category,
			avatar: updatedData.avatar.trim() !== "" ? updatedData.avatar : currentItem.avatar,
		}
		fetch(`${API}/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(mergedData),
		})
			.then((res) => res.json())
			.then((updatedItem) => {
				setList(list.map((item) => (item.id === id ? updatedItem : item)))
				setData({ title: "", category: "", avatar: "" })
			})
	}

	return (
		<div
			style={{
				minHeight: "100vh",
				background: COLORS.bg,
				fontFamily: "'Inter', system-ui, sans-serif",
				color: COLORS.ink,
				paddingBottom: "80px",
			}}
		>
			<style>{`
				@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap');
				* { box-sizing: border-box; }
				.catalog-input::placeholder { color: #9CA79C; }
				.catalog-input:focus { outline: none; border-color: ${COLORS.card} !important; box-shadow: 0 0 0 3px rgba(19,51,47,0.10); }
				.catalog-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
				.catalog-card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px -12px rgba(13,38,34,0.35); }
				.catalog-card:hover .catalog-img { transform: scale(1.05); }
				.catalog-img { transition: transform 0.5s ease; }
				.add-btn { transition: background 0.2s ease, transform 0.15s ease; }
				.add-btn:hover:not(:disabled) { background: ${COLORS.cardDeep} !important; transform: translateY(-1px); }
				.add-btn:disabled { opacity: 0.45; cursor: not-allowed; }
				.del-btn { transition: background 0.2s ease, color 0.2s ease; }
				.del-btn:hover { background: #B5473A !important; color: #fff !important; }
				.spin { animation: spin 0.8s linear infinite; }
				.catalog-toolbar { flex-wrap: wrap; }
				@keyframes spin { to { transform: rotate(360deg); } }
				@media (max-width: 640px) {
					.catalog-toolbar { flex-direction: column !important; align-items: stretch !important; }
					.catalog-header-row { flex-direction: column !important; gap: 6px !important; align-items: flex-start !important; }
				}
			`}</style>

			<header
				style={{
					padding: "56px 24px 32px",
					maxWidth: "1180px",
					height: "150px",
					margin: "0 auto",
					borderBottom: `1px solid ${COLORS.line}`,
				}}
			>
				<div className="catalog-header-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "16px" }}>
					<div>
						<div style={{ fontSize: "13px", letterSpacing: "0.22em", textTransform: "uppercase", color: COLORS.mist, marginBottom: "10px", fontWeight: 600 }}>
							Inventory
						</div>
						<h1
							style={{
								fontFamily: "'Fraunces', serif",
								fontWeight: 500,
								fontSize: "clamp(32px, 5vw, 52px)",
								margin: 0,
								letterSpacing: "-0.01em",
								color: COLORS.card,
							}}
						>
							The Catalog
						</h1>
					</div>
					<div style={{ fontSize: "14px", color: COLORS.mist, fontWeight: 500 }}>
						{loading ? "loading…" : `${list.length} item${list.length === 1 ? "" : "s"}`}
					</div>
				</div>
			</header>

			<div
				className="catalog-toolbar"
				style={{
					maxWidth: "1180px",
					margin: "0 auto",
					display: "flex",
					gap: "12px",
					padding: "28px 24px",
					alignItems: "center",
				}}
			>
				<input
					className="catalog-input"
					type="text"
					placeholder="Title"
					value={data.title}
					onChange={(e) => setData({ ...data, title: e.target.value })}
					style={inputStyle}
				/>
				<input
					className="catalog-input"
					type="text"
					placeholder="Category"
					value={data.category}
					onChange={(e) => setData({ ...data, category: e.target.value })}
					style={inputStyle}
				/>
				<input
					className="catalog-input"
					type="text"
					placeholder="Image URL"
					value={data.avatar}
					onChange={(e) => setData({ ...data, avatar: e.target.value })}
					style={{ ...inputStyle, flex: 1.4 }}
				/>
				<button
					className="add-btn"
					onClick={addProduct}
					disabled={adding || !data.title.trim() || !data.category.trim()}
					style={{
						display: "flex",
						alignItems: "center",
						gap: "8px",
						padding: "13px 26px",
						borderRadius: "10px",
						border: "none",
						background: COLORS.card,
						color: "#fff",
						fontSize: "15px",
						fontWeight: 600,
						cursor: "pointer",
						whiteSpace: "nowrap",
					}}
				>
					{adding ? <Loader2 size={17} className="spin" /> : <Plus size={17} />}
					Add item
				</button>
				<button
					className="del-btn"
					onClick={deleteAllProducts}
					disabled={deletingId === "all" || list.length === 0}
					style={{
						display: "flex",
						alignItems: "center",
						gap: "8px",
						padding: "13px 26px",
						borderRadius: "10px",
						border: "none",
						background: "#B5473A",
						color: "#fff",
						fontSize: "15px",
						fontWeight: 600,
						cursor: "pointer",
						whiteSpace: "nowrap",
					}}
				>
					{deletingId === "all" ? <Loader2 size={17} className="spin" /> : <Trash2 size={17} />}
					Delete all
				</button>
			</div>

			<div style={{ maxWidth: "1180px", margin: "0 auto", padding: "0 24px" }}>
				{loading ? (
					<div style={{ display: "flex", justifyContent: "center", padding: "100px 0", color: COLORS.mist }}>
						<Loader2 size={26} className="spin" />
					</div>
				) : list.length === 0 ? (
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: "12px",
							padding: "100px 0",
							color: COLORS.mist,
							textAlign: "center",
						}}
					>
						<PackageOpen size={34} strokeWidth={1.5} />
						<div style={{ fontFamily: "'Fraunces', serif", fontSize: "20px", color: COLORS.card }}>Nothing here yet</div>
						<div style={{ fontSize: "14px", maxWidth: "280px" }}>Add a title, category, and image above to start your catalog.</div>
					</div>
				) : (
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
							gap: "28px",
							paddingBottom: "40px",
						}}
					>
						{list.map((item) => (
							<div
								key={item.id}
								className="catalog-card"
								style={{
									borderRadius: "18px",
									overflow: "hidden",
									background: COLORS.card,
									boxShadow: "0 8px 24px -12px rgba(13,38,34,0.25)",
									display: "flex",
									flexDirection: "column",
								}}
							>
								<div style={{ position: "relative", aspectRatio: "4 / 3", overflow: "hidden", background: COLORS.cardDeep }}>
									{item.avatar ? (
										<img
											className="catalog-img"
											src={item.avatar}
											alt={item.title}
											style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
											onError={(e) => {
												e.target.style.display = "none"
											}}
										/>
									) : (
										<div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.mist }}>
											<ImageOff size={28} strokeWidth={1.5} />
										</div>
									)}
									<span
										style={{
											position: "absolute",
											top: "12px",
											left: "12px",
											background: "rgba(19,51,47,0.85)",
											backdropFilter: "blur(4px)",
											color: COLORS.goldSoft,
											fontSize: "11px",
											fontWeight: 600,
											letterSpacing: "0.08em",
											textTransform: "uppercase",
											padding: "6px 12px",
											borderRadius: "999px",
											border: `1px solid rgba(201,162,75,0.4)`,
										}}
									>
										{item.category}
									</span>
								</div>

								<div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", gap: "16px", flex: 1 }}>
									<h2
										style={{
											fontFamily: "'Fraunces', serif",
											fontWeight: 500,
											fontSize: "21px",
											margin: 0,
											color: "#fff",
											lineHeight: 1.3,
										}}
									>
										{item.title}
									</h2>

									<button
										className="del-btn"
										onClick={() => deleteProduct(item.id)}
										disabled={deletingId === item.id}
										style={{
											marginTop: "auto",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											gap: "7px",
											padding: "10px 16px",
											borderRadius: "9px",
											border: `1px solid rgba(255,255,255,0.14)`,
											background: "transparent",
											color: "rgba(255,255,255,0.75)",
											fontSize: "13px",
											fontWeight: 600,
											cursor: "pointer",
										}}
									>
										{deletingId === item.id ? <Loader2 size={14} className="spin" /> : <Trash2 size={14} />}
										Remove
									</button>
									<button className="del-btn" onClick={() => updateProduct(item.id, { ...item, title: data.title, category: data.category, avatar: data.avatar })} style={{ marginTop: "8px", padding: "10px 16px", borderRadius: "9px", border: `1px solid rgba(255,255,255,0.14)`, background: "transparent", color: "rgba(255,255,255,0.75)", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
										Update
									</button>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

const inputStyle = {
	flex: 1,
	padding: "13px 16px",
	borderRadius: "10px",
	border: `1px solid ${COLORS.line}`,
	background: "#fff",
	fontSize: "15px",
	fontFamily: "'Inter', system-ui, sans-serif",
	color: COLORS.ink,
}

export default Contact