import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Search,
  Star,
  Trash2,
  Send,
  Reply,
  Archive,
  Mail,
  MailOpen,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";

const MessagesPage = () => {
  const { t } = useTranslation();
  const [selectedMessage, setSelectedMessage] = React.useState(null);

  // Sample messages data
  const messages = [
    {
      id: 1,
      sender: "Sophie Martin",
      email: "sophie.martin@example.com",
      subject: "Question about personal training",
      message:
        "Hello Coach Ibra, I'm interested in starting personal training sessions with you. I have some questions about the pricing and scheduling. Could you please provide more information? Thank you!",
      date: "2023-10-15T14:30:00",
      read: true,
      starred: true,
    },
    {
      id: 2,
      sender: "Jean Dupont",
      email: "jean.dupont@example.com",
      subject: "Group class registration",
      message:
        "Hi there, I'd like to register for the Boxing Circuit Training class on Mondays at 17:00. Is there still space available? Also, do I need to bring any equipment? Thanks in advance.",
      date: "2023-10-14T09:15:00",
      read: false,
      starred: false,
    },
    {
      id: 3,
      sender: "Marie Leclerc",
      email: "marie.leclerc@example.com",
      subject: "Kids program inquiry",
      message:
        "Good day, I'm considering enrolling my 9-year-old son in your kids boxing program. Could you tell me more about what the classes involve and if there are any prerequisites? I want to make sure it's appropriate for his age and experience level. Thank you for your time.",
      date: "2023-10-13T16:45:00",
      read: true,
      starred: false,
    },
    {
      id: 4,
      sender: "Alexandre Blanc",
      email: "alexandre.blanc@example.com",
      subject: "Cancellation request",
      message:
        "Hello, I need to cancel my personal training session scheduled for tomorrow morning due to an unexpected work commitment. Is it possible to reschedule for later this week? Sorry for the inconvenience.",
      date: "2023-10-12T11:20:00",
      read: true,
      starred: false,
    },
    {
      id: 5,
      sender: "Camille Rousseau",
      email: "camille.rousseau@example.com",
      subject: "Feedback on first class",
      message:
        "Hi Coach Ibra, I just wanted to say thank you for the amazing first group class yesterday! The workout was challenging but very rewarding. I'm already feeling the benefits and can't wait for the next session. Your coaching style is very motivating!",
      date: "2023-10-11T18:05:00",
      read: false,
      starred: true,
    },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          {t("admin.messages")}
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Archive className="h-4 w-4" />
            {t("admin.archive")}
          </Button>
          <Button className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            {t("admin.composeNew")}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="lg:col-span-1">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={t("admin.searchMessages")}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedMessage?.id === message.id ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800" : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700"} ${!message.read ? "border-l-4 border-l-blue-500" : ""}`}
                onClick={() => setSelectedMessage(message)}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="font-medium flex items-center gap-2">
                    {!message.read && (
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    )}
                    {message.sender}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(message.date)}
                  </div>
                </div>
                <div className="font-medium text-sm mb-1 flex items-center gap-1">
                  {message.starred && (
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  )}
                  {message.subject}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                  {message.message}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message View */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-bold">
                      {selectedMessage.subject}
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-medium">
                        {selectedMessage.sender}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        &lt;{selectedMessage.email}&gt;
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {formatDate(selectedMessage.date)}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        setSelectedMessage({
                          ...selectedMessage,
                          starred: !selectedMessage.starred,
                        })
                      }
                    >
                      <Star
                        className={`h-5 w-5 ${selectedMessage.starred ? "fill-yellow-400 text-yellow-400" : ""}`}
                      />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-5 w-5 text-red-500" />
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-4 mb-6">
                  <p className="whitespace-pre-line">
                    {selectedMessage.message}
                  </p>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-3">{t("admin.reply")}</h3>
                  <Textarea
                    placeholder={t("admin.typeYourReply")}
                    rows={5}
                    className="mb-3"
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">{t("admin.discard")}</Button>
                    <Button className="flex items-center gap-2">
                      <Reply className="h-4 w-4" />
                      {t("admin.sendReply")}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center border rounded-lg bg-gray-50 dark:bg-gray-800 p-12">
              <div className="text-center">
                <MailOpen className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium mb-2">
                  {t("admin.noMessageSelected")}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {t("admin.selectMessageToView")}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
