// src/app/user/user.component.ts
import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user.service.service';
import { User } from '../models/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  users: User[] = [];
  userForm: User = {
    fullName: '',
    profileImage: '',
    gender: '',
    address: '',
    city: '',
    pin: 0,
    state: '',
    country: '',
    email: '',
    contact: '',
    educationQualification: '',
    designation: ''
  };
  countries: string[] = ['United States', 'Canada', 'United Kingdom', 'Australia', 'India', 'Germany', 'France', 'Italy', 'Spain', 'Brazil'];
  pageNumber = 1;
  pageSize = 8;

  constructor(private userService: UserServiceService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers(this.pageNumber, this.pageSize).subscribe(users => this.users = users);
  }

  createUser(): void {
    this.userService.createUser(this.userForm).subscribe(() => {
      this.getUsers();
      this.resetForm();
    });
  }

  updateUser(id: number | undefined): void {
    if (id === undefined) {
      console.error('User ID is undefined');
      return;
    }
    this.userService.updateUser(id, this.userForm).subscribe(() => {
      this.getUsers();
      this.resetForm();
    });
  }

  deleteUser(id: number | undefined): void {
    if (id === undefined) {
      console.error('User ID is undefined');
      return;
    }
    this.userService.deleteUser(id).subscribe(() => {
      this.getUsers();
    });
  }

  setUser(user: User): void {
    this.userForm = { ...user };
  }

  resetForm(): void {
    this.userForm = {
      fullName: '',
      profileImage: '',
      gender: '',
      address: '',
      city: '',
      pin: 0,
      state: '',
      country: '',
      email: '',
      contact: '',
      educationQualification: '',
      designation: ''
    };
  }
}