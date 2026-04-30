"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/dashboard-component/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/dashboard-component/ui/card";
import { Button } from "@/components/dashboard-component/ui/button";
import { Badge } from "@/components/dashboard-component/ui/badge";
import { Check, XCircle, ClipboardCheck, Clock, RefreshCw } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/dashboard-component/ui/skeleton";

interface FormSubmission {
  _id: string;
  formName: string;
  formData: Record<string, any>;
  createdAt: string;
  resolved: boolean;
}

export function FormSubmissions() {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("unresolved");

  const fetchSubmissions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/forms");
      const data = await response.json();

      if (data.success) {
        setSubmissions(data.data);
      } else {
        setError(data.message || "Failed to fetch form submissions");
      }
    } catch (error) {
      setError("Error connecting to the server");
    } finally {
      setLoading(false);
    }
  };

  const updateSubmissionStatus = async (id: string, resolved: boolean) => {
    try {
      const response = await fetch("/api/admin/forms", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, resolved }),
      });

      const data = await response.json();

      if (data.success) {
        // Update local state
        setSubmissions((prevSubmissions) =>
          prevSubmissions.map((sub) =>
            sub._id === id ? { ...sub, resolved } : sub
          )
        );
      } else {
        setError(data.message || "Failed to update submission status");
      }
    } catch (error) {
      setError("Error connecting to the server");
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const unresolvedSubmissions = submissions.filter((sub) => !sub.resolved);
  const resolvedSubmissions = submissions.filter((sub) => sub.resolved);

  // Group submissions by form name
  const groupSubmissionsByFormName = (subs: FormSubmission[]) => {
    return subs.reduce<Record<string, FormSubmission[]>>((acc, submission) => {
      const formName = submission.formName;
      if (!acc[formName]) {
        acc[formName] = [];
      }
      acc[formName].push(submission);
      return acc;
    }, {});
  };

  const unresolvedGrouped = groupSubmissionsByFormName(unresolvedSubmissions);
  const resolvedGrouped = groupSubmissionsByFormName(resolvedSubmissions);

  // Function to render form data fields
  const renderFormData = (formData: Record<string, any>) => {
    return Object.entries(formData)
      .filter(([key]) => key !== "formName") // Skip formName as we're already using it as a group heading
      .map(([key, value]) => (
        <div key={key} className="flex mb-1">
          <span className="font-medium text-[#4CC9F0] mr-2">{key}:</span>
          <span className="text-gray-300">
            {typeof value === "boolean"
              ? value
                ? "Yes"
                : "No"
              : String(value)}
          </span>
        </div>
      ));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Form Submissions</h1>
        <Button
          onClick={fetchSubmissions}
          variant="outline"
          className="border-[#4CC9F0] text-[#4CC9F0] hover:bg-[#4CC9F0]/10"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {error && (
        <div className="bg-red-500/20 text-red-200 p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      <Tabs defaultValue="unresolved" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 bg-[#1D2A3F]">
          <TabsTrigger
            value="unresolved"
            className="data-[state=active]:bg-[#4CC9F0] data-[state=active]:text-[#131B2E]"
          >
            <Clock className="mr-2 h-4 w-4" />
            Unresolved
            {unresolvedSubmissions.length > 0 && (
              <Badge className="ml-2 bg-[#131B2E] text-[#4CC9F0]">
                {unresolvedSubmissions.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="resolved"
            className="data-[state=active]:bg-[#4CC9F0] data-[state=active]:text-[#131B2E]"
          >
            <ClipboardCheck className="mr-2 h-4 w-4" />
            Resolved
            {resolvedSubmissions.length > 0 && (
              <Badge className="ml-2 bg-[#131B2E] text-[#4CC9F0]">
                {resolvedSubmissions.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="unresolved" className="mt-6">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton
                  key={i}
                  className="w-full h-32 bg-[#1D2A3F]/50 rounded-lg"
                />
              ))}
            </div>
          ) : unresolvedSubmissions.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <XCircle className="mx-auto h-12 w-12 text-gray-500 mb-4" />
              <h3 className="text-xl font-medium">No unresolved submissions</h3>
              <p>All form submissions have been resolved.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(unresolvedGrouped).map(
                ([formName, formSubmissions]) => (
                  <div key={formName} className="space-y-4">
                    <h2 className="text-xl font-semibold text-[#4CC9F0] capitalize">
                      {formName} Forms ({formSubmissions.length})
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {formSubmissions.map((submission) => (
                        <Card
                          key={submission._id}
                          className="bg-[#131B2E] border border-[#4CC9F0]/20 shadow-lg shadow-[#4CC9F0]/5"
                        >
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-white text-lg">
                                {submission.formData.name || 
                                 submission.formData.fullName || 
                                 submission.formData.firstName || 
                                 submission.formData.instituteName || 
                                 "No Name"}
                              </CardTitle>
                              <Badge className="bg-[#4CC9F0]/10 text-[#4CC9F0] font-normal">
                                {formatDistanceToNow(
                                  new Date(submission.createdAt),
                                  { addSuffix: true }
                                )}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              {renderFormData(submission.formData)}
                              <div className="mt-4 pt-2 border-t border-[#4CC9F0]/20">
                                <Button
                                  onClick={() =>
                                    updateSubmissionStatus(submission._id, true)
                                  }
                                  className="w-full bg-[#4CC9F0] hover:bg-[#4CC9F0]/90 text-[#131B2E]"
                                >
                                  <Check className="mr-2 h-4 w-4" />
                                  Mark as Resolved
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="resolved" className="mt-6">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton
                  key={i}
                  className="w-full h-32 bg-[#1D2A3F]/50 rounded-lg"
                />
              ))}
            </div>
          ) : resolvedSubmissions.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <XCircle className="mx-auto h-12 w-12 text-gray-500 mb-4" />
              <h3 className="text-xl font-medium">No resolved submissions</h3>
              <p>None of the form submissions have been resolved yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(resolvedGrouped).map(
                ([formName, formSubmissions]) => (
                  <div key={formName} className="space-y-4">
                    <h2 className="text-xl font-semibold text-[#4CC9F0] capitalize">
                      {formName} Forms ({formSubmissions.length})
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {formSubmissions.map((submission) => (
                        <Card
                          key={submission._id}
                          className="bg-[#131B2E] border border-[#4CC9F0]/20 shadow-lg shadow-[#4CC9F0]/5 opacity-90"
                        >
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-white text-lg">
                                {submission.formData.name || 
                                 submission.formData.fullName || 
                                 submission.formData.firstName || 
                                 submission.formData.instituteName || 
                                 "No Name"}
                              </CardTitle>
                              <Badge className="bg-green-500/20 text-green-300 font-normal">
                                Resolved
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-400">
                              {formatDistanceToNow(
                                new Date(submission.createdAt),
                                { addSuffix: true }
                              )}
                            </p>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              {renderFormData(submission.formData)}
                              <div className="mt-4 pt-2 border-t border-[#4CC9F0]/20">
                                <Button
                                  onClick={() =>
                                    updateSubmissionStatus(
                                      submission._id,
                                      false
                                    )
                                  }
                                  variant="outline"
                                  className="w-full border-[#4CC9F0] text-[#4CC9F0] hover:bg-[#4CC9F0]/10"
                                >
                                  <Clock className="mr-2 h-4 w-4" />
                                  Mark as Unresolved
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 