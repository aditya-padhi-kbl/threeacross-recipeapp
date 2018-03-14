import { TestBed, getTestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReceipeService } from './receipeService';
import { IReceipeStruct } from '../interface';
import { testData } from './testData';
import { SortOrder } from '../enums';

let recipeServiceInstance: ReceipeService;
let httpTestingControllerInstance: HttpTestingController;
describe('TestCases for Receipe Service' , () => {
    beforeEach( () => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ ReceipeService ]
        });
        const injector = getTestBed();
        recipeServiceInstance = injector.get(ReceipeService);
        httpTestingControllerInstance = TestBed.get(HttpTestingController);
    });

    afterEach( () => {
        httpTestingControllerInstance.verify();
    });


    it ('should return search Recipe if the query string matches', async( () => {
        recipeServiceInstance.searchReceipe('Quinoa').subscribe( (res: IReceipeStruct) => {
            expect(res).toEqual(testData);
            expect(res.recipes.length).toEqual(8);
        });
        // tslint:disable-next-line:no-shadowed-variable
        const req = httpTestingControllerInstance.expectOne(req => req.params.has('q'));
        expect(req.request.method).toEqual('GET');
        req.flush(testData);
    }));

    it ('should return none if the query string does not matches', async( () => {
        recipeServiceInstance.searchReceipe('Quinoa').subscribe( (res: IReceipeStruct) => {
            expect(res.count).toEqual(0);
            expect(res.recipes.length).toEqual(0);
        });
        // tslint:disable-next-line:no-shadowed-variable
        const req = httpTestingControllerInstance.expectOne(req => req.params.has('q'));
        expect(req.request.method).toEqual('GET');
        req.flush({'count': 0, 'recipes': []});
    }));

    it ('should return receipes based on ratings ', async( () => {
        recipeServiceInstance.getSortedReceipe(SortOrder.r).subscribe( (res: IReceipeStruct) => {
            expect(res).toEqual(testData);
            expect(res.recipes.length).toEqual(8);
        });
        // tslint:disable-next-line:no-shadowed-variable
        const req = httpTestingControllerInstance.expectOne(req => req.params.has('sort'));
        expect(req.request.method).toEqual('GET');
        req.flush(testData);
    }));

    it ('should return receipes based on trends ', async( () => {
        recipeServiceInstance.getSortedReceipe(SortOrder.t).subscribe( (res: IReceipeStruct) => {
            expect(res).toEqual(testData);
            expect(res.recipes.length).toEqual(8);
        });
        // tslint:disable-next-line:no-shadowed-variable
        const req = httpTestingControllerInstance.expectOne(req => req.params.has('sort'));
        expect(req.request.method).toEqual('GET');
        req.flush(testData);
    }));
});
