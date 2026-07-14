import React from 'react';
 
function NotFound() {
	return (
		<div style={styles.wrapper}>
			<div style={styles.content}>
				<div style={styles.numberRow}>
					<span style={styles.digit}>4</span>
					<span style={styles.zero}>
						<span style={styles.zeroRing} />
					</span>
					<span style={styles.digit}>4</span>
				</div>
 
				<h1 style={styles.title}>Page not found</h1>
				<p style={styles.subtitle}>
					The page you're looking for doesn't exist or may have moved.
				</p>
 
				<a href="/" style={styles.button}>
					Back to home
				</a>
			</div>
		</div>
	);
}
 
const styles = {
	wrapper: {
		minHeight: '100vh',
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		background: '#0B0C10',
		fontFamily:
			"'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
		padding: '24px',
	},
	content: {
		textAlign: 'center',
		maxWidth: '480px',
	},
	numberRow: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		gap: '8px',
		marginBottom: '32px',
	},
	digit: {
		fontSize: 'clamp(90px, 18vw, 140px)',
		fontWeight: 800,
		color: '#F5F4F0',
		lineHeight: 1,
		letterSpacing: '-0.04em',
	},
	zero: {
		width: 'clamp(70px, 13vw, 100px)',
		height: 'clamp(90px, 18vw, 140px)',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	zeroRing: {
		width: '100%',
		height: '78%',
		borderRadius: '50%',
		border: '10px solid red',
		boxSizing: 'border-box',
		position: 'relative',
	},
	title: {
		fontSize: '26px',
		fontWeight: 700,
		color: '#F5F4F0',
		margin: '0 0 12px 0',
		letterSpacing: '-0.01em',
	},
	subtitle: {
		fontSize: '15px',
		color: '#9A9A9F',
		lineHeight: 1.6,
		margin: '0 0 32px 0',
	},
	button: {
		display: 'inline-block',
		padding: '12px 28px',
		background: 'red',
		color: '#0B0C10',
		fontWeight: 600,
		fontSize: '14px',
		borderRadius: '8px',
		textDecoration: 'none',
		transition: 'opacity 0.2s ease',
	},
};
 
export default NotFound;