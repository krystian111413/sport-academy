import {TestBed} from '@angular/core/testing';
import axios from 'axios';

import {RestService} from './rest.service';

describe('RestService', () => {
    let service: RestService;

    beforeEach(() => {
        TestBed.configureTestingModule({});

        service = TestBed.get(RestService);

        service['httpClient'] = axios.create({});
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
