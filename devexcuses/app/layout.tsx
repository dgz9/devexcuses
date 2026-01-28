import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DevExcuses - Random Excuses for Developers',
  description: 'Generate the perfect excuse for why the build is broken, the feature is delayed, or the bug exists.',
  keywords: ['developer', 'excuses', 'programming', 'humor', 'coding'],
  openGraph: {
    title: 'DevExcuses',
    description: 'It works on my machine... and 70+ other developer excuses',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        {children}
      </body>
    </html>
  )
}
