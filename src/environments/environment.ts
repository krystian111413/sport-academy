// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  applicationName: 'Katana',
  production: false,
  hmr: false,
  apiUrl: 'http://localhost:8080',
  debounceTime: 1000,
  httpRequestTimeout: 511000,
  pageSizeOptions: [25, 50, 100],
  colors: {
    projectColor: '#0097b7',
    success: '#7AF691',
    warning: '#FD5E65',
    default: '#4091F7'
  },
  chartColors: {
    general: ['#4091f7', '#a8caf3', '#d3ff93', '#7af691', '#fd5e65', '#d6a25f', '#db7bb3'],
    jobs: {
      total: '#4091f7',
      scheduled: '#a8caf3',
      running: '#d3ff93',
      completed: '#7af691',
      failed: '#fd5e65',
      terminated: '#d6a25f',
      skipped: '#db7bb3'
    }
  },
  projectName: 'Sport Academy'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
