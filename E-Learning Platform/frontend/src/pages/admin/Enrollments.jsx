import React, { useEffect, useState } from "react";
import {
  getEnrollmentsByStatus,
  approveEnrollment,
  rejectEnrollment,
  deleteEnrollment,
} from "../../services/enrollments";
import EnrollmentTable from "../../components/admin/enrollments/EnrollmentTable";
import {
  AlertCircle,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  UserCheck,
  UserX,
  TrendingUp,
} from "lucide-react";

const TABS = [
  {
    label: "Pending",
    value: "pending",
    icon: Clock,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    activeColor: "border-amber-500 text-amber-700 bg-amber-50",
  },
  {
    label: "Approved",
    value: "approved",
    icon: UserCheck,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    activeColor: "border-green-500 text-green-700 bg-green-50",
  },
  {
    label: "Rejected",
    value: "rejected",
    icon: UserX,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    activeColor: "border-red-500 text-red-700 bg-red-50",
  },
];

const Enrollments = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rejectModal, setRejectModal] = useState({
    open: false,
    enrollment: null,
    reason: "",
  });

  const fetchEnrollments = async (status) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getEnrollmentsByStatus(status);
      if (data && Array.isArray(data.data)) {
        setEnrollments(data.data);
      } else if (data && data.data && Array.isArray(data.data.docs)) {
        setEnrollments(data.data.docs);
      } else {
        setEnrollments([]);
      }
    } catch {
      setError("Failed to fetch enrollments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments(activeTab);
  }, [activeTab]);

  const handleApprove = async (enrollment) => {
    if (!window.confirm("Approve this enrollment?")) return;
    try {
      await approveEnrollment(enrollment._id);
      setError(null);
      fetchEnrollments(activeTab);
    } catch {
      setError("Failed to approve enrollment.");
    }
  };

  const openRejectModal = (enrollment) => {
    setRejectModal({ open: true, enrollment, reason: "" });
  };

  const submitReject = async () => {
    const { enrollment, reason } = rejectModal;
    if (!enrollment) return;
    try {
      await rejectEnrollment(enrollment._id, reason);
      setRejectModal({ open: false, enrollment: null, reason: "" });
      setError(null);
      fetchEnrollments(activeTab);
    } catch {
      setError("Failed to reject enrollment.");
    }
  };

  const handleDelete = async (enrollment) => {
    if (!window.confirm("Delete this enrollment record?")) return;
    try {
      await deleteEnrollment(enrollment._id);
      setError(null);
      fetchEnrollments(activeTab);
    } catch {
      setError("Failed to delete enrollment.");
    }
  };

  const currentTab = TABS.find((tab) => tab.value === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Enhanced Header with Stats Preview */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Gradient Background Header */}
          <div className="bg-gradient-to-r from-[#2563eb] via-[#3b82f6] to-[#1d4ed8] p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-white">
                  <h1 className="text-3xl lg:text-4xl font-bold mb-2 tracking-tight">
                    Enrollment Management
                  </h1>
                  <p className="text-blue-100 text-lg font-medium">
                    Review, approve, and manage course enrollments efficiently
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex items-center gap-4 lg:gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-6 h-6 text-white" />
                    <div className="text-white">
                      <div className="text-2xl font-bold">
                        {enrollments.length}
                      </div>
                      <div className="text-blue-200 text-sm font-medium capitalize">
                        {activeTab} Enrollments
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Tab Navigation */}
          <div className="p-6 sm:p-8 border-b border-gray-100 bg-gray-50/50">
            <div className="flex flex-wrap gap-3">
              {TABS.map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.value;

                return (
                  <button
                    key={tab.value}
                    className={`group relative px-6 py-3 rounded-2xl border-2 transition-all duration-300 font-semibold focus:outline-none whitespace-nowrap transform hover:scale-105 hover:shadow-lg ${
                      isActive
                        ? `${tab.activeColor} shadow-lg scale-105`
                        : "border-gray-200 text-gray-600 bg-white hover:border-[#2563eb] hover:text-[#2563eb] hover:bg-[#2563eb]/5"
                    }`}
                    onClick={() => setActiveTab(tab.value)}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent
                        className={`w-5 h-5 transition-colors ${
                          isActive
                            ? tab.color
                            : "text-gray-500 group-hover:text-[#2563eb]"
                        }`}
                      />
                      <span>{tab.label}</span>
                    </div>

                    {/* Active Indicator */}
                    {isActive && (
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                        <div
                          className={`w-2 h-2 rounded-full ${tab.color.replace(
                            "text-",
                            "bg-"
                          )}`}
                        ></div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Enhanced Error Alert */}
        {error && (
          <div className="bg-gradient-to-r from-[#fef2f2] to-[#fee2e2] border-2 border-[#fecaca] rounded-2xl p-6 shadow-lg animate-in slide-in-from-top-4 duration-300">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-[#ef4444]/10 rounded-xl">
                <AlertCircle className="h-6 w-6 text-[#ef4444]" />
              </div>
              <div>
                <h3 className="text-[#dc2626] font-bold text-lg mb-1">
                  Error Occurred
                </h3>
                <p className="text-[#b91c1c] font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Content Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Card Header */}
          <div className="px-6 sm:px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {currentTab && (
                  <>
                    <div
                      className={`p-2 ${currentTab.bgColor} rounded-xl ${currentTab.borderColor} border-2`}
                    >
                      <currentTab.icon
                        className={`w-5 h-5 ${currentTab.color}`}
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-[#0f172a] capitalize">
                        {activeTab} Enrollments
                      </h2>
                      <p className="text-gray-600 font-medium">
                        {loading
                          ? "Loading..."
                          : `${enrollments.length} enrollment${
                              enrollments.length !== 1 ? "s" : ""
                            } found`}
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Loading Indicator */}
              {loading && (
                <div className="flex items-center gap-2 text-[#2563eb]">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  <span className="font-medium">Refreshing...</span>
                </div>
              )}
            </div>
          </div>

          {/* Table Container */}
          <div className="p-6 sm:p-8">
            <EnrollmentTable
              enrollments={enrollments}
              loading={loading}
              onApprove={handleApprove}
              onReject={openRejectModal}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>

      {/* Enhanced Reject Modal */}
      {rejectModal.open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-gray-200 overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="relative p-8 bg-gradient-to-r from-[#ef4444]/5 via-[#ef4444]/10 to-[#ef4444]/5 border-b border-gray-100">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ef4444] to-transparent"></div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#ef4444]/10 rounded-2xl border-2 border-[#ef4444]/20">
                  <XCircle className="w-7 h-7 text-[#ef4444]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#0f172a] mb-2">
                    Reject Enrollment Request
                  </h3>
                  <p className="text-[#64748b] text-lg leading-relaxed">
                    You're about to reject this enrollment. Providing a reason
                    helps maintain transparency and improves the user
                    experience.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-6">
              <div className="space-y-3">
                <label className="block text-lg font-semibold text-[#0f172a]">
                  Rejection Reason
                  <span className="text-[#64748b] font-normal text-base ml-2">
                    (Optional)
                  </span>
                </label>
                <textarea
                  className="w-full border-2 border-gray-200 px-5 py-4 rounded-2xl focus:outline-none focus:border-[#ef4444] focus:ring-4 focus:ring-[#ef4444]/10 transition-all duration-300 resize-none text-[#0f172a] placeholder-[#64748b] text-lg leading-relaxed bg-gray-50 focus:bg-white"
                  rows={6}
                  value={rejectModal.reason}
                  onChange={(e) =>
                    setRejectModal((prev) => ({
                      ...prev,
                      reason: e.target.value,
                    }))
                  }
                  placeholder="Please provide a clear reason for rejection. This message will be sent to the user along with the rejection notification..."
                />
              </div>

              {/* Character Count */}
              <div className="flex justify-end">
                <span className="text-sm text-gray-500 font-medium">
                  {rejectModal.reason.length} characters
                </span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 pt-0 flex flex-col sm:flex-row justify-end gap-4">
              <button
                className="px-8 py-4 border-2 border-gray-300 text-[#64748b] rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold text-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-200"
                onClick={() =>
                  setRejectModal({ open: false, enrollment: null, reason: "" })
                }
              >
                Cancel
              </button>
              <button
                className="px-8 py-4 bg-gradient-to-r from-[#ef4444] to-[#dc2626] text-white rounded-2xl hover:from-[#dc2626] hover:to-[#b91c1c] transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#ef4444]/20"
                onClick={submitReject}
              >
                Reject Enrollment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Enrollments;
