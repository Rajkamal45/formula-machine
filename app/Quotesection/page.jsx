import Image from 'next/image';

export default function KnowledgeJourneyPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      {/* Content Container */}
      <div className="flex flex-col lg:flex-row items-center lg:justify-between space-y-6 lg:space-y-0 lg:space-x-12">
        {/* Illustration */}
        <div className="w-72 lg:w-96">
          <Image
            src="/images/student.png" // Replace with the correct image path
            alt="Person studying illustration"
            width={400}
            height={400}
            className="w-full h-auto"
          />
        </div>

        {/* Text Section */}
        <div className="text-center lg:text-left max-w-lg">
          <h1 className="text-3xl lg:text-4xl font-bold">
            "The journey towards your dream IIT starts here"
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-gray-300">
            Expand your knowledge with our expert-led courses. Join Formula
            Machine and dive into diverse subjects and linguistic richness.
            Enhance your academic foundation and immerse yourself in the beauty
            of language. All levels welcome.
          </p>
        </div>
      </div>
    </div>
  );
}
