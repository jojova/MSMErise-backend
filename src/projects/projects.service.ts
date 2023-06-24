import { Injectable } from '@nestjs/common';
import { Project } from '../models/project.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProjectsService {
  private projects: Project[] = [];

  getAllProjects(): Project[] {
    return this.projects;
  }

  getProjectById(id: string): Project {
    return this.projects.find((project) => project.projectID === id);
  }

  createProject(project: Project): Project {
    const generatedProject: Project = {
      ...project,
      projectID: uuidv4(), // Generate projectID using uuidv4()
    };
    this.projects.push(generatedProject);
    return generatedProject;
  }

  updateProject(id: string, project: Project): Project {
    const index = this.projects.findIndex((p) => p.projectID === id);
    if (index !== -1) {
      this.projects[index] = { ...project, projectID: id };
      return this.projects[index];
    }
    return null;
  }

  deleteProject(id: string): Project {
    const index = this.projects.findIndex(
      (project) => project.projectID === id,
    );
    if (index !== -1) {
      return this.projects.splice(index, 1)[0];
    }
    return null;
  }
}
