import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Address } from '../../shared/common/location';
import { LocationField, locationFields } from 'src/app/shared/common/location';
import { LocationFormComponent } from './location-form/location-form.component';
import { ManageLocationService } from './manage-location.service';
import * as _ from 'lodash';

export interface DialogData {
  locationField: LocationField;
  address: Address;
  isEdit: boolean;
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
  locationFieldList: string[] = locationFields;
  locationFieldValue = LocationField.COUNTRY;
  locationFieldAction: string = '';
  isEditLocation: boolean = false;

  sourceList!: any[];
  commonColumns: string[] = [
    'key',
    'name',
    'createdAt',
    'updatedAt',
    'edit',
    'delete',
  ];
  columns: string[] = [];
  address!: Address;

  locationFieldInfo!: any;

  constructor(
    private readonly manageLocationService: ManageLocationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.onInit();
  }

  onInit = () => {
    this.setColumns('code');
    this.manageLocationService.retrieveLocation('country').subscribe({
      next: (data: any) => {
        console.log(data);
        if (data.length > 0) {
          this.sourceList = data.map((value: any) => {
            return {
              ...value,
              createdAt: new Date(value.createdAt).toISOString().slice(0, 10),
              updatedAt: new Date(value.updatedAt).toISOString().slice(0, 10),
            };
          });
        } else {
          this.sourceList = data;
        }
      },
    });
  };

  locationFieldChange = (value: string) => {
    this.locationFieldValue = value as LocationField;
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

  setCountry = () => {
    this.removeColumns();
    this.setColumns('code');
    this.manageLocationService.retrieveLocation('country').subscribe({
      next: (data: any) => {
        console.log(data);
        this.sourceList = data;
      },
    });
  };

  setState = () => {
    this.removeColumns();
    this.setColumns(LocationField.COUNTRY.toLocaleLowerCase());
    this.manageLocationService.retrieveLocation('state').subscribe({
      next: (data: any) => {
        console.log(data);
        this.sourceList = data;
      },
    });
  };

  setDistrict = () => {
    this.removeColumns();
    this.setColumns(
      LocationField.COUNTRY.toLocaleLowerCase(),
      LocationField.STATE.toLocaleLowerCase()
    );
    this.manageLocationService.retrieveLocation('district').subscribe({
      next: (data: any) => {
        console.log(data);
        this.sourceList = data;
      },
    });
  };

  setCity = () => {
    this.removeColumns();
    this.setColumns(
      LocationField.COUNTRY.toLocaleLowerCase(),
      LocationField.STATE.toLocaleLowerCase(),
      LocationField.DISTRICT.toLocaleLowerCase()
    );
    this.manageLocationService.retrieveLocation('city').subscribe({
      next: (data: any) => {
        console.log(data);
        this.sourceList = data;
      },
    });
  };

  removeColumns = () => {
    this.columns = [];
  };

  openDialog(key?: string): void {
    let address;
    if (this.isEditLocation) {
      const element = this.sourceList.find((item) => item.key === key);
      switch (this.locationFieldValue) {
        case LocationField.COUNTRY:
          address = {
            code: element.code,
            name: element.name,
          };
          break;
        case LocationField.STATE:
          address = {
            name: element.name,
            country: element.country,
          };
          break;
        case LocationField.DISTRICT:
          address = {
            name: element.name,
            country: element.country,
            state: element.state,
          };
          break;
        case LocationField.CITY:
          address = {
            name: element.name,
            country: element.country,
            state: element.state,
            district: element.district,
          };
          break;
      }
    } else {
      address = this.address;
    }
    const dialogRef = this.dialog.open(LocationFormComponent, {
      width: '250px',
      data: {
        locationField: this.locationFieldValue,
        address: address,
        isEdit: this.isEditLocation,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result !== undefined) {
        if (this.isEditLocation && key) {
          this.manageLocationService.updateLocation(
            key,
            _.omit(result.address, ['createdAt']),
            result.locationField
          );
        } else {
          this.manageLocationService.createLocation(result.locationField, {
            ...result.address,
          });
        }
      }
    });
  }

  setColumns = (...newColumns: string[]) => {
    this.columns.push(...this.commonColumns);
    this.columns.splice(2, 0, ...newColumns);
  };

  onDeleteLocation = async (key: string) => {
    await this.manageLocationService.deleteLocation(
      key,
      this.locationFieldValue
    );
  };

  onEditLocation = (key: string) => {
    this.isEditLocation = true;
    this.openDialog(key);
  };
}
