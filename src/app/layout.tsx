import Navbar from '@/components/Navbar/Navbar'
import { Metadata } from 'next'
import { ReactNode } from 'react'
import './index.css'

export const metadata: Metadata = {
  title: 'Invest.io',
}

type Props = {
  children: ReactNode
}
const layout = ({ children }: Props) => {
  return (
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}

export default layout
