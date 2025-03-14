import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Users, Calendar, MessageSquare, TrendingUp } from "lucide-react";

const Dashboard = () => {
  // Sample data for dashboard
  const stats = [
    {
      title: "Total Clients",
      value: "124",
      change: "+12%",
      icon: <Users className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Classes This Week",
      value: "28",
      change: "+3",
      icon: <Calendar className="h-8 w-8 text-green-500" />,
    },
    {
      title: "New Messages",
      value: "15",
      change: "5 unread",
      icon: <MessageSquare className="h-8 w-8 text-yellow-500" />,
    },
    {
      title: "Revenue",
      value: "€4,250",
      change: "+8%",
      icon: <TrendingUp className="h-8 w-8 text-purple-500" />,
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Clients</CardTitle>
            <CardDescription>Latest client registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Sophie Martin",
                  date: "Today",
                  program: "Personal Training",
                },
                {
                  name: "Jean Dupont",
                  date: "Yesterday",
                  program: "Group Classes",
                },
                {
                  name: "Marie Leclerc",
                  date: "2 days ago",
                  program: "Kids Program",
                },
                {
                  name: "Alexandre Blanc",
                  date: "3 days ago",
                  program: "Personal Training",
                },
              ].map((client, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{client.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {client.program}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {client.date}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Classes</CardTitle>
            <CardDescription>Next 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Boxing Fundamentals",
                  time: "09:00 - 10:30",
                  participants: "1/1",
                },
                {
                  title: "Boxing Circuit Training",
                  time: "17:00 - 18:30",
                  participants: "6/10",
                },
                {
                  title: "Kids Boxing Basics",
                  time: "16:00 - 17:00",
                  participants: "5/8",
                },
                {
                  title: "Advanced Boxing Techniques",
                  time: "09:00 - 10:30",
                  participants: "0/1",
                },
              ].map((session, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{session.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {session.time}
                    </p>
                  </div>
                  <span className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {session.participants}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
