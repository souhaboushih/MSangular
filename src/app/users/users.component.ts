import { Component, OnInit } from '@angular/core';
import {UserService} from "../sevices/user.service";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (users: any[]) => { // Specify the type of 'users' explicitly
        this.users = users;
      },
      (error: any) => { // Specify the type of 'error' explicitly
        console.error('Error fetching users:', error);
      }
    );
  }

  acceptUser(userId: string) {
    this.userService.acceptUser(userId).subscribe(
      (response: { message: string }) => { // Specify the type of 'response' explicitly
        console.log(response.message);
        // Update the user's state to 1 in the local users array
        const userToUpdate = this.users.find((user) => user._id === userId);
        if (userToUpdate) {
          userToUpdate.etat = 1;
        }
      },
      (error: any) => { // Specify the type of 'error' explicitly
        console.error('Error accepting user:', error);
      }
    );
  }

  rejectUser(userId: string) {
    this.userService.rejectUser(userId).subscribe(
      (response: { message: string }) => { // Specify the type of 'response' explicitly
        console.log(response.message);
        // Remove the user locally from the users array
        this.users = this.users.filter((user) => user._id !== userId);
      },
      (error: any) => { // Specify the type of 'error' explicitly
        console.error('Error rejecting user:', error);
      }
    );
  }
}
