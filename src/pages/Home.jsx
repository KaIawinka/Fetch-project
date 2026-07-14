import React from 'react'
import styles from './Home.module.css'

function Home() {
	return (
		<div className={styles.wrapper}>
			<div className={styles.glow} />

			<main className={styles.card}>
				<span className={styles.badge}>Добро пожаловать</span>
				<h1 className={styles.title}>Home</h1>
				<p className={styles.subtitle}>
					Начните исследовать
				</p>

				<div className={styles.actions}>
					<button className={styles.primaryBtn}>Начать</button>
					<button className={styles.secondaryBtn}>Подробнее</button>
				</div>
			</main>
		</div>
	)
}

export default Home