import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { projectService } from '../services/projectService';
import Navbar from '../components/Navbar';
import { FaProjectDiagram, FaUsers, FaChartLine, FaClock } from 'react-icons/fa';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalRevenue: 0
  });
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const projects = await projectService.getAllProjects();
      
      // Calculate statistics
      const stats = {
        totalProjects: projects.length,
        activeProjects: projects.filter(p => p.status === 'active').length,
        completedProjects: projects.filter(p => p.status === 'completed').length,
        totalRevenue: projects.reduce((sum, p) => {
          const budget = parseFloat(p.budget?.replace(/[^0-9.-]+/g, '') || 0);
          return sum + budget;
        }, 0)
      };
      
      setStats(stats);
      setRecentProjects(projects.slice(-5).reverse());
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const doughnutChartData = {
    labels: ['Active', 'Completed', 'Pending'],
    datasets: [
      {
        data: [stats.activeProjects, stats.completedProjects, stats.totalProjects - stats.activeProjects - stats.completedProjects],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(251, 191, 36, 0.8)'
        ],
        borderWidth: 0
      }
    ]
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {currentUser?.email}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Projects</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stats.totalProjects}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <FaProjectDiagram className="text-blue-600 w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Projects</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stats.activeProjects}</p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <FaClock className="text-green-600 w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stats.completedProjects}</p>
              </div>
              <div className="bg-indigo-100 rounded-full p-3">
                <FaUsers className="text-indigo-600 w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  ${stats.totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="bg-yellow-100 rounded-full p-3">
                <FaChartLine className="text-yellow-600 w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 h-[400px]"> {/* Added fixed height */}
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h2>
            <div className="h-[300px]"> {/* Added container with fixed height */}
              <Line 
                data={lineChartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        callback: (value) => `$${value.toLocaleString()}`
                      }
                    }
                  },
                  plugins: {
                    legend: {
                      position: 'top',
                    }
                  }
                }}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 h-[400px]"> {/* Added fixed height */}
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Status</h2>
            <div className="h-[300px]"> {/* Added container with fixed height */}
              <Doughnut 
                data={doughnutChartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Recent Projects */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
            <Link to="/projects" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View all →
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Project</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Client</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Budget</th>
                </tr>
              </thead>
              <tbody>
                {recentProjects.map((project) => (
                  <tr key={project.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <Link to={`/projects/${project.id}`} className="text-blue-600 hover:text-blue-700">
                        {project.name}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{project.clientName}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        project.status === 'active' ? 'bg-green-100 text-green-800' :
                        project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{project.budget}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;