import { Component, OnInit } from '@angular/core';

interface Job {
  id: number;
  title: string;
  description: string;
  salary: string;
  location: string;
  type: string;
}

@Component({
  selector: 'app-job-component',
  templateUrl: './job-component.component.html',
  styleUrls: ['./job-component.component.css']
})
export class JobComponentComponent {
  jobs: Job[] = [];
  newJob: Job = {} as Job;
  editedJob: Job = {} as Job;
  isEditing = false;
  searchKeyword = '';

  ngOnInit(): void {
  }

  addJob(): void {
  }

  editJob(job: Job): void {
  }

  saveEditedJob(): void {
  }

  cancelEdit(): void {
  }

  deleteJob(job: Job): void {
  }

  get filteredJobs(): Job[] {
    return [];
  }
}
