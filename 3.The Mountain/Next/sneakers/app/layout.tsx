import './globals.css'



export const metadata = {
  title: 'Sneakers app',
  description: 'Created by El DevinChat',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        </body>
    </html>
  )
}
