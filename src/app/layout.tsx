import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/lib/theme-provider'

const raleway = Raleway({ 
  subsets: ['latin'],
  variable: '--font-raleway',
})

export const metadata: Metadata = {
  title: 'Kasefra - Personal Finance Management',
  description: 'UAE-focused personal finance management with AI-powered insights',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${raleway.variable} font-raleway`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}