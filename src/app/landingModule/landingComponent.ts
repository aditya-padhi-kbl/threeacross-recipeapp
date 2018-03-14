import { Component, OnInit, ViewChild } from '@angular/core';
import { ReceipeService } from '../services/receipeService';
import { SortOrder } from '../enums';
import { ReceipeModel } from '../models/receipeModel';
import { FormControl } from '@angular/forms';
import { CartModalComponent } from '../modals/cartModal';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
@Component({
    selector: 'app-landing-component',
    templateUrl: './landingComponent.html'
})

export class LandingComponent implements OnInit {
    receipeArray: Array<ReceipeModel>;
    searchFormControl = new FormControl();
    @ViewChild('cart') cartModal: CartModalComponent;
    sortOrder = SortOrder;
    selectedReceipe: ReceipeModel;
    itemSelected = false;
    cartArray: Array<ReceipeModel> = [new ReceipeModel()];
    constructor(private receipeService: ReceipeService) {
        this.cartArray.length = 0;
    }

    filterList = (filterCriteria: SortOrder) => {
        this.receipeService.getSortedReceipe(filterCriteria)
            .subscribe( (result) => {
                this.receipeArray = result.recipes;
                console.log(this.receipeArray);
            });
    }

    addToCart = (recipe: ReceipeModel, index: number) => {
        this.cartArray.push(recipe);
    }

    searchIngredent = (param: string) => {
        this.receipeService.searchReceipe(param).subscribe( (result) => {
            this.receipeArray = result.recipes;
            console.log(this.receipeArray);
        });
    }

    viewItem = (param: ReceipeModel) => {
        this.selectedReceipe = param;
        this.itemSelected = true;
    }

    openCart = () => {
        this.cartModal.visible = true;
    }
    ngOnInit(): void {
        console.log('Hello World');
        this.searchFormControl.valueChanges.debounceTime(400).subscribe( (result) => {
            this.searchIngredent(result);
        });
        this.filterList(this.sortOrder.r);
    }
}
