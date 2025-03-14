import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Button } from "./ui/button";
import { MapPin, Calendar, Clock, Users, Filter } from "lucide-react";

interface ScheduleItem {
  id: string;
  day: string;
  time: string;
  program: "personal" | "group" | "kids";
  title: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  trainer: string;
}

interface ScheduleSectionProps {
  scheduleItems?: ScheduleItem[];
}

const ScheduleSection: React.FC<ScheduleSectionProps> = ({
  scheduleItems = [
    {
      id: "1",
      day: "Monday",
      time: "09:00 - 10:30",
      program: "personal",
      title: "Boxing Fundamentals",
      location: "Nice Central Gym",
      maxParticipants: 1,
      currentParticipants: 0,
      trainer: "Coach Ibra",
    },
    {
      id: "2",
      day: "Monday",
      time: "17:00 - 18:30",
      program: "group",
      title: "Boxing Circuit Training",
      location: "Nice Central Gym",
      maxParticipants: 10,
      currentParticipants: 6,
      trainer: "Coach Ibra",
    },
    {
      id: "3",
      day: "Tuesday",
      time: "16:00 - 17:00",
      program: "kids",
      title: "Kids Boxing Basics",
      location: "Nice Youth Center",
      maxParticipants: 8,
      currentParticipants: 5,
      trainer: "Coach Ibra",
    },
    {
      id: "4",
      day: "Wednesday",
      time: "09:00 - 10:30",
      program: "personal",
      title: "Advanced Boxing Techniques",
      location: "Nice Central Gym",
      maxParticipants: 1,
      currentParticipants: 0,
      trainer: "Coach Ibra",
    },
    {
      id: "5",
      day: "Thursday",
      time: "18:00 - 19:30",
      program: "group",
      title: "Boxing Fitness",
      location: "Nice Beach Club",
      maxParticipants: 12,
      currentParticipants: 8,
      trainer: "Coach Ibra",
    },
    {
      id: "6",
      day: "Friday",
      time: "16:00 - 17:00",
      program: "kids",
      title: "Kids Boxing Games",
      location: "Nice Youth Center",
      maxParticipants: 8,
      currentParticipants: 4,
      trainer: "Coach Ibra",
    },
    {
      id: "7",
      day: "Saturday",
      time: "10:00 - 11:30",
      program: "group",
      title: "Weekend Boxing Workout",
      location: "Nice Central Gym",
      maxParticipants: 15,
      currentParticipants: 12,
      trainer: "Coach Ibra",
    },
  ],
}) => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ScheduleItem | null>(null);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const filteredItems =
    activeFilter === "all"
      ? scheduleItems
      : scheduleItems.filter((item) => item.program === activeFilter);

  const handleRegisterClick = (item: ScheduleItem) => {
    setSelectedClass(item);
    setShowRegistrationForm(true);
  };

  // Simple registration form component
  const RegistrationForm = () => (
    <form id="registration-form" className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Full Name
        </label>
        <input
          type="text"
          id="name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          placeholder="Enter your full name"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          placeholder="Enter your phone number"
        />
      </div>
      <div>
        <label
          htmlFor="experience"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Experience Level
        </label>
        <select
          id="experience"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        >
          <option value="">Select your experience level</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Additional Notes
        </label>
        <textarea
          id="notes"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          placeholder="Any additional information we should know"
        ></textarea>
      </div>
    </form>
  );

  return (
    <section className="py-16 px-4 md:px-8 bg-gray-50" id="schedule">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Weekly Schedule
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find the perfect class that fits your schedule. Filter by program
            type and register directly.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="font-medium">Filter by:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={activeFilter === "all" ? "default" : "outline"}
              onClick={() => setActiveFilter("all")}
            >
              All Classes
            </Button>
            <Button
              variant={activeFilter === "personal" ? "default" : "outline"}
              onClick={() => setActiveFilter("personal")}
            >
              Personal Training
            </Button>
            <Button
              variant={activeFilter === "group" ? "default" : "outline"}
              onClick={() => setActiveFilter("group")}
            >
              Group Classes
            </Button>
            <Button
              variant={activeFilter === "kids" ? "default" : "outline"}
              onClick={() => setActiveFilter("kids")}
            >
              Kids Program
            </Button>
          </div>
        </div>

        <Tabs defaultValue="Monday" className="w-full">
          <TabsList className="mb-8 flex flex-wrap justify-center w-full bg-transparent">
            {days.map((day) => (
              <TabsTrigger
                key={day}
                value={day}
                className="px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                {day}
              </TabsTrigger>
            ))}
          </TabsList>

          {days.map((day) => (
            <TabsContent
              key={day}
              value={day}
              className="focus-visible:outline-none focus-visible:ring-0"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
                <div className="grid grid-cols-1 divide-y divide-gray-200">
                  {filteredItems.filter((item) => item.day === day).length >
                  0 ? (
                    filteredItems
                      .filter((item) => item.day === day)
                      .map((item) => (
                        <div
                          key={item.id}
                          className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                        >
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2">
                              {item.title}
                            </h3>
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center gap-2 text-gray-600">
                                <Clock className="h-4 w-4" />
                                <span>{item.time}</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-600">
                                <MapPin className="h-4 w-4" />
                                <span>{item.location}</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-600">
                                <Users className="h-4 w-4" />
                                <span>
                                  {item.currentParticipants}/
                                  {item.maxParticipants} participants
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <div
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                              ${
                                item.program === "personal"
                                  ? "bg-blue-100 text-blue-900 font-semibold"
                                  : item.program === "group"
                                    ? "bg-green-100 text-green-900 font-semibold"
                                    : "bg-purple-100 text-purple-900 font-semibold"
                              }`}
                            >
                              {item.program === "personal"
                                ? "Personal Training"
                                : item.program === "group"
                                  ? "Group Class"
                                  : "Kids Program"}
                            </div>
                            <Button
                              onClick={() => handleRegisterClick(item)}
                              disabled={
                                item.currentParticipants >= item.maxParticipants
                              }
                              className="whitespace-nowrap"
                            >
                              {item.currentParticipants >= item.maxParticipants
                                ? "Class Full"
                                : "Register Now"}
                            </Button>
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-lg">
                        No classes scheduled for this day
                      </p>
                      {activeFilter !== "all" && (
                        <p className="mt-2">
                          Try changing your filter selection
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-12">
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-semibold mb-4">Training Locations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-lg overflow-hidden">
                <h4 className="font-medium mb-2">Nice Central Gym</h4>
                <div className="aspect-video bg-gray-200 rounded-lg">
                  {/* Map would be integrated here */}
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <MapPin className="h-8 w-8 text-gray-400" />
                    <span className="ml-2 text-gray-600">Map integration</span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  123 Central Avenue, Nice, France
                </p>
              </div>
              <div className="rounded-lg overflow-hidden">
                <h4 className="font-medium mb-2">Nice Youth Center</h4>
                <div className="aspect-video bg-gray-200 rounded-lg">
                  {/* Map would be integrated here */}
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <MapPin className="h-8 w-8 text-gray-400" />
                    <span className="ml-2 text-gray-600">Map integration</span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  45 Youth Street, Nice, France
                </p>
              </div>
            </div>
          </div>
        </div>

        {showRegistrationForm && selectedClass && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Register for {selectedClass.title}
                </h3>
                <div className="mb-4">
                  <p className="text-gray-600">
                    {selectedClass.day}, {selectedClass.time}
                  </p>
                  <p className="text-gray-600">{selectedClass.location}</p>
                </div>
                <RegistrationForm />
                <div className="mt-4 flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setShowRegistrationForm(false)}
                    className="mr-2"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" form="registration-form">
                    Complete Registration
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ScheduleSection;
