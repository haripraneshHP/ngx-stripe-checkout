import { NgModule } from '@angular/core';

import { StripeCheckout } from './stripe.component';
import { StripeCheckoutService } from './stripe.service';
@NgModule({
    declarations: [StripeCheckout],
    providers: [StripeCheckoutService],
    exports: [StripeCheckout]
})
export class StripeModule { }
