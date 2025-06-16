import React, { useState } from "react";
import {
  Users,
  Calendar,
  BarChart3,
  CheckSquare,
  MessageSquare,
  Settings,
  Bell,
  Search,
  Plus,
  TrendingUp,
  Clock,
  Target,
  Award,
} from "lucide-react";

const HomeManager = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const stats = [
    {
      label: "Team Members",
      value: "24",
      change: "+2",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      label: "Active Projects",
      value: "12",
      change: "+3",
      icon: Target,
      color: "bg-green-500",
    },
    {
      label: "Tasks Completed",
      value: "89%",
      change: "+5%",
      icon: CheckSquare,
      color: "bg-purple-500",
    },
    {
      label: "Team Performance",
      value: "94%",
      change: "+8%",
      icon: TrendingUp,
      color: "bg-orange-500",
    },
  ];

  const recentActivities = [
    {
      user: "Sarah Johnson",
      action: "completed task",
      item: "Q4 Budget Review",
      time: "2 hours ago",
    },
    {
      user: "Mike Chen",
      action: "submitted report",
      item: "Marketing Analysis",
      time: "4 hours ago",
    },
    {
      user: "Emma Davis",
      action: "created project",
      item: "New Client Onboarding",
      time: "6 hours ago",
    },
    {
      user: "James Wilson",
      action: "updated milestone",
      item: "Product Launch",
      time: "1 day ago",
    },
  ];

  const upcomingTasks = [
    {
      task: "Team Performance Review",
      due: "Today, 3:00 PM",
      priority: "high",
    },
    {
      task: "Budget Planning Meeting",
      due: "Tomorrow, 10:00 AM",
      priority: "medium",
    },
    { task: "Client Presentation Prep", due: "Wed, 2:00 PM", priority: "high" },
    { task: "Monthly Report Review", due: "Thu, 4:00 PM", priority: "low" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back
          </h2>
          <p className="text-gray-600">
            Here's what's happening with your team today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-green-600 font-medium">
                    {stat.change} from last week
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Activity
                </h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-700">
                        {activity.user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.user}</span>{" "}
                        {activity.action}{" "}
                        <span className="font-medium">{activity.item}</span>
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Upcoming Tasks
                </h3>
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {upcomingTasks.map((task, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div
                      className={`h-2 w-2 rounded-full mt-2 ${
                        task.priority === "high"
                          ? "bg-red-500"
                          : task.priority === "medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {task.task}
                      </p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <p className="text-xs text-gray-500">{task.due}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: Users,
                href: "/regEmployee",
                label: "Add Team Member",
                color: "bg-blue-500",
              },
              {
                icon: Target,
                href: "/addProject",
                label: "Create Project",
                color: "bg-green-500",
              },
            ].map((action, index) => (
              <button
                key={index}
                className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors group"
              >
                <div
                  className={`${action.color} p-3 rounded-lg mb-2 group-hover:scale-105 transition-transform`}
                >
                  <action.icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeManager;
