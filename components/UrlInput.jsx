"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useCallback } from "react";
import Image from "next/image";

const UrlInput = () => {
  const [url, setUrl] = useState("");
  const [imgsUrl, setImgUrl] = useState([]);

  // Handle URL submission
  const handleUrlSubmit = useCallback((e) => {
    e.preventDefault();

    // Extract video ID from URL
    const id = url.split("v=")[1]?.split("&")[0];

    if (id) {
      const imgurl = `https://img.youtube.com/vi/${id}/sddefault.jpg`;

      setImgUrl([imgurl]);
      setUrl(""); // Reset the input field
    } else {
      alert("Please enter a valid YouTube URL.");
    }
  }, [url]);

  return (
    <div className="flex flex-col justify-center items-center pt-48 gap-5">
      <h1 className="text-xl">Enter YouTube URL Here</h1>
      <Input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-96 text-xl"
        placeholder="https://www.youtube.com/watch?v=..."
      />
      <Button
        variant="outline"
        className="bg-transparent border"
        onClick={handleUrlSubmit}
      >
        Submit
      </Button>

      {imgsUrl.length > 0 &&
        imgsUrl.map((img, index) => (
          <Image
            key={index}
            alt="YouTube Thumbnail"
            src={img}
            width={450}
            height={450}
          />
        ))}
    </div>
  );
};

export default UrlInput;
