import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  Calendar,
  Clock,
  Star,
  ArrowRight,
  TrendingUp,
  Users,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Button } from "../ui/Button";

interface RegistrationWithEvent {
  registration: {
    id: string;
    eventId: string;
    userId: string;
    status: string;
    registrationDate: string;
    notes?: string;
    attended: boolean;
  };
  event: {
    id: string;
    title: string;
    startDateTime?: string;
    // add other event fields as needed
  };
}

interface DashboardData {
  registrations?: RegistrationWithEvent[];
  count?: number;
}

const Dashboard: React.FC = () => {
  const { token, user } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const navigate = useNavigate();

  let endpoint = "/dashboard/attendee";
  if (user?.role === "ADMIN") endpoint = "/dashboard/admin";
  else if (user?.role === "ORGANIZER") endpoint = "/dashboard/organizer";

  useEffect(() => {
    if (!token) return;
    fetch(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch dashboard data");
        return res.json();
      })
      .then(setData)
      .catch(() => {});
  }, [token, endpoint]);

  const registrations: RegistrationWithEvent[] = data?.registrations || [];
  const registrationCount = data?.count || 0;
  const attendedCount = 0; // You can update this if you track attended events
  const upcomingCount = 0; // You can update this if you track upcoming events

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="relative max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8 animate-slideUp">
          <div className="flex items-center space-x-3 mb-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white animate-bounce-gentle" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Welcome back,{" "}
                <span className="gradient-text capitalize">
                  {user?.firstName || "User"}
                </span>
                !
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg mt-1">
                Ready to discover amazing events? Let's make it happen ✨
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              icon: Calendar,
              label: "Registered Events",
              value: registrationCount,
              color: "blue",
              bgColor: "from-blue-500 to-blue-600",
              trend: "+12%",
            },
            {
              icon: Clock,
              label: "Upcoming Events",
              value: upcomingCount,
              color: "green",
              bgColor: "from-green-500 to-green-600",
              trend: "+8%",
            },
            {
              icon: Star,
              label: "Attended Events",
              value: attendedCount,
              color: "orange",
              bgColor: "from-orange-500 to-orange-600",
              trend: "+15%",
            },
          ].map((stat, index) => (
            <Card
              key={stat.label}
              className="hover:shadow-glow transition-all duration-300 animate-slideUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${stat.bgColor} rounded-xl flex items-center justify-center shadow-lg`}
                    >
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                        {stat.label}
                      </p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-medium">{stat.trend}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Registered Events */}
          <Card className="animate-slideUp" style={{ animationDelay: "300ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span>My Registered Events</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {registrationCount === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="relative mb-6">
                    <Calendar className="w-16 h-16 text-gray-300 dark:text-gray-600" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No events yet
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
                    Discover amazing events happening around you and start your
                    journey!
                  </p>
                  <Button
                    onClick={() => navigate("/events")}
                    className="shadow-glow"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Browse Events
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {registrations.map((reg, index) => (
                    <div
                      key={reg.registration.id}
                      className="group p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 animate-fadeIn"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {reg.event.title}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {reg.event.startDateTime
                              ? new Date(
                                  reg.event.startDateTime
                                ).toLocaleDateString("en-US", {
                                  weekday: "short",
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })
                              : "Date TBD"}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            Registered:{" "}
                            {new Date(
                              reg.registration.registrationDate
                            ).toLocaleDateString("en-US", {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/events/${reg.event.id}`)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="animate-slideUp" style={{ animationDelay: "400ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {[
                  {
                    title: "Browse Events",
                    description: "Discover new events happening around you",
                    icon: Calendar,
                    action: () => navigate("/events"),
                    color: "blue",
                  },
                  {
                    title: "View Calendar",
                    description: "See all your events in calendar view",
                    icon: Clock,
                    action: () => navigate("/calendar"),
                    color: "green",
                  },
                  ...(user?.role === "ORGANIZER" || user?.role === "ADMIN"
                    ? [
                        {
                          title: "Create Event",
                          description: "Organize your own amazing event",
                          icon: Sparkles,
                          action: () => navigate("/create-event"),
                          color: "purple",
                        },
                      ]
                    : []),
                ].map((action, index) => (
                  <button
                    key={action.title}
                    onClick={action.action}
                    className="group p-4 text-left bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md hover:scale-[1.02] transition-all duration-300 animate-fadeIn"
                    style={{ animationDelay: `${(index + 5) * 100}ms` }}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 bg-${action.color}-100 dark:bg-${action.color}-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <action.icon
                          className={`w-5 h-5 text-${action.color}-600 dark:text-${action.color}-400`}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {action.title}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {action.description}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
