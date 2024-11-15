import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";

const userId = localStorage.getItem("userId");

export const AddBlog = () => {
 
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const submissionData = new FormData(e.target);
    submissionData.append("clubId", userId);
    try {
      await axios.post("http://localhost:3000/api/blog/create", submissionData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/blogs");
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };  
  

  return (
    <>

      <div className="bg-cyan-100">
        
          <Navbar></Navbar>

        <div className="container w-10/12 mx-auto my-8 mt-24 p-6 shadow-lg border rounded-lg bg-gray-900">
          <h1 className="text-4xl font-bold mb-6 text-center text-yellow-400">Add New Blog</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-yellow-400">Title</label>
              <input
                type="text"
                name="title"
                className="w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-gray-200 focus:border-yellow-400 focus:ring focus:ring-yellow-200"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-yellow-400">Date</label>
              <input
                type="date"
                name="date"
                className="w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-gray-200 focus:border-yellow-400 focus:ring focus:ring-yellow-200"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-yellow-400">College</label>
              <input
                type="text"
                name="college"
                className="w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-gray-200 focus:border-yellow-400 focus:ring focus:ring-yellow-200"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-yellow-400">Content</label>
              <textarea
                name="content"
                className="w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-gray-200 focus:border-yellow-400 focus:ring focus:ring-yellow-200"
                rows="5"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-yellow-400">Images</label>
              <input
                name="posters"
                type="file"
                multiple
                className="w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-gray-200 focus:border-yellow-400 focus:ring focus:ring-yellow-200"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold p-3 rounded-md shadow-md transition duration-300"
            >
              Submit Blog
            </button>
          </form>
        </div>

        <div className="footer-addblog">
          <Footer></Footer>
        </div>
      </div>
    </>
  );
};

export default AddBlog;
