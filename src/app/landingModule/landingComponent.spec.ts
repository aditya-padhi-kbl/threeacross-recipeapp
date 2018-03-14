import { LandingComponent } from './landingComponent';
import { ComponentFixture, TestBed, async, fakeAsync } from '@angular/core/testing';
import { ReceipeService } from '../services/receipeService';
import { IReceipeService } from '../interface';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { SortOrder } from '../enums';
import { testData } from '../services/testData';
import { CartModalComponent } from '../modals/cartModal';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

let componentInstance: LandingComponent;
let fixture: ComponentFixture<LandingComponent>;
let serviceInstance: ReceipeService;


class ReceipeServiceStub implements IReceipeService {
    searchReceipe =  (sortCriteria: string) => {
        return Observable.from(Promise.resolve(testData));
    }

    getSortedReceipe =  (sortCriteria: SortOrder) => {
        return Observable.from(Promise.resolve(testData));
    }
}

describe('Test Cases for Landing Component ', () => {
    beforeEach(async( () => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [LandingComponent, CartModalComponent ],
            imports: [ReactiveFormsModule],
            providers: [ {provide: ReceipeService, useClass: ReceipeServiceStub}]
        }).compileComponents();
    }));

    beforeEach(fakeAsync( () => {
        fixture = TestBed.createComponent(LandingComponent);
        componentInstance = fixture.componentInstance;
        serviceInstance = TestBed.get(ReceipeService);
    }));

    it('should be able to create an instance of the component ', () => {
        expect(componentInstance instanceof LandingComponent).toBeTruthy();
    });

    it ('should be able to fetch the list of recipes based on rating ', async( () => {
        spyOn(serviceInstance, 'getSortedReceipe').and.callFake( (key: string) => {
            return Observable.from(Promise.resolve(testData));
        });

        spyOn(componentInstance, 'filterList').and.callThrough();
        fixture.detectChanges();
        fixture.whenStable().then( () => {
            fixture.detectChanges();
            expect(componentInstance.filterList).toHaveBeenCalled();
            expect(serviceInstance.getSortedReceipe).toHaveBeenCalled();
        });
    }));

    it ('should have a receipeArray length to be zero initially ', () => {
        expect(componentInstance.receipeArray.length).toEqual(0);
    });

    it ('cartArray should populate when addToCart is triggered ', () => {
        componentInstance.addToCart(testData.recipes[0], 0);
        expect(componentInstance.cartArray.length).toEqual(1);
    });

    it ('should be able to searchReceipes based on criteria when searchIngredent is called ', async( () => {
        spyOn(serviceInstance, 'searchReceipe').and.callFake( () => {
            return Observable.from(Promise.resolve(testData));
        });
        componentInstance.searchIngredent('chicken');
        expect(serviceInstance.searchReceipe).toHaveBeenCalled();
        console.log(componentInstance.receipeArray);
    }));

    it ('should initialize selectedReceipe when the viewItem is executed ', () => {
        componentInstance.viewItem(testData.recipes[0]);
        expect(componentInstance.selectedReceipe).toEqual(testData.recipes[0]);
        expect(componentInstance.itemSelected).toBe(true);
    });

    it ('should set the cartModal visible boolean value to true when the openCart is called ', () => {
        componentInstance.openCart();
        expect(componentInstance.cartModal.visible).toBe(true);
    });
});

