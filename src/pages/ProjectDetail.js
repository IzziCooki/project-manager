import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { projectService } from '../services/projectService';
import { 
  FaEdit, 
  FaTrash, 
  FaArrowLeft, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaClock, 
  FaDollarSign,
  FaCode
} from 'react-icons/fa';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const data = await projectService.getProject(id);
      setProject(data);
    } catch (error) {
      setError('Failed to fetch project details');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectService.deleteProject(id);
        navigate('/projects');
      } catch (error) {
        setError('Failed to delete project');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'on-hold': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error || 'Project not found'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/projects"
            className="text-blue-600 hover:text-blue-700 flex items-center mb-4"
          >
            <FaArrowLeft className="mr-2" />
            Back to Projects
          </Link>
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
              <div className="mt-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Link
                to={`/projects/${id}/edit`}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center"
              >
                <FaEdit className="mr-2" />
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200 flex items-center"
              >
                <FaTrash className="mr-2" />
                Delete
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Description</h2>
              <p className="text-gray-600 whitespace-pre-wrap">
                {project.description || 'No description provided'}
              </p>
            </div>

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <FaCode className="mr-2" />
                  Technologies
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Client Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Client Information</h2>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <FaUser className="mr-3 text-gray-400" />
                  <span>{project.clientName}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaEnvelope className="mr-3 text-gray-400" />
                  <a href={`mailto:${project.clientEmail}`} className="hover:text-blue-600">
                    {project.clientEmail}
                  </a>
                </div>
                {project.clientPhone && (
                  <div className="flex items-center text-gray-600">
                    <FaPhone className="mr-3 text-gray-400" />
                    <a href={`tel:${project.clientPhone}`} className="hover:text-blue-600">
                      {project.clientPhone}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Project Details */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Details</h2>
              <div className="space-y-3">
                {project.timeline && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <FaClock className="mr-3 text-gray-400" />
                      <span>Timeline</span>
                    </div>
                    <span className="font-medium">{project.timeline}</span>
                  </div>
                )}
                {project.budget && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <FaDollarSign className="mr-3 text-gray-400" />
                      <span>Budget</span>
                    </div>
                    <span className="font-medium">{project.budget}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Timestamps */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Activity</h2>
              <div className="space-y-2 text-sm text-gray-600">
                {project.createdAt && (
                  <div>
                    <span className="font-medium">Created:</span>{' '}
                    {new Date(project.createdAt.seconds * 1000).toLocaleDateString()}
                  </div>
                )}
                {project.updatedAt && (
                  <div>
                    <span className="font-medium">Last Updated:</span>{' '}
                    {new Date(project.updatedAt.seconds * 1000).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;