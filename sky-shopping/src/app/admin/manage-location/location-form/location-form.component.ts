import { Component, DoCheck, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { combineLatest, forkJoin, Observable, Subscription } from 'rxjs';
import {
  Address,
  City,
  Country,
  LocationField,
  State,
} from 'src/app/shared/common/location';
import { DialogData } from '../manage-location.component';
import { ManageLocationService } from '../manage-location.service';

export interface LocationList {
  country: Country[];
  state: State[];
  district: City[];
}

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: [
    './location-form.component.css',
    '../../../shared/common/common-style.css',
  ],
})
export class LocationFormComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<LocationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private readonly manageLocationService: ManageLocationService
  ) {}

  formTemplate: any = [];
  locationFieldForm!: FormGroup;
  locationListSubscription!: Subscription;
  locationList: LocationList = {
    country: [],
    state: [],
    district: [],
  };
  loading: boolean = true;
  errorMessage: string = '';

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    console.log('Diloag fomr data', this.data);

    switch (this.data.locationField) {
      case LocationField.COUNTRY:
        this.setCountry();
        break;
      case LocationField.STATE:
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
  }

  setCountry = () => {
    this.formTemplate = [
      {
        type: 'textBox',
        label: 'Name',
      },
      {
        type: 'textBox',
        label: 'Code',
      },
    ];
    this.generateForm();
    this.loading = false;
  };

  setState = () => {
    this.manageLocationService
      .retrieveLocation(LocationField.COUNTRY.toLocaleLowerCase())
      .subscribe({
        next: (res: Country[]) => {
          console.log(res);
          if (res.length === 0) {
            this.loading = false;
            this.errorMessage =
              'There is no country. Please and any country first';
          }
          this.locationList.country.push(...res);
          this.formTemplate = [
            {
              type: 'textBox',
              label: 'Name',
            },
            {
              type: 'select',
              label: 'Country',
              options: this.locationList.country.map((country) => country.name),
            },
          ];
          this.generateForm();
          this.loading = false;
        },
        error: (err: any) => {
          this.loading = false;
          this.errorMessage = err.message;
        },
      });
  };

  setDistrict = () => {
    combineLatest(
      this.manageLocationService.retrieveLocation('country'),
      this.manageLocationService.retrieveLocation('state')
    ).subscribe((value: any) => {
      console.log(value, value[0], value[1]);
      this.locationList.country.push(...value[0]);
      this.locationList.state.push(...value[1]);
      if (value[0].length === 0 || value[1].length === 0) {
        this.loading = false;
        this.errorMessage = 'Please add at least one value in country or state';
      } else {
        this.formTemplate = [
          {
            type: 'textBox',
            label: 'Name',
          },
          {
            type: 'select',
            label: 'Country',
            options: this.locationList.country.map((country) => country.name),
          },
          {
            type: 'select',
            label: 'State',
            options: this.locationList.state.map((state) => state.name),
          },
        ];
        this.generateForm();
        this.loading = false;
      }
    });
  };

  setCity = () => {
    combineLatest(
      this.manageLocationService.retrieveLocation('country'),
      this.manageLocationService.retrieveLocation('state'),
      this.manageLocationService.retrieveLocation('district')
    ).subscribe((value: any) => {
      console.log(value, value[0], value[1], value[2]);

      this.locationList.country.push(...value[0]);
      this.locationList.state.push(...value[1]);
      this.locationList.district.push(...value[2]);

      if (
        value[0].length === 0 ||
        value[1].length === 0 ||
        value[2].length === 0
      ) {
        this.loading = false;
        this.errorMessage =
          'Please add at least one value in country or state or district';
      } else {
        this.formTemplate = [
          {
            type: 'textBox',
            label: 'Name',
          },
          {
            type: 'select',
            label: 'Country',
            options: this.locationList.country.map((country) => country.name),
          },
          {
            type: 'select',
            label: 'State',
            options: this.locationList.state.map((state) => state.name),
          },
          {
            type: 'select',
            label: 'District',
            options: this.locationList.district.map(
              (district) => district.name
            ),
          },
        ];
        this.generateForm();
        this.loading = false;
      }
    });
  };

  generateForm = () => {
    console.log('Generate form');
    let group: Record<string, any> = {};

    this.formTemplate.forEach((element: any) => {
      group[element.label] = new FormControl(
        this.data.isEdit
          ? this.data.address[
              element.label.toLocaleLowerCase() as keyof Address
            ]
          : '',
        [Validators.required]
      );
    });
    this.locationFieldForm = new FormGroup(group);
  };

  onSubmit = (form: FormGroup) => {
    this.data = {
      locationField: this.data.locationField,
      isEdit: this.data.isEdit,
      address: {
        name: form.value.Name,
        code: form.value.Code,
        country: form.value.Country,
        state: form.value.State,
        district: form.value.District,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
      },
    };
  };
}
