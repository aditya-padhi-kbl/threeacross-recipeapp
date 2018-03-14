import { Observable } from 'rxjs/Observable';
import { ReceipeModel } from './models/receipeModel';
import { SortOrder } from './enums';


export interface IReceipeStruct {
    count: number;
    recipes: Array<ReceipeModel>;
}

export interface IReceipeService {
    searchReceipe: (sortCriteria: string) => Observable<IReceipeStruct>;
    getSortedReceipe: (sortCriteria: SortOrder) => Observable<IReceipeStruct>;
}
