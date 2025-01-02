import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function FirstPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Yellow decorative shapes */}
      <div className="absolute top-20 left-0 ml-20 w-[400px] h-[175px] bg-yellow-300 -translate-x-12 rounded-tl-[40px] rounded-br-[40px]" />
      <div className="absolute bottom-10 right-0 w-[400px] h-[175px] bg-yellow-300 -translate-x-12 rounded-br-[40px] rounded-tl-[40px]" />
      
      

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center px-4">
        <h1 className="text-8xl font-bold ">Formula Machine</h1>
        <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-md">
          Shop Now
        </Button>
      </main>
    </div>
    
  );
}
