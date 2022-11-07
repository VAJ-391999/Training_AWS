import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { BehaviorSubject, map, Observable, toArray } from 'rxjs';
import {
  City,
  Country,
  District,
  LocationField,
  RetrieveLocation,
  State,
} from 'src/app/shared/common/location';

@Injectable()
export class ManageLocationService {
  private dbCountryPath = '/country';
  private dbStatePath = '/state';
  private dbDistrictPath = '/district';
  private dbCityPath = '/city';

  constructor(private readonly db: AngularFireDatabase) {
    this.countryListRef = db.list(this.dbCountryPath);
    this.stateListRef = db.list(this.dbStatePath);
    this.districtRef = db.list(this.dbDistrictPath);
    this.cityRef = db.list(this.dbCityPath);
  }

  countryListRef!: AngularFireList<Country>;
  stateListRef!: AngularFireList<State>;
  districtRef!: AngularFireList<District>;
  cityRef!: AngularFireList<City>;

  getAll = (
    locationField: string
  ): AngularFireList<Country | State | District | City> => {
    switch (locationField) {
      case LocationField.COUNTRY.toLocaleLowerCase():
        return this.countryListRef;
      case LocationField.STATE.toLocaleLowerCase():
        return this.stateListRef;
      case LocationField.DISTRICT.toLocaleLowerCase():
        return this.districtRef;
      case LocationField.CITY.toLocaleLowerCase():
        return this.cityRef;
      default:
        return this.countryListRef;
    }
  };

  createCounty = (locationField: string, newLocation: any): any => {
    switch (locationField) {
      case LocationField.COUNTRY.toLocaleLowerCase():
        return this.countryListRef.push(newLocation);
      case LocationField.STATE.toLocaleLowerCase():
        return this.stateListRef.push(newLocation);
      case LocationField.DISTRICT.toLocaleLowerCase():
        return this.districtRef.push(newLocation);
      case LocationField.CITY.toLocaleLowerCase():
        return this.cityRef.push(newLocation);
      default:
        return;
    }
  };

  updateCountry(key: string, value: any): Promise<void> {
    return this.countryListRef.update(key, value);
  }

  deleteCountry(key: string): Promise<void> {
    return this.countryListRef.remove(key);
  }

  retrieveLocation(location: string): any {
    return this.getAll(location)
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            key: c.payload.key,
            ...c.payload.val(),
          }))
        )
      );
  }
}
