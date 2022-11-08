import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { map } from 'rxjs';
import {
  City,
  Country,
  District,
  LocationField,
  State,
} from 'src/app/shared/common/location';
import { Address } from 'src/app/shared/common/location';
import * as _ from 'lodash';

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

  createLocation = (
    locationField: LocationField,
    newLocation: Address
  ): any => {
    const address = _.pickBy(newLocation, _.identity);
    console.log(address);
    switch (locationField) {
      case LocationField.COUNTRY:
        return this.countryListRef.push(address as Country);
      case LocationField.STATE:
        return this.stateListRef.push(address as State);
      case LocationField.DISTRICT:
        return this.districtRef.push(address as District);
      case LocationField.CITY:
        return this.cityRef.push(address as City);
      default:
        return;
    }
  };

  updateLocation(
    key: string,
    value: any,
    locationField: LocationField
  ): Promise<void> {
    const updatedAddress = _.pickBy(value, _.identity);
    switch (locationField) {
      case LocationField.COUNTRY:
        return this.countryListRef.update(key, updatedAddress);
      case LocationField.STATE:
        return this.stateListRef.update(key, updatedAddress);
      case LocationField.DISTRICT:
        return this.districtRef.update(key, updatedAddress);
      case LocationField.CITY:
        return this.cityRef.update(key, updatedAddress);
    }
  }

  deleteLocation(key: string, locationField: LocationField): Promise<void> {
    switch (locationField) {
      case LocationField.COUNTRY:
        return this.countryListRef.remove(key);
      case LocationField.STATE:
        return this.stateListRef.remove(key);
      case LocationField.DISTRICT:
        return this.districtRef.remove(key);
      case LocationField.CITY:
        return this.cityRef.remove(key);
    }
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
