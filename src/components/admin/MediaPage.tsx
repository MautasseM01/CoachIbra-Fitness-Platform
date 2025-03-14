import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Search,
  Upload,
  Image as ImageIcon,
  Film,
  Trash2,
  Edit,
  ExternalLink,
  Instagram,
  Youtube,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const MediaPage = () => {
  const { t = (key) => key } = useTranslation();
  const [selectedMedia, setSelectedMedia] = useState(null);

  // Sample media data
  const images = [
    {
      id: 1,
      title: "Boxing Training Session",
      url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&q=80",
      type: "image",
      date: "2023-10-15",
      size: "1.2 MB",
      dimensions: "1920x1080",
      tags: ["training", "boxing", "gym"],
    },
    {
      id: 2,
      title: "Kids Class",
      url: "https://images.unsplash.com/photo-1549476464-37392f717541?w=600&q=80",
      type: "image",
      date: "2023-10-10",
      size: "0.9 MB",
      dimensions: "1600x900",
      tags: ["kids", "class", "training"],
    },
    {
      id: 3,
      title: "Personal Training Session",
      url: "https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?w=600&q=80",
      type: "image",
      date: "2023-10-05",
      size: "1.5 MB",
      dimensions: "2000x1200",
      tags: ["personal", "training", "technique"],
    },
    {
      id: 4,
      title: "Boxing Techniques",
      url: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=600&q=80",
      type: "image",
      date: "2023-09-28",
      size: "1.1 MB",
      dimensions: "1800x1000",
      tags: ["technique", "boxing", "training"],
    },
  ];

  const videos = [
    {
      id: 5,
      title: "Basic Boxing Techniques for Beginners",
      url: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=600&q=80", // Thumbnail
      type: "video",
      date: "2023-10-12",
      duration: "15:30",
      size: "45.6 MB",
      tags: ["tutorial", "beginner", "techniques"],
    },
    {
      id: 6,
      title: "Kids Boxing Class Highlights",
      url: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=600&q=80", // Thumbnail
      type: "video",
      date: "2023-10-08",
      duration: "08:45",
      size: "32.1 MB",
      tags: ["kids", "highlights", "class"],
    },
    {
      id: 7,
      title: "Advanced Footwork Drills",
      url: "https://images.unsplash.com/photo-1517438476312-10d79c077509?w=600&q=80", // Thumbnail
      type: "video",
      date: "2023-09-30",
      duration: "12:20",
      size: "38.4 MB",
      tags: ["advanced", "footwork", "drills"],
    },
  ];

  const socialMedia = [
    {
      id: 8,
      title: "Morning boxing session with my champions! #BoxingLife",
      url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&q=80",
      type: "instagram",
      date: "2023-10-14",
      likes: 245,
      platform: "Instagram",
      externalUrl: "https://instagram.com",
    },
    {
      id: 9,
      title: "Kids class learning the fundamentals #FutureFighters",
      url: "https://images.unsplash.com/photo-1549476464-37392f717541?w=600&q=80",
      type: "instagram",
      date: "2023-10-09",
      likes: 187,
      platform: "Instagram",
      externalUrl: "https://instagram.com",
    },
    {
      id: 10,
      title: "Basic Boxing Techniques for Beginners",
      url: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=600&q=80",
      type: "youtube",
      date: "2023-10-11",
      views: 15420,
      platform: "YouTube",
      externalUrl: "https://youtube.com",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          {t("admin.media") || "Media"}
        </h1>
        <Button className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          {t("admin.uploadMedia") || "Upload Media"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder={t("admin.searchMedia") || "Search media..."}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start"
                size="sm"
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                {t("admin.allMedia") || "All Media"}
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                size="sm"
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                {t("admin.images") || "Images"}
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                size="sm"
              >
                <Film className="h-4 w-4 mr-2" />
                {t("admin.videos") || "Videos"}
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                size="sm"
              >
                <Instagram className="h-4 w-4 mr-2" />
                {t("admin.instagram") || "Instagram"}
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                size="sm"
              >
                <Youtube className="h-4 w-4 mr-2" />
                {t("admin.youtube") || "YouTube"}
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">
                {t("admin.allMedia") || "All Media"}
              </TabsTrigger>
              <TabsTrigger value="images">
                {t("admin.images") || "Images"}
              </TabsTrigger>
              <TabsTrigger value="videos">
                {t("admin.videos") || "Videos"}
              </TabsTrigger>
              <TabsTrigger value="social">
                {t("admin.socialMedia") || "Social Media"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...images, ...videos, ...socialMedia].map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedMedia(item)}
                  >
                    <div className="aspect-square relative">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      {item.type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                          <Film className="h-8 w-8 text-white" />
                        </div>
                      )}
                      {(item.type === "instagram" ||
                        item.type === "youtube") && (
                        <div className="absolute top-2 right-2">
                          {item.type === "instagram" ? (
                            <Instagram className="h-5 w-5 text-white drop-shadow-md" />
                          ) : (
                            <Youtube className="h-5 w-5 text-white drop-shadow-md" />
                          )}
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-medium line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {item.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="images" className="mt-0">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedMedia(item)}
                  >
                    <div className="aspect-square">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-medium line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {item.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="videos" className="mt-0">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {videos.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedMedia(item)}
                  >
                    <div className="aspect-video relative">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                        <Film className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-medium line-clamp-1">
                        {item.title}
                      </h3>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {item.date}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {item.duration}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="social" className="mt-0">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {socialMedia.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedMedia(item)}
                  >
                    <div className="aspect-square relative">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        {item.type === "instagram" ? (
                          <Instagram className="h-5 w-5 text-white drop-shadow-md" />
                        ) : (
                          <Youtube className="h-5 w-5 text-white drop-shadow-md" />
                        )}
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-medium line-clamp-1">
                        {item.title}
                      </h3>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {item.platform}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {item.type === "instagram"
                            ? `${item.likes} likes`
                            : `${item.views} views`}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Media details modal would be implemented here */}
    </div>
  );
};

export default MediaPage;
