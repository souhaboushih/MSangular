// import { Component, Input, OnInit } from '@angular/core';
// import { CourseService, Course } from '../course.service';

// @Component({
//   selector: 'app-update-cours',
//   templateUrl: './update-cours.component.html',
//   styleUrls: ['./update-cours.component.css'],
// })
// export class UpdateCoursComponent implements OnInit {
//   @Input() courseId: string;
//   updatedCourseData: Course = { nom: '', description: '', datedebut: '' }; // Initialize with required properties

//   constructor(private courseService: CourseService) {}

//   ngOnInit(): void {
//     this.fetchCourseDetails();
//   }

//   private fetchCourseDetails(): void {
//     this.courseService.getCourseById(this.courseId).subscribe(
//       (course) => {
//         this.updatedCourseData = { ...course }; // Copy properties
//       },
//       (error) => {
//         console.error('Error fetching course details:', error);
//       }
//     );
//   }

//   onSubmit(): void {
//     // Implement the update logic using the CourseService
//     if (this.isFormValid()) {
//       this.courseService.updateCourse(this.courseId, this.updatedCourseData).subscribe(
//         () => {
//           console.log('Course updated successfully');
//           // Optionally, emit an event or perform other actions after update
//         },
//         (error) => {
//           console.error('Error updating course:', error);
//         }
//       );
//     } else {
//       console.error('Form is invalid. Please fill in all required fields.');
//     }
//   }

//   private isFormValid(): boolean {
//     // Implement your validation logic based on the properties you need to validate
//     return !!this.updatedCourseData.nom && !!this.updatedCourseData.description && !!this.updatedCourseData.datedebut;
//   }
// }
