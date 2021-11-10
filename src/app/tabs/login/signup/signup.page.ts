import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';




@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private global: GlobalService) { }


  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if(!form.valid) {return;}
    this.register(form);
  }

  register(form: NgForm) {
    this.isLoading = true;
    console.log(form.value);
    this.authService.register(form.value).then((data: any) => {
      console.log(data);
      this.router.navigateByUrl('/tabs');
      this.isLoading = false;
      form.reset();
    })
    .catch(e => {
      console.log(e);
      this.isLoading = false;
      let msg = 'Could not sign you up, please try again.';
      if(e.code === 'auth/email-already-in-use') {
        msg = e.message;
      }
      this.global.showAlert(msg);
    });
   }


}
