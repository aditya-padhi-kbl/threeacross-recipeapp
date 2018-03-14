import { Component, OnInit, ViewChild } from '@angular/core';
import { ReceipeService } from '../services/receipeService';
import { SortOrder } from '../enums';
import { ReceipeModel } from '../models/receipeModel';
import { FormControl, FormGroup } from '@angular/forms';
import { CartModalComponent } from '../modals/cartModal';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
// import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-landing-component',
    templateUrl: './landingComponent.html'
})

export class LandingComponent implements OnInit {
    receipeArray: Array<ReceipeModel> = [new ReceipeModel()];
    form = new FormGroup({
        searchFormControl: new FormControl()
    });
    // searchFormControl = new FormControl();
    @ViewChild('cart') cartModal: CartModalComponent;
    sortOrder = SortOrder;
    selectedReceipe: ReceipeModel;
    itemSelected = false;
    cartArray: Array<ReceipeModel> = [new ReceipeModel()];
    constructor(private receipeService: ReceipeService) {
        this.cartArray.length = 0;
        this.receipeArray.length = 0;
    }

    filterList = (filterCriteria: SortOrder) => {
        this.receipeService.getSortedReceipe(filterCriteria)
            .subscribe( (result) => {
                this.receipeArray = result.recipes;
            });
    }

    addToCart = (recipe: ReceipeModel, index: number) => {
        this.cartArray.push(recipe);
        // this.toastrService.success('Added to the Cart');
    }

    searchIngredent = (param: string) => {
        this.receipeService.searchReceipe(param).subscribe( (result) => {
            this.receipeArray = result.recipes;
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
        this.form.get('searchFormControl').valueChanges.debounceTime(400).subscribe( (result) => {
            this.searchIngredent(result);
        });
        this.filterList(this.sortOrder.r);
    }
}
