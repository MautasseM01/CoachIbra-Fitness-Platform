import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

interface TestimonialProps {
  id: number;
  author: string;
  content: string;
}

const fallbackTestimonials: TestimonialProps[] = [
  {
    id: 1,
    author: "Alice",
    content: "Coach Ibra m'a aidé à transformer ma vie!",
  },
  {
    id: 2,
    author: "Karim",
    content: "Des cours variés et une super ambiance.",
  },
];

const TestimonialCard = ({ testimonial }: { testimonial: TestimonialProps }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col border border-gray-100 p-6 justify-center text-center">
      <div className="flex items-center justify-center mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 text-yellow-500 fill-yellow-500`}
          />
        ))}
      </div>
      <p className="text-gray-800 italic mb-4 font-medium">
        "{testimonial.content}"
      </p>
      <div className="mt-auto">
        <p className="font-bold text-lg text-gray-900">{testimonial.author}</p>
      </div>
    </div>
  );
};

interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
}

const TestimonialsSection = ({
  title = "Success Stories",
  subtitle = "See the transformations our clients have achieved with Coach Ibra's guidance",
}: TestimonialsSectionProps) => {
  const [testimonials, setTestimonials] = useState<TestimonialProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/testimonials")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch testimonials");
        return res.json();
      })
      .then((data) => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch(() => {
        setTestimonials(fallbackTestimonials);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-16 px-4 bg-gray-50" id="testimonials">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>
        <div className="relative px-12">
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent>
              {loading ? (
                <CarouselItem className="md:basis-1/2 lg:basis-1/3 pl-4 pr-4">
                  <div className="text-center text-gray-500">Chargement...</div>
                </CarouselItem>
              ) : error ? (
                <CarouselItem className="md:basis-1/2 lg:basis-1/3 pl-4 pr-4">
                  <div className="text-center text-red-500">Erreur : {error}</div>
                </CarouselItem>
              ) : (
                testimonials.map((testimonial, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/3 pl-4 pr-4"
                  >
                    <TestimonialCard testimonial={testimonial} />
                  </CarouselItem>
                ))
              )}
            </CarouselContent>
            <CarouselPrevious className="-left-6" />
            <CarouselNext className="-right-6" />
          </Carousel>
        </div>
        <div className="mt-10 text-center">
          <p className="text-gray-600 italic">
            Join our community and start your transformation journey today!
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
