import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LocationField, locationFields } from 'src/app/shared/common/location';
import { LocationFormComponent } from './location-form/location-form.component';
import { ManageLocationService } from './manage-location.service';

export interface DialogData {
  animal: string;
}

@Component({
  selector: 'app-manage-location',
  templateUrl: './manage-location.component.html',
  styleUrls: [
    './manage-location.component.css',
    '../../shared/common/common-style.css',
  ],
})
export class ManageLocationComponent implements OnInit {
  locationFieldForm!: FormGroup;
  locationFieldList: string[] = locationFields;
  locationFieldValue: string = 'Country';
  locationFieldAction: string = '';

  sourceList!: any[];
  commonColumns: string[] = ['key', 'name', 'createdAt', 'updatedAt'];
  columns: string[] = [];
  animal!: string;

  locationFieldInfo!: any;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly manageLocationService: ManageLocationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.onInit();
  }

  onInit = () => {
    this.columns.push(...this.commonColumns, 'code');
    this.manageLocationService.retrieveLocation('country').subscribe({
      next: (data: any) => {
        console.log(data);
        this.sourceList = data;
      },
    });
  };

  locationFieldChange = (value: string) => {
    this.locationFieldValue = value;
    switch (this.locationFieldValue) {
      case LocationField.COUNTRY:
        this.setCountry();
        break;
      case LocationField.STATE:
        console.log('state');
        this.setState();
        break;
      case LocationField.DISTRICT:
        this.setDistrict();
        break;
      case LocationField.CITY:
        this.setCity();
        break;
      default:
        this.setCountry();
        break;
    }
  };

  onSubmit = (form: FormGroup) => {
    console.log('form', form);
    // this.manageLocationService.createCounty({
    //   name: form.value.name,
    //   code: form.value.code,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // });
    // console.log(this.manageLocationService.retrieveCountry());
  };

  setCountry = () => {
    this.removeColumns();
    this.columns.push(...this.commonColumns, 'code');
    this.manageLocationService.retrieveLocation('country').subscribe({
      next: (data: any) => {
        console.log(data);
        this.sourceList = data;
      },
    });
    this.locationFieldForm = this.formBuilder.group({
      locationField: [`${this.locationFieldValue}`, [Validators.required]],
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
    });
  };

  setState = () => {
    this.removeColumns();
    this.columns.push(
      ...this.commonColumns,
      LocationField.COUNTRY.toLocaleLowerCase()
    );
    this.manageLocationService.retrieveLocation('state').subscribe({
      next: (data: any) => {
        console.log(data);
        this.sourceList = data;
      },
    });
    this.locationFieldForm = this.formBuilder.group({
      locationField: [`${this.locationFieldValue}`, [Validators.required]],
      name: ['', [Validators.required]],
      country: ['', [Validators.required]],
    });
  };

  setDistrict = () => {
    this.removeColumns();
    this.columns.push(
      ...this.commonColumns,
      LocationField.COUNTRY.toLocaleLowerCase(),
      LocationField.STATE.toLocaleLowerCase()
    );
    this.manageLocationService.retrieveLocation('district').subscribe({
      next: (data: any) => {
        console.log(data);
        this.sourceList = data;
      },
    });
    this.locationFieldForm = this.formBuilder.group({
      locationField: [`${this.locationFieldValue}`, [Validators.required]],
      name: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
    });
  };

  setCity = () => {
    this.removeColumns();
    this.columns.push(
      ...this.commonColumns,
      LocationField.COUNTRY.toLocaleLowerCase(),
      LocationField.STATE.toLocaleLowerCase(),
      LocationField.DISTRICT.toLocaleLowerCase()
    );
    this.manageLocationService.retrieveLocation('district').subscribe({
      next: (data: any) => {
        console.log(data);
        this.sourceList = data;
      },
    });
    this.locationFieldForm = this.formBuilder.group({
      locationField: [`${this.locationFieldValue}`, [Validators.required]],
      name: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
    });
  };

  removeColumns = () => {
    this.columns = [];
  };

  openDialog(): void {
    const dialogRef = this.dialog.open(LocationFormComponent, {
      width: '250px',
      data: { animal: this.animal },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
