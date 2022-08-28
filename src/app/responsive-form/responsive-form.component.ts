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
  cities: string[] = ["Surat", "Ahemedabad", "Bengaluru", "Mohali"] as string[];
  zip_codes: string[] = ["395004", "456123", "123456", "140412"] as string[];

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    const defaultCities: string[] = [];
    const defaultZipCodes: string[] = [];
    this.registrationForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      passWord: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassWord: ['', [Validators.required, Validators.minLength(6)]],
      gender: ['', Validators.required],
      hobbies: this.formBuilder.array([new FormControl(null, Validators.required)]),
      // cities: this.formBuilder.array(this.cities.map(x => !1)),
      // zip_codes: this.formBuilder.array(this.zip_codes.map(x => !1))
      cities: this.formBuilder.array(this.cities.map(x => defaultCities.indexOf(x) > -1)),
      zip_codes: this.formBuilder.array(this.zip_codes.map(x => defaultZipCodes.indexOf(x) > -1)),
      file: [this.url, Validators.required]
    }, {
      // validator: MustMatch('password', 'confirmPassword')
    });
  }

  get f() {
    return this.registrationForm.controls
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
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
    console.log("this.registrationForm.value[key]", this.registrationForm.value[key].map((x: boolean, i: number) => x && this.cities[i]).filter((x: boolean) => !!x))
    if (key == "cities")
      return this.registrationForm.value[key].map((x: boolean, i: number) => x && this.cities[i]).filter((x: boolean) => !!x);
    return this.registrationForm.value[key].map((x: boolean, i: number) => x && this.zip_codes[i]).filter((x: boolean) => !!x);

  }

  submitRegistration(evnet: any) {
    console.log(this.registrationForm.get('hobbies'))
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

  url: string = ""
  onFileChange(event: Event) {
    console.log('event: ', event);
    const data = event.target as HTMLInputElement
    if (data.files) {
      var reader = new FileReader();
      reader.readAsDataURL(data.files[0])
      reader.onload = (event: any) => {
        this.url = event.target.result
        console.log('this.url: ', this.url);
        this.registrationForm.get('file')?.setValue(this.url)
      }
    }
  }
}
