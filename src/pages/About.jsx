import React from 'react'
import styles from './About.module.css'

function About() {
	return (
		<div className={styles.wrapper}>
			<div className={styles.glow} />

			<main className={styles.card}>
				<span className={styles.badge}>О нас</span>
				<h1 className={styles.title}>About</h1>
				<p className={styles.subtitle}>
					Мы создаём продукты, которые помогают людям работать проще и быстрее
				</p>

				<div className={styles.stats}>
					<div className={styles.statItem}>
						<span className={styles.statValue}>3+</span>
						<span className={styles.statLabel}>года на рынке</span>
					</div>
					<div className={styles.statItem}>
						<span className={styles.statValue}>50k</span>
						<span className={styles.statLabel}>пользователей</span>
					</div>
					<div className={styles.statItem}>
						<span className={styles.statValue}>24/7</span>
						<span className={styles.statLabel}>поддержка</span>
					</div>
				</div>

				<div className={styles.actions}>
					<button className={styles.primaryBtn}>Связаться с нами</button>
				</div>
			</main>
		</div>
	)
}

export default About