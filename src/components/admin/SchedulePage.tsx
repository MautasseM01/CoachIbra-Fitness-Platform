import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const SchedulePage = () => {
  const { t } = useTranslation();
  const [activeDay, setActiveDay] = useState("monday");

  // Sample schedule data
  const scheduleItems = [
    {
      id: "1",
      day: "monday",
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
      day: "monday",
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
      day: "tuesday",
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
      day: "wednesday",
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
      day: "thursday",
      time: "18:00 - 19:30",
      program: "group",
      title: "Boxing Fitness",
      location: "Nice Beach Club",
      maxParticipants: 12,
      currentParticipants: 8,
      trainer: "Coach Ibra",
    },
  ];

  const days = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          {t("admin.schedule")}
        </h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          {t("admin.addClass")}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>{t("admin.filters")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                {t("admin.location")}
              </label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder={t("admin.allLocations")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("admin.allLocations")}</SelectItem>
                  <SelectItem value="nice-central">Nice Central Gym</SelectItem>
                  <SelectItem value="nice-youth">Nice Youth Center</SelectItem>
                  <SelectItem value="nice-beach">Nice Beach Club</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                {t("admin.program")}
              </label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder={t("admin.allPrograms")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("admin.allPrograms")}</SelectItem>
                  <SelectItem value="personal">
                    {t("schedule.personalTraining")}
                  </SelectItem>
                  <SelectItem value="group">
                    {t("schedule.groupClasses")}
                  </SelectItem>
                  <SelectItem value="kids">
                    {t("schedule.kidsProgram")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                {t("admin.trainer")}
              </label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder={t("admin.allTrainers")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("admin.allTrainers")}</SelectItem>
                  <SelectItem value="ibra">Coach Ibra</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                {t("admin.dateRange")}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Input type="date" className="w-full" />
                <Input type="date" className="w-full" />
              </div>
            </div>

            <Button className="w-full">{t("admin.applyFilters")}</Button>
          </CardContent>
        </Card>

        {/* Main content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>{t("admin.weeklySchedule")}</CardTitle>
              <CardDescription>{t("admin.manageClasses")}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                defaultValue="monday"
                value={activeDay}
                onValueChange={setActiveDay}
              >
                <TabsList className="mb-4 w-full">
                  {days.map((day) => (
                    <TabsTrigger key={day.value} value={day.value}>
                      {day.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {days.map((day) => (
                  <TabsContent key={day.value} value={day.value}>
                    <div className="space-y-4">
                      {scheduleItems.filter((item) => item.day === day.value)
                        .length > 0 ? (
                        scheduleItems
                          .filter((item) => item.day === day.value)
                          .map((item) => (
                            <div
                              key={item.id}
                              className="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm"
                            >
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                  <h3 className="text-lg font-semibold">
                                    {item.title}
                                  </h3>
                                  <div className="flex flex-col gap-1 mt-2">
                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                      <Clock className="h-4 w-4" />
                                      <span>{item.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                      <MapPin className="h-4 w-4" />
                                      <span>{item.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
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
                                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                        : item.program === "group"
                                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                          : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                                    }`}
                                  >
                                    {item.program === "personal"
                                      ? t("schedule.personalTraining")
                                      : item.program === "group"
                                        ? t("schedule.groupClasses")
                                        : t("schedule.kidsProgram")}
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="flex items-center gap-1"
                                    >
                                      <Edit className="h-3 w-3" />
                                      {t("admin.edit")}
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="flex items-center gap-1 text-red-500 hover:text-red-600"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                      {t("admin.delete")}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                      ) : (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                          <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>{t("schedule.noClasses")}</p>
                          <Button className="mt-4">
                            <Plus className="h-4 w-4 mr-2" />
                            {t("admin.addClass")}
                          </Button>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
