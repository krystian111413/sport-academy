export const environment = {
    applicationName: 'Katana',
    production: false,
    hmr: true,
    apiUrl: 'http://localhost:8089/api/v1',
    debounceTime: 1000,
    httpRequestTimeout: 5000,
    pageSizeOptions: [25, 50, 100],
    colors: {
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
    projectName: 'Katana Blades'
};
