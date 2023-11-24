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
      (users: any[]) => {
        this.users = users;
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  acceptUser(userId: string) {
    this.userService.acceptUser(userId).subscribe(
      (response: { message: string }) => {
        console.log(response.message);

        const userToUpdate = this.users.find((user) => user._id === userId);
        if (userToUpdate) {
          userToUpdate.etat = 1;
        }
      },
      (error: any) => {
        console.error('Error accepting user:', error);
      }
    );
  }

  rejectUser(userId: string) {
    this.userService.rejectUser(userId).subscribe(
      (response: { message: string }) => {
        console.log(response.message);

        this.users = this.users.filter((user) => user._id !== userId);
      },
      (error: any) => {
        console.error('Error rejecting user:', error);
      }
    );
  }
}
