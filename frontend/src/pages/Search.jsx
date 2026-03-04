<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImages, setSelectedImages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            const fakeData = {
                name: "Google",
                username: "google",
                verified: true,
                avatar:
                    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
                followers: "3.2M",
                following: 4,
                posts: [
                    { id: 1, image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d" },
                    { id: 2, image: "https://images.unsplash.com/photo-1519681393784-d120267933ba" },
                    { id: 3, image: "https://images.unsplash.com/photo-1518770660439-4636190af475" },
                    { id: 4, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836" },
                    { id: 5, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9" },
                    { id: 6, image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308" },
                ],
            };

            setProfile(fakeData);
            setPosts(fakeData.posts);
            setLoading(false);
        }, 800);
    }, []);

    // Toggle image selection
    const handleSelectImage = (image) => {
        if (selectedImages.includes(image)) {
            // Remove if already selected
            setSelectedImages(selectedImages.filter((img) => img !== image));
        } else {
            // Add new
            setSelectedImages([...selectedImages, image]);
        }
    };

    // Add all selected images
    const handleContinue = () => {
        const newPosts = selectedImages.map((image) => ({
            id: Date.now() + Math.random(),
            image,
        }));
        setPosts([...newPosts, ...posts]);
        setSelectedImages([]);

        // Navigate to Packages Page
        navigate("/packagespage");
    };
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen text-xl font-semibold">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-200 p-10">
            <div className="max-w-7xl mx-auto flex gap-8">

                {/* LEFT SECTION */}
                <div className="w-1/3 flex flex-col gap-6">

                    {/* Profile Card */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm">
                        <div className="text-center">
                            <h2 className="text-xl font-semibold flex justify-center items-center gap-2">
                                {profile.name}
                                {profile.verified && (
                                    <span className="text-blue-500">✔</span>
                                )}
                            </h2>

                            <div className="w-28 h-28 mx-auto mt-6 rounded-full border-2 border-purple-500 flex items-center justify-center bg-white p-4">
                                <img
                                    src={profile.avatar}
                                    alt="avatar"
                                    className="object-contain"
                                />
                            </div>

                            <p className="mt-4 text-lg font-medium">
                                @{profile.username}
                            </p>

                            <div className="mt-6 text-left space-y-2">
                                <p className="flex justify-between">
                                    <span>Posts</span>
                                    <span>{posts.length}</span>
                                </p>
                                <p className="flex justify-between">
                                    <span>Followers</span>
                                    <span>{profile.followers}</span>
                                </p>
                                <p className="flex justify-between">
                                    <span>Following</span>
                                    <span>{profile.following}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Add Post Card */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm">
                        <h3 className="text-lg font-semibold mb-6">Add your Posts</h3>

                        {selectedImages.length === 0 ? (
                            <div className="w-32 h-32 border-2 border-purple-400 rounded-2xl flex items-center justify-center">
                                <Plus className="text-purple-500" size={32} />
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="grid grid-cols-3 gap-3">
                                    {selectedImages.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt="selected"
                                            className="w-full h-20 object-cover rounded-lg"
                                        />
                                    ))}
                                </div>

                                <button
                                    onClick={handleContinue}
                                    className="w-full bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700 transition"
                                >
                                    Continue ({selectedImages.length})
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT SECTION */}
                <div className="w-2/3">

                    {/* Breadcrumb */}
                    <div className="bg-white rounded-full px-8 py-4 mb-8 shadow-sm">
                        <span className="text-green-600">Post</span>
                        <span className="mx-2">/</span>
                        <span className="text-purple-600">Packages</span>
                        <span className="mx-2">/</span>
                        <span className="text-blue-600">Payment</span>
                    </div>

                    {/* Posts Grid */}
                    <div className="grid grid-cols-3 gap-6">
                        {posts.map((post) => {
                            const isSelected = selectedImages.includes(post.image);

                            return (
                                <div
                                    key={post.id}
                                    onClick={() => handleSelectImage(post.image)}
                                    className={`relative rounded-3xl overflow-hidden group cursor-pointer ${isSelected ? "ring-4 ring-purple-500" : ""
                                        }`}
                                >
                                    <img
                                        src={`${post.image}?auto=format&fit=crop&w=400&q=80`}
                                        alt="post"
                                        className="w-full h-64 object-cover"
                                    />
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
=======
import React from "react";
import { ShieldCheck, DollarSign, Clock, Star } from "lucide-react";

const Search = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center px-4">
      
      <div className="max-w-4xl text-center">
        
        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
          Buy Instagram Followers for Reach high
          
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Buy Instagram followers from SMM and grow your profile with the fast
          Instagram followers increase.
        </p>

        {/* Input + Button */}
        <div className="mt-10 flex items-center justify-center">
          <div className="flex items-center bg-white border-2 border-gray-300 rounded-full shadow-md overflow-hidden w-full max-w-xl">
            
            {/* Icon */}
            <div className="pl-4 text-gray-500">
              👤
            </div>

            {/* Input */}
            <input
              type="text"
              placeholder="Username"
              className="flex-1 px-4 py-4 outline-none"
            />

            {/* Button */}
            <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 font-semibold hover:opacity-90 transition">
              SEARCH
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-gray-700">
          
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-blue-500" size={20} />
            <span>Secure Service</span>
          </div>

          <div className="flex items-center gap-2">
            <DollarSign className="text-pink-500" size={20} />
            <span>Affordable For All</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="text-orange-500" size={20} />
            <span>Saves Your Time</span>
          </div>

        </div>

        {/* Rating Section */}
        <div className="mt-10 flex flex-col items-center gap-3">
          
          <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow">
            
            <div className="flex text-yellow-400">
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
            </div>

            <span className="font-semibold text-gray-700">4.9</span>
          </div>

          <p className="text-sm text-gray-600">
            Rated <span className="font-semibold">4.9 out of 5</span> <br />
            Based on 1678+ Reviews
          </p>

        </div>

      </div>
    </div>
  );
};

export default Search;
>>>>>>> origin/main
