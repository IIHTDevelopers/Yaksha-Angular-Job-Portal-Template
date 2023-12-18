import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { JobComponentComponent } from './job-component.component';

describe('JobComponentComponent', () => {
  let component: JobComponentComponent;
  let fixture: ComponentFixture<JobComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobComponentComponent],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have form fields for adding a job', () => {
      const compiled = fixture.nativeElement;
      const formFields = compiled.querySelectorAll('form input');
      expect(formFields.length).toBe(5); // Check for the number of input fields
    });

    it('should have a button for adding a job', () => {
      const compiled = fixture.nativeElement;
      const addButton = compiled.querySelector('form button[type="submit"]');
      expect(addButton.textContent).toContain('Add Job');
    });

    it('should display search input for filtering jobs', () => {
      const compiled = fixture.nativeElement;
      const searchInput = compiled.querySelector('div:nth-child(3) input[type="text"]');
      expect(searchInput).toBeTruthy();
    });

    it('should display edit job form when editing a job', () => {
      component.isEditing = true;
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      const editForm = compiled.querySelector('div:nth-child(5) form');
      expect(editForm).toBeTruthy();
      const saveButton = editForm.querySelector('button[type="submit"]');
      const cancelButton = editForm.querySelector('button[type="button"]');
      expect(saveButton.textContent).toContain('Save');
      expect(cancelButton.textContent).toContain('Cancel');
    });

    it('should add a job when submitting the add job form', () => {
      const addButton = fixture.nativeElement.querySelector('form button[type="submit"]');
      const inputFields = fixture.nativeElement.querySelectorAll('form input');
      const sampleJob = {
        title: 'Software Developer',
        description: 'Develop software applications',
        salary: '$80000',
        location: 'California',
        type: 'Full-time',
      };

      inputFields[0].value = sampleJob.title;
      inputFields[0].dispatchEvent(new Event('input'));
      inputFields[1].value = sampleJob.description;
      inputFields[1].dispatchEvent(new Event('input'));
      inputFields[2].value = sampleJob.salary;
      inputFields[2].dispatchEvent(new Event('input'));
      inputFields[3].value = sampleJob.location;
      inputFields[3].dispatchEvent(new Event('input'));
      inputFields[4].value = sampleJob.type;
      inputFields[4].dispatchEvent(new Event('input'));

      addButton.click();
      fixture.detectChanges();

      expect(component.jobs.length).toBe(1);
      expect(component.jobs[0]).toEqual({
        ...sampleJob,
        id: 1,
      });
    });

    it('should have initial jobs array empty', () => {
      expect(component.jobs).not.toBeNull();
      expect(component.jobs).toEqual([]);
    });

    it('should add a new job', () => {
      component.newJob = {
        id: 1,
        title: 'Software Engineer',
        description: 'Develop software applications',
        salary: '100000',
        location: 'San Francisco',
        type: 'Full-time',
      };
      component.addJob();
      expect(component.jobs).not.toBeNull();
      expect(component.jobs.length).toBe(1);
    });

    it('should not add a job with empty fields', () => {
      component.newJob = {
        id: 0,
        title: '',
        description: '',
        salary: '',
        location: '',
        type: '',
      };
      component.addJob();
      expect(component.jobs).not.toBeNull();
      expect(component.jobs.length).toBe(1);
    });

    it('should edit a job and update it', () => {
      component.newJob = {
        id: 1,
        title: 'Software Engineer',
        description: 'Develop software applications',
        salary: '100000',
        location: 'San Francisco',
        type: 'Full-time',
      };
      component.addJob();

      component.editJob(component.jobs[0]);
      const updatedJob = {
        id: component.jobs[0].id,
        title: 'Updated Title',
        description: 'Updated Description',
        salary: '200000',
        location: 'New York',
        type: 'Part-time',
      };
      component.editedJob = { ...updatedJob };
      component.saveEditedJob();
      expect(component.jobs).not.toBeNull();
      expect(component.jobs[0]).not.toBeNull();
      expect(component.jobs[0]).toEqual(updatedJob);
    });

    it('should not edit a job with empty fields', () => {
      component.newJob = {
        id: 1,
        title: 'Software Engineer',
        description: 'Develop software applications',
        salary: '100000',
        location: 'San Francisco',
        type: 'Full-time',
      };
      component.addJob();

      component.editJob(component.jobs[0]);
      const originalJob = { ...component.jobs[0] };
      component.newJob = {
        id: originalJob.id,
        title: '',
        description: '',
        salary: '',
        location: '',
        type: '',
      };
      component.saveEditedJob();
      expect(component.jobs).not.toBeNull();
      expect(component.jobs[0]).not.toBeNull();
      expect(component.jobs[0]).toEqual(originalJob);
    });

    it('should delete a job', () => {
      component.newJob = {
        id: 1,
        title: 'Software Engineer',
        description: 'Develop software applications',
        salary: '100000',
        location: 'San Francisco',
        type: 'Full-time',
      };
      component.addJob();

      expect(component.jobs).not.toBeNull();
      expect(component.jobs.length).toBe(1);
      component.deleteJob(component.jobs[0]);
      expect(component.jobs.length).toBe(0);
    });

    it('should cancel editing', () => {
      component.editJob({
        id: 1,
        title: 'Software Engineer',
        description: 'Develop software applications',
        salary: '100000',
        location: 'San Francisco',
        type: 'Full-time',
      });
      component.cancelEdit();
      expect(component.isEditing).toBe(false);
      expect(component.editedJob).toEqual({});
    });

    it('should filter jobs based on search keyword', () => {
      component.newJob = {
        id: 1,
        title: 'Software Engineer',
        description: 'Develop software applications',
        salary: '100000',
        location: 'San Francisco',
        type: 'Full-time',
      };
      component.addJob();

      component.searchKeyword = 'Engineer';
      expect(component.filteredJobs.length).toBe(1);

      component.searchKeyword = 'Developer';
      expect(component.filteredJobs.length).toBe(0);
    });
  });
});
