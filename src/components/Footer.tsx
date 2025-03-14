import React from "react";
import {
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface FooterProps {
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
}

const Footer = ({
  contactEmail = "coach.ibra@example.com",
  contactPhone = "+33 6 12 34 56 78",
  address = "123 Avenue de la Boxe, Nice, France",
  socialLinks = {
    facebook: "https://facebook.com/coachIbra",
    instagram: "https://instagram.com/coach_ibra",
    youtube: "https://youtube.com/coachIbra",
  },
}: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-white py-12 px-4 md:px-8 lg:px-12 w-full">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail size={18} />
                <a
                  href={`mailto:${contactEmail}`}
                  className="hover:text-blue-400 transition-colors"
                >
                  {contactEmail}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} />
                <a
                  href={`tel:${contactPhone}`}
                  className="hover:text-blue-400 transition-colors"
                >
                  {contactPhone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={18} className="mt-1" />
                <span>{address}</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-blue-400 transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#schedule"
                  className="hover:text-blue-400 transition-colors"
                >
                  Schedule
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="hover:text-blue-400 transition-colors"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-blue-400 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
            <p className="mb-4">
              Subscribe to our newsletter for training tips and updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-md bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-8 flex justify-center space-x-6">
          <a
            href={socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
            aria-label="Facebook"
          >
            <Facebook size={24} />
          </a>
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={24} />
          </a>
          <a
            href={socialLinks.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
            aria-label="YouTube"
          >
            <Youtube size={24} />
          </a>
        </div>

        <Separator className="my-8 bg-slate-800" />

        {/* Copyright */}
        <div className="text-center text-sm text-slate-300">
          <p>
            &copy; {currentYear} Coach Ibra Personal Training. All rights
            reserved.
          </p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-blue-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
