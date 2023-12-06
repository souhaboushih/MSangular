import { Component, OnInit } from '@angular/core';
import { UserService } from '../sevices/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

totalUsers: number = 0; 
  activeUsers: number = 0; 
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUserStatistics();
  }
  getUserStatistics() {
    this.userService.getUserStatistics().subscribe(
      (statistics: any) => {
        this.totalUsers = statistics.totalUsers;
        this.activeUsers = statistics.activeUsers;
      },
      (error: any) => {
        console.error('Error fetching user statistics:', error);
      }
    );
  }

}
