"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Course {
  course_id: number;
  title: string;
  description: string;
  price: number;
  thumbnail_url: string;
  videos: string[]; 
}

const AdminCourseManagement: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [formData, setFormData] = useState<Course>({
    course_id: 0,
    title: "",
    description: "",
    price: 0,
    thumbnail_url: "",
    videos: [],
  });

  const [isNewCourse, setIsNewCourse] = useState<boolean>(true);
  const [notification, setNotification] = useState<string>("");

  // Fetch all courses on mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data, error } = await supabase
          .from("courses")
          .select("*");

        if (error) throw error;
        setCourses(data || []);
      } catch (err: any) {
        setError("Error fetching courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseClick = (course: Course) => {
    setIsNewCourse(false);
    setFormData(course);
    setSelectedCourse(course);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVideoLinksChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    const newVideos = [...formData.videos];
    newVideos[index] = value;
    setFormData({ ...formData, videos: newVideos });
  };

  const handleAddVideoLink = () => {
    setFormData({
      ...formData,
      videos: [...formData.videos, ""],
    });
  };

  const handleSaveCourse = async () => {
    if (isNewCourse) {
      try {
        const { error } = await supabase.from("courses").insert([formData]);
        if (error) throw error;
        setNotification("Course added successfully!");
        setFormData({
          course_id: 0,
          title: "",
          description: "",
          price: 0,
          thumbnail_url: "",
          videos: [],
        });
        setIsNewCourse(true);
      } catch (err: any) {
        setNotification(`Error: ${err.message}`);
      }
    } else {
      try {
        const { error } = await supabase
          .from("courses")
          .update(formData)
          .eq("course_id", formData.course_id);
        if (error) throw error;
        setNotification("Course updated successfully!");
        setIsNewCourse(true);
        setSelectedCourse(null);
      } catch (err: any) {
        setNotification(`Error: ${err.message}`);
      }
    }
  };

  const handleDeleteCourse = async (courseId: number) => {
    try {
      const { error } = await supabase.from("courses").delete().eq("course_id", courseId);
      if (error) throw error;
      setNotification("Course deleted successfully!");
      setCourses(courses.filter((course) => course.course_id !== courseId));
    } catch (err: any) {
      setNotification(`Error: ${err.message}`);
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
      <h1 className="text-4xl font-bold text-center mb-8">Admin Course Management</h1>

      {notification && (
        <div
          className={`text-center mb-4 p-4 rounded ${
            notification.includes("Error") ? "bg-red-500" : "bg-green-500"
          } text-white`}
        >
          {notification}
        </div>
      )}

      <div className="flex justify-between mb-6">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
          onClick={() => setIsNewCourse(true)}
        >
          Add New Course
        </button>
      </div>

      {isNewCourse ? (
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-4">Add a New Course</h2>
          <div>
            <label htmlFor="title" className="block mb-1">Course Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mt-4">
            <label htmlFor="description" className="block mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={4}
              required
            />
          </div>

          <div className="mt-4">
            <label htmlFor="price" className="block mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mt-4">
            <label htmlFor="thumbnail_url" className="block mb-1">Thumbnail URL</label>
            <input
              type="text"
              name="thumbnail_url"
              value={formData.thumbnail_url}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block mb-2">Video Links</label>
            {formData.videos.map((video, index) => (
              <div key={index} className="flex gap-4 mb-2">
                <input
                  type="text"
                  value={video}
                  onChange={(e) => handleVideoLinksChange(e, index)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder={`Video Link ${index + 1}`}
                />
              </div>
            ))}
            <button
              onClick={handleAddVideoLink}
              className="bg-gray-500 text-white py-1 px-3 mt-2 rounded-md"
            >
              Add Video
            </button>
          </div>

          <button
            onClick={handleSaveCourse}
            className="mt-6 bg-green-500 text-white py-2 px-4 rounded-md"
          >
            Save Course
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {courses.map((course) => (
            <div
              key={course.course_id}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <img
                src={course.thumbnail_url}
                alt={course.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-xl font-semibold mt-4">{course.title}</h3>
              <p className="text-gray-600">{course.description}</p>

              <button
                className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded-md"
                onClick={() => handleCourseClick(course)}
              >
                Edit
              </button>
              <button
                className="mt-4 ml-2 bg-red-500 text-white py-2 px-4 rounded-md"
                onClick={() => handleDeleteCourse(course.course_id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCourseManagement;
