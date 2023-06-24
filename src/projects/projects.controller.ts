import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from '../models/project.model';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  getAllProjects(): Project[] {
    return this.projectsService.getAllProjects();
  }

  @Get(':id')
  getProjectById(@Param('id') id: string): Project {
    return this.projectsService.getProjectById(id);
  }

  @Post()
  createProject(@Body() project: Project): Project {
    return this.projectsService.createProject(project);
  }

  @Put(':id')
  updateProject(@Param('id') id: string, @Body() project: Project): Project {
    return this.projectsService.updateProject(id, project);
  }

  @Delete(':id')
  deleteProject(@Param('id') id: string): Project {
    return this.projectsService.deleteProject(id);
  }
}
