import React, { useEffect, useState } from "react";
import { Dumbbell, Users, Baby } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

interface ServiceProps {
  id: number;
  name: string;
  description: string;
  pricing: string[];
}

const iconMap: Record<string, React.ReactNode> = {
  "Coaching Personnel": <Dumbbell className="h-8 w-8 text-blue-700" />,
  "Cours Collectifs": <Users className="h-8 w-8 text-blue-700" />,
  "Programme Enfants": <Baby className="h-8 w-8 text-blue-700" />,
};

const ServicesSection = () => {
  const [services, setServices] = useState<ServiceProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/services")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch services");
        return res.json();
      })
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Coach Ibra propose une variété de programmes pour atteindre vos objectifs, en individuel, en groupe ou pour enfants.
          </p>
        </div>
        {loading ? (
          <div className="text-center text-gray-500">Chargement...</div>
        ) : error ? (
          <div className="text-center text-red-500">Erreur : {error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center border border-gray-100">
                <div className="bg-blue-100 p-4 rounded-full mb-4 shadow-sm">
                  {iconMap[service.name] || <Dumbbell className="h-8 w-8 text-blue-700" />}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{service.name}</h3>
                <p className="text-gray-700 mb-4">{service.description}</p>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="pricing">
                    <AccordionTrigger className="text-blue-700 font-medium hover:text-blue-800">
                      Voir les tarifs
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 text-left">
                        {service.pricing.map((price, index) => (
                          <li key={index} className="mb-1">{price}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
