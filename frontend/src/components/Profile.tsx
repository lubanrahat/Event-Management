import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { User } from "../types";
import {
  UserCircle,
  Phone,
  User as UserIcon,
  Mail,
  MapPin,
  Calendar,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/Card";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { ThemeToggle } from "./ui/ThemeToggle";

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
    address: user?.address || "",
    email: user?.email || "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccess(false);
    // TODO: Call update profile API
    setTimeout(() => {
      setIsSaving(false);
      setSuccess(true);
    }, 1000);
  };

  // Dummy stats for illustration
  const stats = [
    {
      label: "Events Organized",
      value: 0,
      icon: <Calendar className="w-6 h-6" />,
      color: "from-blue-700 to-blue-500",
    },
    {
      label: "Events Attended",
      value: 0,
      icon: <Users className="w-6 h-6" />,
      color: "from-green-700 to-green-500",
    },
    {
      label: "Total Registrations",
      value: 0,
      icon: <Calendar className="w-6 h-6" />,
      color: "from-purple-700 to-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950 flex flex-col items-center justify-center px-4 py-12 transition-colors duration-700">
      <div className="absolute top-6 right-8 z-10">
        <ThemeToggle />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-xl mx-auto"
      >
        <div className="bg-white/70 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/60 dark:border-gray-800/60 p-8 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center mb-6"
          >
            <UserCircle className="w-24 h-24 text-blue-400 dark:text-blue-300 bg-blue-100 dark:bg-gray-700 rounded-full p-2 shadow-lg mb-2" />
            <div className="text-center">
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 mb-1">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm flex items-center justify-center gap-1">
                <Mail className="w-4 h-4 mr-1 inline-block" />
                {user?.email}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                Member since{" "}
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "-"}
              </p>
            </div>
          </motion.div>
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 dark:text-gray-200 mb-1 font-medium">
                  First Name *
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 outline-none transition"
                    placeholder="First Name"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-200 mb-1 font-medium">
                  Last Name *
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 outline-none transition"
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-1 font-medium">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 opacity-80 cursor-not-allowed"
                  placeholder="Email Address"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-1 font-medium">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 outline-none transition"
                  placeholder="Phone Number"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-1 font-medium">
                Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 outline-none transition"
                  placeholder="Enter your address"
                />
              </div>
            </div>
            <motion.button
              type="submit"
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 px-4 text-lg font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 focus:ring-2 focus:ring-blue-400"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </motion.button>
            {success && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-600 dark:text-green-400 text-center font-medium mt-2"
              >
                Profile updated successfully!
              </motion.div>
            )}
          </motion.form>
        </div>
        {/* Account Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2"
        >
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`rounded-xl p-6 flex flex-col items-center justify-center shadow-lg bg-gradient-to-br ${stat.color} text-white`}
            >
              <div className="mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="text-sm font-medium mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Profile;
