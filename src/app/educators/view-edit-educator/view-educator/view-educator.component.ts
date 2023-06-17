import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EducatorsService } from '../../service/educators.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { EditEducatorComponent } from '../edit-educator/edit-educator.component';

@Component({
  selector: 'app-view-educator',
  templateUrl: './view-educator.component.html',
  styleUrls: ['./view-educator.component.css'],
})
export class ViewEducatorComponent {
  public form: FormGroup = new FormGroup({});
  data?: any;
  id: number = 0;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private educatorsService: EducatorsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.fillData();
  }

  fillData() {
    this.form = this.formBuilder.group({
      name: [''],
      surname: [''],
      uid: [''],
      dateOfBirth: [''],
      city: [''],
      street: [''],
      number: [''],
      userName: [''],
      password: [''],
      phoneNumber: ['']
    });

    this.educatorsService
      .getEducator(this.id)
      .subscribe((response: HttpResponse<any>) => {
        this.data = response.body;
        this.form.patchValue(this.data);
        this.form.patchValue(this.data.address);
      });
  }

  getErrorMessage(errosMsg: any) {
    const control = this.form.get(errosMsg);
    if (control?.hasError('required')) {
      return 'Obavezno';
    }
    return '';
  }

  enableEdit() {
    this.dialog
      .open(EditEducatorComponent, {
        width: '500px',
        data: this.id,
      })
      .afterClosed()
      .subscribe(() => {
        this.fillData();
      });
  }

  openMedicalFile() {
    this.educatorsService
      .getMedicalFile(this.id)
      .subscribe((response: ArrayBuffer) => {
        this.regenerateFile(response);
      });
  }
  openHygieneFile() {
    this.educatorsService
      .getHygieneFile(this.id)
      .subscribe((response: ArrayBuffer) => {
        this.regenerateFile(response);
      });
  }
  regenerateFile(byteArray: ArrayBuffer): void {
    const blob = new Blob([byteArray], { type: 'application/octet-stream' });
    const fileUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = this.data.name + '.pdf';
    link.click();
  }
}
