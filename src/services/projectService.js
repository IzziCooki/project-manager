import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

export const projectService = {
  getAllProjects: async () => {
    const querySnapshot = await getDocs(collection(db, 'projects'));
    const projects = [];
    querySnapshot.forEach((doc) => {
      projects.push({ id: doc.id, ...doc.data() });
    });
    return projects;
  },

  getProject: async (id) => {
    const docSnap = await getDoc(doc(db, 'projects', id));
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    throw new Error('Project not found');
  },

  createProject: async (projectData) => {
    const docRef = await addDoc(collection(db, 'projects'), {
      ...projectData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { id: docRef.id, ...projectData };
  },

  updateProject: async (id, projectData) => {
    await updateDoc(doc(db, 'projects', id), {
      ...projectData,
      updatedAt: serverTimestamp()
    });
    return { id, ...projectData };
  },

  deleteProject: async (id) => {
    await deleteDoc(doc(db, 'projects', id));
    return { message: 'Project deleted successfully' };
  }
};