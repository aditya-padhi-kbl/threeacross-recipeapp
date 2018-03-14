import { Injectable } from '@angular/core';
import { IReceipeService, IReceipeStruct } from '../interface';
import { SortOrder } from '../enums';
import { Observable } from 'rxjs/Observable';
import { ReceipeModel } from '../models/receipeModel';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
@Injectable()
export class ReceipeService implements IReceipeService {
    constructor(private httpClient: HttpClient) {}
    searchReceipe = (sortCriteria: string) => {
        const searchParams = {params: new HttpParams().set('key', environment.envKey).set('q', sortCriteria)};
        return this.httpClient.get<IReceipeStruct>(environment.searchUrl, searchParams);
    }
    getSortedReceipe = (sortCriteria: SortOrder) => {
        const searchParams = {params: new HttpParams().set('key', environment.envKey).set('sort', sortCriteria)};
        return this.httpClient.get<IReceipeStruct>(environment.searchUrl, searchParams);
    }
}
