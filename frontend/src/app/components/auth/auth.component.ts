import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APPLICATION_CONSTANTS } from '../../constants/app.constants';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
  user = {
    email: '',
    password: '',
  };
  isSignup = true;

  ngOnInit() {
  }

  switchSigninSignup() {
    this.isSignup = !this.isSignup;
  }

  signup() {
    let request = {
      query: `
      mutation {
      createUser(userInput: {email: "${this.user.email}", password: "${this.user.password}"}) {
      _id
      email
      }
      }
      `
    };
    if (!this.isSignup) {
      request = {
        query: `
        query {
        login(email: "${this.user.email}", password: "${this.user.password}") {
        userId
        token
        tokenExpiration
        }
        }
        `
      };
    }
    fetch(APPLICATION_CONSTANTS.SERVICE_URL, {
      method: 'POST',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed');
      }
      return res.json();
    }).then(resBody => {
      console.log(resBody);
    }).catch(err => {
      console.log(err);
    });
  }
}
