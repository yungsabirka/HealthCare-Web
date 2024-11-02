import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FilterUsersPipe } from './filter-users.pipe';
import { User } from '../models/user.model';

describe('FilterUsersPipe', () => {
  let pipe: FilterUsersPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterUsersPipe],
    });

    pipe = TestBed.inject(FilterUsersPipe);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter users by first name', () => {
    const users: User[] = [
      { userId: 1, userName: 'user1', email: 'user1@example.com', password: 'password1', gender: true, dateOfBirth: new Date(), medicalCardId: 1, address: 'Address 1', firstName: 'John', lastName: 'Doe' },
      { userId: 2, userName: 'user2', email: 'user2@example.com', password: 'password2', gender: false, dateOfBirth: new Date(), medicalCardId: 2, address: 'Address 2', firstName: 'Jane', lastName: 'Doe' },
      { userId: 3, userName: 'user3', email: 'user3@example.com', password: 'password3', gender: true, dateOfBirth: new Date(), medicalCardId: 3, address: 'Address 3', firstName: 'John', lastName: 'Smith' },
    ];

    const search = 'john';

    const filteredUsers = pipe.transform(users, search);

    expect(filteredUsers.length).toBe(2);
    expect(filteredUsers).toEqual([
      { userId: 1, userName: 'user1', email: 'user1@example.com', password: 'password1', gender: true, dateOfBirth: new Date(), medicalCardId: 1, address: 'Address 1', firstName: 'John', lastName: 'Doe' },
      { userId: 3, userName: 'user3', email: 'user3@example.com', password: 'password3', gender: true, dateOfBirth: new Date(), medicalCardId: 3, address: 'Address 3', firstName: 'John', lastName: 'Smith' },
    ]);
  });

  it('should return empty array for non-matching search', () => {
    const users: User[] = [
      { userId: 1, userName: 'user1', email: 'user1@example.com', password: 'password1', gender: true, dateOfBirth: new Date(), medicalCardId: 1, address: 'Address 1', firstName: 'John', lastName: 'Doe' },
      { userId: 2, userName: 'user2', email: 'user2@example.com', password: 'password2', gender: false, dateOfBirth: new Date(), medicalCardId: 2, address: 'Address 2', firstName: 'Jane', lastName: 'Doe' },
      { userId: 3, userName: 'user3', email: 'user3@example.com', password: 'password3', gender: true, dateOfBirth: new Date(), medicalCardId: 3, address: 'Address 3', firstName: 'John', lastName: 'Smith' },
    ];

    const search = 'non-matching name';

    const filteredUsers = pipe.transform(users, search);

    expect(filteredUsers.length).toBe(0);
  });

  it('should return all users for empty search', () => {
    const users: User[] = [
      { userId: 1, userName: 'user1', email: 'user1@example.com', password: 'password1', gender: true, dateOfBirth: new Date(), medicalCardId: 1, address: 'Address 1', firstName: 'John', lastName: 'Doe' },
      { userId: 2, userName: 'user2', email: 'user2@example.com', password: 'password2', gender: false, dateOfBirth: new Date(), medicalCardId: 2, address: 'Address 2', firstName: 'Jane', lastName: 'Doe' },
      { userId: 3, userName: 'user3', email: 'user3@example.com', password: 'password3', gender: true, dateOfBirth: new Date(), medicalCardId: 3, address: 'Address 3', firstName: 'John', lastName: 'Smith' },
    ];

    const search = '';

    const filteredUsers = pipe.transform(users, search);

    expect(filteredUsers.length).toBe(3);
    expect(filteredUsers).toEqual(users);
  });

  it('should handle empty users array', () => {
    const users: User[] = [];
    const search = 'john';

    const filteredUsers = pipe.transform(users, search);

    expect(filteredUsers.length).toBe(0);
  });
});
