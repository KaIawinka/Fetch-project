import React, {useState, useEffect} from 'react'
import styles from './Home.module.css'
import { data } from 'react-router-dom'

const usersAPI = "https://jsonplaceholder.typicode.com/users"

function Home() {
	const [count, setCount] = useState(0)
	const [list, setList] = useState([])

	async function getUsers() {
		try {
			const res = await fetch(usersAPI)
			const data = await res.json()
			console.log(data);
			setList(data)
		} catch (error) {
			console.log("Ошибка", error);
		}
	}
	useEffect(() => {
		getUsers()
	}, [count])

	return (
		<div className={styles.wrapper}>
			<div className={styles.glow} />
			
			<main className={styles.card}>
				<span className={styles.badge}>Добро пожаловать</span>
				<h1 className={styles.title}>Home</h1>
				<div className={styles.subtitle}>
					{
						list.map((item) => (
							<div key={item.id}>
								<h4>{item.username}</h4>
							</div>
						))
					}
				</div>

				<div className={styles.badge} style={{borderRadius: "5px"}}>
					<h1>{count}</h1>
					<button onClick={() => setCount(count + 1)} className={styles.primaryBtn}>Add</button>
					<button onClick={() => setCount(count > 0 ? count - 1 : 0)} className={styles.primaryBtn}>Del</button>
				</div>

				<div className={styles.actions}>
					<button className={styles.primaryBtn}>Начать</button>
					<button className={styles.secondaryBtn}>Подробнее</button>
				</div>
			</main>
		</div>
	)
}

export default Home