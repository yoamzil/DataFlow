'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuthPage = pathname === '/login'

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      {!isAuthPage && <Navbar />}
      <main className={
        !isAuthPage
          ? "flex-1 container mx-auto px-4 py-8 mt-16 mb-12 overflow-auto"
          : "flex-1 min-h-screen"
      }>
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </div>
  )
}