"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Course {
  course_id: number;
  title: string;
  description: string;
  price: number;
  thumbnail_url: string;
  videos: string[]; // Array to hold video links (update the Supabase schema if required)
}

const CourseSellingPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null); // Track selected course
  const [paymentStatus, setPaymentStatus] = useState<boolean>(false); // Track payment status
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [user, setUser] = useState<any>(null); // Store authenticated user

  // Check if a user is logged in
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.error("Failed to fetch user:", error.message);
      } else {
        setUser(user);
      }
    };

    getUser();
  }, []);

  // Fetch courses from Supabase
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data, error } = await supabase
          .from("courses")
          .select("course_id, title, description, price, thumbnail_url");

        if (error) throw error;
        setCourses(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Check payment status
  const fetchPaymentStatus = async (courseId: number) => {
    if (!user) return false; // Return false if not logged in

    try {
      const { data, error } = await supabase
        .from("orders")
        .select("payment_status")
        .eq("user_id", user.id)
        .eq("course_id", courseId)
        .limit(1);

      if (error) throw error;
      return data && data[0]?.payment_status === "completed";
    } catch (err) {
      console.error("Error checking payment status:", err);
      return false;
    }
  };

  // Handle course card click
  const handleCourseClick = async (course: Course) => {
    setLoading(true);
    const status = await fetchPaymentStatus(course.course_id);
    setPaymentStatus(status);
    setSelectedCourse(course);
    setLoading(false);
  };

  // Handle Payment with Razorpay
  const handlePayment = async (course: Course) => {
    if (!user) {
      alert("You need to log in before making a purchase.");
      window.location.href = "/login";
      return;
    }

    try {
      // Create Order in Supabase
      const { data: orderData, error: insertError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          course_id: course.course_id,
          amount_paid: course.price,
          payment_status: "pending",
        })
        .select("order_id");

      if (insertError || !orderData || !orderData.length) {
        throw new Error("Order creation failed.");
      }

      const orderId = orderData[0].order_id;

      // Initiate Razorpay
      const options = {
        key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay Key
        amount: course.price * 100,
        currency: "INR",
        name: "Finsy Academy",
        description: `Purchase ${course.title}`,
        image: "/logo.png",
        handler: async () => {
          // Update payment status
          const { error: updateError } = await supabase
            .from("orders")
            .update({ payment_status: "completed" })
            .eq("order_id", orderId);

          if (updateError) {
            throw new Error("Failed to update payment status.");
          }

          alert("Payment successful! Course unlocked.");
          setPaymentStatus(true); // Unlock access
        },
        prefill: {
          email: user.email || "user@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#00C897",
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (err: any) {
      alert(`Error initiating payment: ${err.message}`);
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-8">
      {selectedCourse ? (
        // Detailed View for Selected Course
        <div>
          <button onClick={() => setSelectedCourse(null)} className="mb-4 text-blue-500">
            &larr; Back to Courses
          </button>
          <h2 className="text-3xl font-bold">{selectedCourse.title}</h2>
          <p className="text-gray-600 my-4">{selectedCourse.description}</p>
          {paymentStatus ? (
            // Render Playlist if payment is completed
            <ul className="list-disc pl-6">
              {selectedCourse.videos.map((video, index) => (
                <li key={index}>
                  <a href={video} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    Video {index + 1}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            // Prompt to make payment
            <div>
              <p className="text-red-500 my-4">Access restricted. Please purchase to unlock.</p>
              <button
                onClick={() => handlePayment(selectedCourse)}
                className="bg-green-500 text-white py-2 px-4 rounded-md"
              >
                Buy Now for ₹{selectedCourse.price}
              </button>
            </div>
          )}
        </div>
      ) : (
        // Course List View
        <div>
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
            🌟 Explore Our Premium Courses 🌟
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {courses.map((course) => (
              <div
                key={course.course_id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300"
                onClick={() => handleCourseClick(course)}
              >
                <img
                  src={course.thumbnail_url}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {course.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                  <p className="text-xl font-semibold text-green-600">
                    ₹{course.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseSellingPage;
