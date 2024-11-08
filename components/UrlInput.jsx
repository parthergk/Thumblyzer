import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Download, Zap } from 'lucide-react';

const YouTubeThumbnailFetcher = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnails, setThumbnails] = useState([]);

  const fetchThumbnail = async () => {
    try {
      const videoId = getVideoIdFromUrl(videoUrl);
      const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      setThumbnails([...thumbnails, thumbnailUrl]);
    } catch (error) {
      console.error('Error fetching thumbnail:', error);
    }
  };

  const getVideoIdFromUrl = (url) => {
    const urlParams = new URL(url);
    const videoId = urlParams.searchParams.get('v');
    return videoId;
  };

  const downloadThumbnail = (thumbnailUrl) => {
    const link = document.createElement('a');
    link.href = thumbnailUrl;
    link.setAttribute('download', 'youtube-thumbnail.jpg');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const analyzeThumbnail = (thumbnailUrl) => {
    // Add your thumbnail analysis logic here
    console.log('Analyzing thumbnail:', thumbnailUrl);
  };

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>YouTube Thumbnail Fetcher</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Input
            type="text"
            placeholder="Enter YouTube video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
          <Button onClick={fetchThumbnail}>Fetch Thumbnail</Button>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-8">
          {thumbnails.map((thumbnailUrl, index) => (
            <div key={index} className="flex flex-col items-center">
              <img src={thumbnailUrl} alt={`Thumbnail ${index}`} className="w-full rounded" />
              <div className="flex space-x-2 mt-2">
                <Button
                  variant="secondary"
                  onClick={() => downloadThumbnail(thumbnailUrl)}
                >
                  <Download className="w-5 h-5" />
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => analyzeThumbnail(thumbnailUrl)}
                >
                  <Zap className="w-5 h-5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="text-center">
        Enter a YouTube video URL and click 'Fetch Thumbnail' to get started.
      </CardFooter>
    </Card>
  );
};

export default YouTubeThumbnailFetcher;