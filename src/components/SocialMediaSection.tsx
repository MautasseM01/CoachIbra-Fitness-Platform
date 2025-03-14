import React from "react";
import { Instagram, Youtube, ExternalLink } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

interface SocialMediaSectionProps {
  instagramPosts?: {
    id: string;
    imageUrl: string;
    caption: string;
    likes: number;
    url: string;
  }[];
  youtubeVideos?: {
    id: string;
    thumbnailUrl: string;
    title: string;
    views: number;
    url: string;
  }[];
}

const SocialMediaSection = ({
  instagramPosts = [
    {
      id: "1",
      imageUrl:
        "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&q=80",
      caption: "Morning boxing session with my champions! #BoxingLife",
      likes: 245,
      url: "https://instagram.com",
    },
    {
      id: "2",
      imageUrl:
        "https://images.unsplash.com/photo-1549476464-37392f717541?w=600&q=80",
      caption: "Kids class learning the fundamentals #FutureFighters",
      likes: 187,
      url: "https://instagram.com",
    },
    {
      id: "3",
      imageUrl:
        "https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?w=600&q=80",
      caption:
        "Personal training session focusing on technique #BoxingTechnique",
      likes: 312,
      url: "https://instagram.com",
    },
  ],
  youtubeVideos = [
    {
      id: "1",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=600&q=80",
      title: "Basic Boxing Techniques for Beginners",
      views: 15420,
      url: "https://youtube.com",
    },
    {
      id: "2",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=600&q=80",
      title: "Kids Boxing Class Highlights",
      views: 8753,
      url: "https://youtube.com",
    },
    {
      id: "3",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1517438476312-10d79c077509?w=600&q=80",
      title: "Advanced Footwork Drills",
      views: 12089,
      url: "https://youtube.com",
    },
  ],
}: SocialMediaSectionProps) => {
  return (
    <section className="py-16 px-4 md:px-8 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Follow Coach Ibra
        </h2>

        {/* Instagram Feed */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Instagram className="h-6 w-6 text-pink-700" />
            <h3 className="text-2xl font-semibold">Instagram</h3>
          </div>

          <Carousel className="w-full">
            <CarouselContent>
              {instagramPosts.map((post) => (
                <CarouselItem
                  key={post.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="overflow-hidden">
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.caption}
                        className="object-cover w-full h-full transition-transform hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-800 line-clamp-2 mb-2 font-medium">
                        {post.caption}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          {post.likes} likes
                        </span>
                        <a
                          href={post.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 hover:text-blue-900 flex items-center gap-1 text-sm font-medium"
                        >
                          View <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-6 lg:-left-8" />
            <CarouselNext className="-right-4 md:-right-6 lg:-right-8" />
          </Carousel>

          <div className="text-center mt-6">
            <Button variant="outline" className="mt-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Instagram className="h-4 w-4" />
                Follow on Instagram
              </a>
            </Button>
          </div>
        </div>

        {/* YouTube Videos */}
        <div>
          <div className="flex items-center justify-center gap-2 mb-8">
            <Youtube className="h-6 w-6 text-red-700" />
            <h3 className="text-2xl font-semibold">YouTube</h3>
          </div>

          <Carousel className="w-full">
            <CarouselContent>
              {youtubeVideos.map((video) => (
                <CarouselItem
                  key={video.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="overflow-hidden">
                    <div className="relative aspect-video overflow-hidden group">
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="object-cover w-full h-full transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-red-700 rounded-full p-3 opacity-90 group-hover:opacity-100 transition-opacity">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white"
                          >
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-medium line-clamp-1 mb-2">
                        {video.title}
                      </h4>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          {video.views.toLocaleString()} views
                        </span>
                        <a
                          href={video.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 hover:text-blue-900 flex items-center gap-1 text-sm font-medium"
                        >
                          Watch <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-6 lg:-left-8" />
            <CarouselNext className="-right-4 md:-right-6 lg:-right-8" />
          </Carousel>

          <div className="text-center mt-6">
            <Button variant="outline" className="mt-4">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Youtube className="h-4 w-4" />
                Subscribe on YouTube
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaSection;
