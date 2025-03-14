import React from "react";
import { Dumbbell, Users, Baby } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

interface ServiceProps {
  title: string;
  description: string;
  pricing: string[];
  icon: React.ReactNode;
}

const Service = ({ title, description, pricing, icon }: ServiceProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center border border-gray-100">
      <div className="bg-blue-100 p-4 rounded-full mb-4 shadow-sm">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-700 mb-4">{description}</p>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="pricing">
          <AccordionTrigger className="text-blue-700 font-medium hover:text-blue-800">
            View Pricing
          </AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-5 text-left">
              {pricing.map((price, index) => (
                <li key={index} className="mb-1">
                  {price}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

interface ServicesSectionProps {
  services?: ServiceProps[];
}

const ServicesSection = ({
  services = [
    {
      title: "Personal Training",
      description:
        "One-on-one training sessions tailored to your specific fitness goals and needs.",
      pricing: [
        "Single Session: €60",
        "5 Sessions Package: €275 (€55/session)",
        "10 Sessions Package: €500 (€50/session)",
        "Monthly Unlimited (3x/week): €550",
      ],
      icon: <Dumbbell className="h-8 w-8 text-blue-700" />,
    },
    {
      title: "Group Classes",
      description:
        "High-energy group sessions focusing on boxing techniques, conditioning, and teamwork.",
      pricing: [
        "Drop-in Class: €25",
        "5 Class Card: €110 (€22/class)",
        "10 Class Card: €200 (€20/class)",
        "Monthly Unlimited: €220",
      ],
      icon: <Users className="h-8 w-8 text-blue-700" />,
    },
    {
      title: "Kids Program",
      description:
        "Fun and engaging boxing classes designed specifically for children ages 7-14.",
      pricing: [
        "Single Class: €20",
        "5 Class Card: €90 (€18/class)",
        "10 Class Card: €160 (€16/class)",
        "Monthly Unlimited (2x/week): €150",
      ],
      icon: <Baby className="h-8 w-8 text-blue-700" />,
    },
  ],
}: ServicesSectionProps) => {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Coach Ibra offers a variety of training programs to help you achieve
            your fitness goals, whether you're looking for personal attention,
            group motivation, or programs for your children.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Service
              key={index}
              title={service.title}
              description={service.description}
              pricing={service.pricing}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
