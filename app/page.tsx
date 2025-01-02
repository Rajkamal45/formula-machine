"use client" 
import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { Button } from "@/components/ui/button"
import Link from "next/link"


export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Yellow decorative shapes */}
      <div
        className="absolute top-20 left-0 ml-20 w-[400px] h-[175px] bg-yellow-300 -translate-x-12 rounded-tl-[40px] rounded-br-[40px]" 
      />
      <div
        className="absolute bottom-10 right-0 w-[400px] h-[175px] bg-yellow-300 -translate-x-12 rounded-br-[40px] rounded-tl-[40px]" 
      />
      
      {/* Navigation */}
      <nav className="relative z-10 p-4">
        <div className="flex justify-between items-center">
          <div className="text-yellow-300 text-3xl font-bold">Logo</div>
          
          {/* Mobile Hamburger Icon */}
          <button onClick={toggleMenu} className="lg:hidden text-white">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Menu Items */}
        <ul className={`flex gap-8 text-white justify-center lg:flex ${isMenuOpen ? 'flex' : 'hidden'} flex-col lg:flex-row lg:gap-8`}>
          <li>
            <Link href="#" className="hover:text-yellow-400 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:text-yellow-400 transition-colors">
              Books
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:text-yellow-400 transition-colors">
              Courses
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:text-yellow-400 transition-colors">
              Orders
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:text-yellow-400 transition-colors">
              About us
            </Link>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center px-4">
        <h1 className="text-8xl font-bold ">Formula Machine</h1>
        <Button
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-md"
        >
          Shop Now
        </Button>
      </main>

      <section>
        {/* quote section */}
        <h2> </h2>
      </section>
    </div>
  )
}
