import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Search, Plus, Edit, Trash2 } from "lucide-react";

const ClientsPage = () => {
  // Sample client data
  const clients = [
    {
      id: 1,
      name: "Sophie Martin",
      email: "sophie.martin@example.com",
      phone: "+33 6 12 34 56 78",
      program: "Personal Training",
      joinDate: "2023-05-15",
      status: "Active",
    },
    {
      id: 2,
      name: "Jean Dupont",
      email: "jean.dupont@example.com",
      phone: "+33 6 23 45 67 89",
      program: "Group Classes",
      joinDate: "2023-06-22",
      status: "Active",
    },
    {
      id: 3,
      name: "Marie Leclerc",
      email: "marie.leclerc@example.com",
      phone: "+33 6 34 56 78 90",
      program: "Kids Program",
      joinDate: "2023-07-10",
      status: "Active",
    },
    {
      id: 4,
      name: "Alexandre Blanc",
      email: "alexandre.blanc@example.com",
      phone: "+33 6 45 67 89 01",
      program: "Personal Training",
      joinDate: "2023-08-05",
      status: "Inactive",
    },
    {
      id: 5,
      name: "Camille Rousseau",
      email: "camille.rousseau@example.com",
      phone: "+33 6 56 78 90 12",
      program: "Group Classes",
      joinDate: "2023-09-18",
      status: "Active",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Clients
        </h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Client
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Search clients..." className="pl-10" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Export
            </Button>
            <Button variant="outline" size="sm">
              Filter
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700 text-xs uppercase">
              <tr>
                <th className="px-6 py-3 text-left text-gray-500 dark:text-gray-300 font-medium">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-gray-500 dark:text-gray-300 font-medium">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-gray-500 dark:text-gray-300 font-medium">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-gray-500 dark:text-gray-300 font-medium">
                  Program
                </th>
                <th className="px-6 py-3 text-left text-gray-500 dark:text-gray-300 font-medium">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-gray-500 dark:text-gray-300 font-medium">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-gray-500 dark:text-gray-300 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {clients.map((client) => (
                <tr
                  key={client.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {client.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-300">
                    {client.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-300">
                    {client.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-300">
                    {client.program}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-300">
                    {client.joinDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${client.status === "Active" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"}`}
                    >
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">5</span> of{" "}
            <span className="font-medium">5</span> results
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientsPage;
