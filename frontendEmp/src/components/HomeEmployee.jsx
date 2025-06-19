import React from "react";
import {
  Users,
  TrendingUp,
  Clock,
  Award,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const HomeManager = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Employee
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {" "}
                Management
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Streamline your workforce operations with our comprehensive
              employee management platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Get Started
                <ArrowRight className="inline-block ml-2 w-5 h-5" />
              </button>
              <button className="bg-white text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold border-2 border-gray-200 hover:border-blue-300 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">1,250+</h3>
            <p className="text-gray-600">Active Employees</p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">98%</h3>
            <p className="text-gray-600">Efficiency Rate</p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">24/7</h3>
            <p className="text-gray-600">Support Available</p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">5★</h3>
            <p className="text-gray-600">User Rating</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage Your Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to simplify employee management and
              boost productivity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Employee Profiles
              </h3>
              <p className="text-gray-600">
                Comprehensive employee information management with detailed
                profiles and documentation.
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Time Tracking
              </h3>
              <p className="text-gray-600">
                Advanced time tracking and attendance management with automated
                reporting.
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Performance Analytics
              </h3>
              <p className="text-gray-600">
                Data-driven insights and performance metrics to optimize team
                productivity.
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Payroll Management
              </h3>
              <p className="text-gray-600">
                Automated payroll processing with tax calculations and direct
                deposit integration.
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Task Management
              </h3>
              <p className="text-gray-600">
                Assign, track, and manage tasks with deadline notifications and
                progress tracking.
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Team Collaboration
              </h3>
              <p className="text-gray-600">
                Enhanced communication tools and collaboration features for
                better teamwork.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Employee Management?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of companies that trust our platform to manage their
            workforce efficiently
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Start Free Trial
            </button>
            <button className="bg-transparent text-white px-8 py-4 rounded-xl text-lg font-semibold border-2 border-white hover:bg-white hover:text-blue-600 transition-all duration-300">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              Employee Management System
            </h3>
            <p className="text-gray-400 mb-6">
              Empowering organizations with intelligent workforce management
              solutions
            </p>
            <div className="flex justify-center space-x-6 text-gray-400">
              <span>© 2025 EMS. All rights reserved.</span>
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeManager;
