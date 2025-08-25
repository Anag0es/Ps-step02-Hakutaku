import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Debug Hunt - Hakutaku Challenge',
	description: 'Challenge 01: Encontre e corrija os bugs neste componente React',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt-BR">
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</head>
			<body>{children}</body>
		</html>
	)
}
