// client/src/components/ProjectList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectService } from '../services/projectService';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await projectService.getAllProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectService.deleteProject(id);
        setProjects(projects.filter(p => p.id !== id));
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Project Name</th>
            <th className="py-3 px-4 text-left">Client</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Timeline</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {projects.map((project) => (
            <tr key={project.id} className="hover:bg-gray-50">
              <td className="py-3 px-4 font-medium">{project.name}</td>
              <td className="py-3 px-4">{project.clientName}</td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </td>
              <td className="py-3 px-4">{project.timeline}</td>
              <td className="py-3 px-4 text-center">
                <div className="flex justify-center space-x-2">
                  <Link
                    to={`/projects/${project.id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEye />
                  </Link>
                  <Link
                    to={`/projects/${project.id}/edit`}
                    className="text-green-600 hover:text-green-800"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;