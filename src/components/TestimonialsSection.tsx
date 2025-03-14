import React from "react";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

interface TestimonialProps {
  name: string;
  quote: string;
  rating: number;
  beforeImage: string;
  afterImage: string;
  program: string;
}

const testimonials: TestimonialProps[] = [
  {
    name: "Sophie Martin",
    quote:
      "Coach Ibra transformed my fitness journey. I lost 15kg and gained so much confidence!",
    rating: 5,
    beforeImage:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
    program: "Personal Training",
  },
  {
    name: "Jean Dupont",
    quote:
      "The group boxing classes are intense but so rewarding. I've never been fitter in my life.",
    rating: 5,
    beforeImage:
      "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?w=400&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1550345332-09e3ac987658?w=400&q=80",
    program: "Group Classes",
  },
  {
    name: "Marie Leclerc",
    quote:
      "My son has gained so much discipline and confidence through Coach Ibra's kids program.",
    rating: 5,
    beforeImage:
      "https://images.unsplash.com/photo-1588453383063-37ea0b78f30f?w=400&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=400&q=80",
    program: "Kids Program",
  },
  {
    name: "Alexandre Blanc",
    quote:
      "After 6 months with Coach Ibra, I've completely transformed my body and mindset.",
    rating: 5,
    beforeImage:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1583454155184-870a1f63aebc?w=400&q=80",
    program: "Personal Training",
  },
];

const TestimonialCard = ({
  testimonial,
}: {
  testimonial: TestimonialProps;
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col border border-gray-100">
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-1/2 h-64">
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <div className="text-white text-center p-4">
              <p className="font-bold">BEFORE</p>
            </div>
          </div>
          <img
            src={testimonial.beforeImage}
            alt={`${testimonial.name} before`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative w-full md:w-1/2 h-64">
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <div className="text-white text-center p-4">
              <p className="font-bold">AFTER</p>
            </div>
          </div>
          <img
            src={testimonial.afterImage}
            alt={`${testimonial.name} after`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="p-6 flex-grow">
        <div className="flex items-center mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
            />
          ))}
        </div>
        <p className="text-gray-800 italic mb-4 font-medium">
          "{testimonial.quote}"
        </p>
        <div className="mt-auto">
          <p className="font-bold text-lg text-gray-900">{testimonial.name}</p>
          <p className="text-sm text-gray-600">{testimonial.program} Client</p>
        </div>
      </div>
    </div>
  );
};

interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
  testimonials?: TestimonialProps[];
}

const TestimonialsSection = ({
  title = "Success Stories",
  subtitle = "See the transformations our clients have achieved with Coach Ibra's guidance",
  testimonials: customTestimonials = testimonials,
}: TestimonialsSectionProps) => {
  return (
    <section className="py-16 px-4 bg-gray-50" id="testimonials">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="relative px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {customTestimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3 pl-4 pr-4"
                >
                  <TestimonialCard testimonial={testimonial} />
                </CarouselItem>
              ))}
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
