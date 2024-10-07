"use client";

import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { getThumbnailUrl, getAllThumbnail } from "../lib/actions/thumbnail.action";

const UrlInput = () => {
  const [url, setUrl] = useState("");
  const [imgsUrl, setImgUrl] = useState([]);

  // Handle URL submission
  const handleUrlSubmit = useCallback(async (e) => {
    e.preventDefault();

    // Extract video ID from URL
    const id = url.split("v=")[1]?.split("&")[0];

    if (!id) {
      alert("Please enter a valid YouTube URL.");
      return;
    }

    const imgurl = `https://img.youtube.com/vi/${id}/sddefault.jpg`;

    try {
      // Save the thumbnail URL to the database
      await getThumbnailUrl({ imgUrl: imgurl });

      // Fetch updated list of thumbnails
      const updatedThumbnails = await getAllThumbnail();
      setImgUrl(updatedThumbnails);

    } catch (error) {
      console.error("Error storing or fetching thumbnail:", error);
    }

    setUrl(""); // Reset input field
  }, [url]);

  // Fetch all thumbnails when component mounts
  useEffect(() => {
    const fetchThumbnails = async () => {
      try {
        const thumbnails = await getAllThumbnail();
        setImgUrl(thumbnails);
      } catch (error) {
        console.error("Error fetching thumbnails:", error);
      }
    };

    // fetchThumbnails();
  }, []);

  return (
    <div className="w-full p-6 rounded-lg bg-[#333] shadow-lg">
    <h1 className="text-3xl font-bold text-center mb-8">YouTube Thumbnail Generator</h1>
    <div className="max-w-xl m-auto flex flex-col items-center">
      <Input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full text-xl p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#555] bg-[#222] border border-[#555] mb-4"
        placeholder="Enter YouTube URL (e.g., https://www.youtube.com/watch?v=...)"
      />
      <Button
        variant="outline"
        className="w-full bg-[#D65A31] text-white p-3 rounded-lg hover:bg-[#C04D28] transition duration-300"
        onClick={handleUrlSubmit}
      >
        Generate Thumbnail
      </Button>
    </div>

    <div className="flex flex-wrap justify-center gap-5 mt-8">
      {imgsUrl.length > 0 ? (
        imgsUrl.map((thumbnail, index) => (
          <Image
            key={index}
            alt="YouTube Thumbnail"
            src={thumbnail.img}
            width={400}
            height={200}
            className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          />
        ))
      ) : (
        <p className="text-gray-400 text-center mt-5">No thumbnails yet. Submit a URL to generate.</p>
      )}
    </div>
  </div>
  );
};

export default UrlInput;
