import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Dumbbell,
  Users,
  Baby,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const ProgramsPage = () => {
  const { t } = useTranslation();

  // Sample programs data
  const programs = [
    {
      id: 1,
      name: "Personal Training",
      description:
        "One-on-one training sessions tailored to your specific fitness goals and needs.",
      icon: <Dumbbell className="h-8 w-8 text-blue-600" />,
      pricing: [
        "Single Session: €60",
        "5 Sessions Package: €275 (€55/session)",
        "10 Sessions Package: €500 (€50/session)",
        "Monthly Unlimited (3x/week): €550",
      ],
      active: true,
      type: "personal",
    },
    {
      id: 2,
      name: "Group Classes",
      description:
        "High-energy group sessions focusing on boxing techniques, conditioning, and teamwork.",
      icon: <Users className="h-8 w-8 text-green-600" />,
      pricing: [
        "Drop-in Class: €25",
        "5 Class Card: €110 (€22/class)",
        "10 Class Card: €200 (€20/class)",
        "Monthly Unlimited: €220",
      ],
      active: true,
      type: "group",
    },
    {
      id: 3,
      name: "Kids Program",
      description:
        "Fun and engaging boxing classes designed specifically for children ages 7-14.",
      icon: <Baby className="h-8 w-8 text-purple-600" />,
      pricing: [
        "Single Class: €20",
        "5 Class Card: €90 (€18/class)",
        "10 Class Card: €160 (€16/class)",
        "Monthly Unlimited (2x/week): €150",
      ],
      active: true,
      type: "kids",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          {t("admin.programs")}
        </h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          {t("admin.addProgram")}
        </Button>
      </div>

      <Tabs defaultValue="all">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">{t("admin.allPrograms")}</TabsTrigger>
            <TabsTrigger value="active">
              {t("admin.activePrograms")}
            </TabsTrigger>
            <TabsTrigger value="inactive">
              {t("admin.inactivePrograms")}
            </TabsTrigger>
          </TabsList>

          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder={t("admin.searchPrograms")} className="pl-10" />
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs
              .filter((p) => p.active)
              .map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="inactive" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs
              .filter((p) => !p.active)
              .map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Program Editor (would be a modal in a real implementation) */}
      <div className="mt-8 p-6 border rounded-lg bg-white dark:bg-gray-800 shadow-md">
        <h2 className="text-xl font-bold mb-4">{t("admin.editProgram")}</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              {t("admin.programName")}
            </label>
            <Input defaultValue="Personal Training" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              {t("admin.description")}
            </label>
            <Textarea
              defaultValue="One-on-one training sessions tailored to your specific fitness goals and needs."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              {t("admin.pricing")}
            </label>
            <div className="space-y-2">
              {programs[0].pricing.map((price, index) => (
                <div key={index} className="flex gap-2">
                  <Input defaultValue={price} className="flex-1" />
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" className="mt-2">
                <Plus className="h-4 w-4 mr-2" />
                {t("admin.addPricingOption")}
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline">{t("admin.cancel")}</Button>
            <Button>{t("admin.saveChanges")}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProgramCard = ({ program }) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
              {program.icon}
            </div>
            <CardTitle>{program.name}</CardTitle>
          </div>
          <div
            className={`px-2 py-1 text-xs font-semibold rounded-full ${program.active ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"}`}
          >
            {program.active ? t("admin.active") : t("admin.inactive")}
          </div>
        </div>
        <CardDescription className="mt-2">
          {program.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h4 className="font-medium mb-2">{t("admin.pricingOptions")}</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          {program.pricing.map((price, index) => (
            <li key={index}>{price}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-2">
        <Button variant="outline" size="sm" className="flex items-center gap-1">
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
      </CardFooter>
    </Card>
  );
};

export default ProgramsPage;
