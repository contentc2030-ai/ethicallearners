"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/dashboard-component/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/dashboard-component/ui/tabs";
import toast from "react-hot-toast";
import { Loader2, Mail, Send, UserCheck } from "lucide-react";
import { format } from "date-fns";

interface Subscriber {
  _id: string;
  email: string;
  subscribedAt: string;
}

export default function EmailSubscribers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [selectedSubscribers, setSelectedSubscribers] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 50,
    pages: 1,
  });

  // Email form state
  const [emailForm, setEmailForm] = useState({
    subject: "",
    message: "",
    senderName: "Ethical Learner Team",
  });

  // Fetch subscribers
  const fetchSubscribers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/admin/subscribers?page=${pagination.page}&limit=${pagination.limit}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch subscribers");
      }

      const data = await response.json();
      setSubscribers(data.subscribers);
      setPagination(data.pagination);
    } catch (error) {
      toast.error("Failed to load subscribers");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit]);

  useEffect(() => {
    fetchSubscribers();
  }, [fetchSubscribers]);

  // Handle form inputs
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setEmailForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle subscriber selection
  const toggleSubscriber = (id: string) => {
    setSelectedSubscribers((prev) => {
      if (prev.includes(id)) {
        return prev.filter((subId) => subId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Toggle select all
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedSubscribers([]);
    } else {
      setSelectedSubscribers(subscribers.map((sub) => sub._id));
    }
    setSelectAll(!selectAll);
  };

  // Send email
  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailForm.subject || !emailForm.message) {
      toast.error("Please fill in subject and message");
      return;
    }

    try {
      setSendingEmail(true);

      const response = await fetch("/api/admin/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscriberIds: selectedSubscribers,
          subject: emailForm.subject,
          message: emailForm.message,
          senderName: emailForm.senderName,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send email");
      }

      const data = await response.json();
      toast.success(`Email sent to ${data.count} subscribers!`);

      // Reset form
      setEmailForm({
        subject: "",
        message: "",
        senderName: "Ethical Learner Team",
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to send email",
      );
      console.error(error);
    } finally {
      setSendingEmail(false);
    }
  };

  // Handle pagination
  const goToPage = (page: number) => {
    if (page < 1 || page > pagination.pages) return;
    setPagination((prev) => ({ ...prev, page }));
  };

  return (
    <Tabs defaultValue="compose" className="w-full">
      <TabsList className="grid w-full grid-cols-2 bg-[#0F1729] text-white">
        <TabsTrigger
          value="compose"
          className="flex items-center gap-2 data-[state=active]:bg-[#4CC9F0] data-[state=active]:text-[#0F1729]">
          <Mail className="h-4 w-4" />
          <span>Compose Email</span>
        </TabsTrigger>
        <TabsTrigger
          value="subscribers"
          className="flex items-center gap-2 data-[state=active]:bg-[#4CC9F0] data-[state=active]:text-[#0F1729]">
          <UserCheck className="h-4 w-4" />
          <span>Subscribers List</span>
        </TabsTrigger>
      </TabsList>

      {/* Compose Email Tab */}
      <TabsContent value="compose">
        <Card className="bg-[#0F1729] border-[#4CC9F0] border text-white">
          <CardHeader>
            <CardTitle className="text-white">
              Send Email to Subscribers
            </CardTitle>
            <CardDescription className="text-gray-300">
              Compose a message to send to selected subscribers.
              {selectedSubscribers.length > 0 ? (
                <span className="ml-2 font-medium text-[#4CC9F0]">
                  {selectedSubscribers.length} subscriber(s) selected
                </span>
              ) : (
                <span className="ml-2 font-medium text-[#10B981]">
                  Email will be sent to all subscribers
                </span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={sendEmail} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="senderName"
                  className="text-sm font-medium text-white">
                  Sender Name
                </label>
                <Input
                  id="senderName"
                  name="senderName"
                  value={emailForm.senderName}
                  onChange={handleInputChange}
                  placeholder="Ethical Learner Team"
                  className="max-w-md bg-[#1A2540] border-[#4CC9F0] text-white placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium text-white">
                  Subject Line
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={emailForm.subject}
                  onChange={handleInputChange}
                  placeholder="Enter email subject"
                  className="bg-[#1A2540] border-[#4CC9F0] text-white placeholder:text-gray-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-white">
                  Message
                </label>
                <div className="border border-[#4CC9F0] rounded-md">
                  <textarea
                    id="message"
                    name="message"
                    value={emailForm.message}
                    onChange={handleInputChange}
                    placeholder="Enter your message here..."
                    rows={12}
                    className="w-full p-3 focus:outline-none rounded-md bg-[#1A2540] text-white placeholder:text-gray-400"
                    required
                  />
                </div>
                <p className="text-xs text-gray-400">
                  You can use HTML tags for formatting. For example,
                  &lt;b&gt;bold text&lt;/b&gt;
                </p>
              </div>

              <Button
                type="submit"
                className="bg-[#4CC9F0] hover:bg-[#3DB8E0] text-[#0F1729] gap-2"
                disabled={sendingEmail}>
                {sendingEmail ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Send Email</span>
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Subscribers List Tab */}
      <TabsContent value="subscribers">
        <Card className="bg-[#0F1729] border-[#4CC9F0] border text-white">
          <CardHeader>
            <CardTitle className="text-white">Subscribers List</CardTitle>
            <CardDescription className="text-gray-300">
              Select subscribers to send targeted emails.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-[#4CC9F0]" />
              </div>
            ) : subscribers.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Checkbox
                    id="selectAll"
                    checked={selectAll}
                    onCheckedChange={toggleSelectAll}
                    className="border-[#4CC9F0] data-[state=checked]:bg-[#4CC9F0] data-[state=checked]:text-[#0F1729]"
                  />
                  <label
                    htmlFor="selectAll"
                    className="text-sm font-medium cursor-pointer text-white">
                    Select All
                  </label>
                </div>

                <div className="border border-[#4CC9F0] rounded-md">
                  <div className="grid grid-cols-12 bg-[#1A2540] p-3 text-sm font-medium text-white">
                    <div className="col-span-1">Select</div>
                    <div className="col-span-7">Email</div>
                    <div className="col-span-4">Subscribed At</div>
                  </div>

                  <div className="divide-y divide-[#4CC9F0]/30 max-h-[400px] overflow-y-auto">
                    {subscribers.map((subscriber) => (
                      <div
                        key={subscriber._id}
                        className="grid grid-cols-12 p-3 items-center hover:bg-[#1A2540] text-white">
                        <div className="col-span-1">
                          <Checkbox
                            id={subscriber._id}
                            checked={selectedSubscribers.includes(
                              subscriber._id,
                            )}
                            onCheckedChange={() =>
                              toggleSubscriber(subscriber._id)
                            }
                            className="border-[#4CC9F0] data-[state=checked]:bg-[#4CC9F0] data-[state=checked]:text-[#0F1729]"
                          />
                        </div>
                        <div className="col-span-7 truncate">
                          {subscriber.email}
                        </div>
                        <div className="col-span-4 text-sm text-gray-400">
                          {format(
                            new Date(subscriber.subscribedAt),
                            "MMM d, yyyy",
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="flex justify-center gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => goToPage(pagination.page - 1)}
                      disabled={pagination.page === 1}
                      className="border-[#4CC9F0] text-white hover:bg-[#4CC9F0] hover:text-[#0F1729] disabled:opacity-50">
                      Previous
                    </Button>
                    <span className="flex h-9 items-center px-2 text-white">
                      Page {pagination.page} of {pagination.pages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => goToPage(pagination.page + 1)}
                      disabled={pagination.page === pagination.pages}
                      className="border-[#4CC9F0] text-white hover:bg-[#4CC9F0] hover:text-[#0F1729] disabled:opacity-50">
                      Next
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                No subscribers found.
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-gray-400">
              Total subscribers: {pagination.total}
            </p>
            {selectedSubscribers.length > 0 && (
              <Button
                variant="default"
                size="sm"
                className="bg-[#4CC9F0] hover:bg-[#3DB8E0] text-[#0F1729]"
                onClick={() => {
                  document
                    .querySelector('[data-value="compose"]')
                    ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
                }}>
                Compose Email ({selectedSubscribers.length})
              </Button>
            )}
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
