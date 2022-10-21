// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:3000/dev',
  firebaseConfig: {
    apiKey: 'AIzaSyCmkl0Xv5WfF0oHVX_jyhv2rvOuUkPwzC8',
    authDomain: 'sky-shopping.firebaseapp.com',
    projectId: 'sky-shopping',
    storageBucket: 'sky-shopping.appspot.com',
    messagingSenderId: '446432424757',
    appId: '1:446432424757:web:8ef756566b0c2c5a22527c',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
