"use client";
import React from 'react';
import FirstPage from './firstpage/page';
import KnowledgeJourneyPage from '@/app/Quotesection/page'
import BookPage from '@/components/BookPage'
import CourseSellingPage from './courseSellingPage.tsx/page';
const Home = () => {
  return (
    <main className="flex flex-col min-h-screen overflow-x-hidden">
      <FirstPage/>
      <KnowledgeJourneyPage/>
      <BookPage/>
      <CourseSellingPage/>
    </main>
  );
};

export default Home;
