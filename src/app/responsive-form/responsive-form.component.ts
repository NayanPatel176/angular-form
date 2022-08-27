import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-responsive-form',
  templateUrl: './responsive-form.component.html',
  styleUrls: ['./responsive-form.component.css']
})
export class ResponsiveFormComponent implements OnInit {

  registrationForm: FormGroup = new FormGroup({});
  submitted: boolean = false
  cities: string[] = ["Mohali", "Chandigarh", "Ludhiana", "Amritsar"] as string[];
  zip_codes: string[] = ["282001", "456123", "123456", "140412"] as string[];

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    const defaultCities = ["Mohali", "Amritsar"];
    const defaultZipCodes = ["456123"];
    this.registrationForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      passWord: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassWord: ['', [Validators.required, Validators.minLength(6)]],
      gender: ['', Validators.required],
      hobbies: this.formBuilder.array([new FormControl(null)]),
      // cities: this.formBuilder.array(this.cities.map(x => !1)),
      // zip_codes: this.formBuilder.array(this.zip_codes.map(x => !1))
      cities: this.formBuilder.array(this.cities.map(x => defaultCities.indexOf(x) > -1)),
      zip_codes: this.formBuilder.array(this.zip_codes.map(x => defaultZipCodes.indexOf(x) > -1))
    }, {
      // validator: MustMatch('password', 'confirmPassword')
    });
  }

  get f() {
    return this.registrationForm.controls
  }

  onAddHobby() {
    const control = new FormControl(null);
    (this.registrationForm.get('hobbies') as FormArray).push(control);
  }

  deleteHobby(hobbyIndex: number) {
    console.log('hobbyIndex: ', hobbyIndex);
    // return (this.registrationForm.get('hobbies') as FormArray).removeAt(hobbyIndex)
    return this.Hobbies.removeAt(hobbyIndex)
  }

  get Hobbies() {
    return (this.registrationForm.get('hobbies') as FormArray);
    // return this.registrationForm.controls["hobbies"] as FormArray;
  }

  convertToValue(key: string) {
    // console.log("this.registrationForm.value[key]", this.registrationForm.value[key].filter((cx: ))
    // return this.registrationForm.value[key].map((x: boolean, i: number) => x && this[key][i]).filter((x: boolean) => !!x);
  }

  submitRegistration(evnet: any) {
    console.log(this.registrationForm.value)
    this.submitted = true;

    const valueToStore = Object.assign({}, this.registrationForm.value, {
      cities: this.convertToValue('cities'),
      zip_codes: this.convertToValue('zip_codes')
    });
    console.log(valueToStore);

    if (this.registrationForm.invalid) {
      return;
    }
    console.log('evnet: ', evnet);
  }

  onReset() {
    this.registrationForm.reset()
  }


}
