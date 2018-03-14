import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-cart-modal',
    templateUrl: './cartModal.html'
})

export class CartModalComponent  {
    visible: boolean;
    @Input() selectedCartArray = [];
    closeModal = () => {
        this.visible = false;
    }

}
