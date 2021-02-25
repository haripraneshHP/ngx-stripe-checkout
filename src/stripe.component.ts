import { Component } from '@angular/core';

// Interfaces
import { OnetimeCheckoutOptions, RecurringCheckoutOptions, sessionOptions } from './models';

// Services
import { StripeCheckoutService } from './stripe.service';

@Component({
  selector: 'app-root',
  template: `<p>Stripe Checkout.</p>`
})
export class StripeCheckout {

  constructor(
    public stripeCheckoutService: StripeCheckoutService
  ) { }

  initializeStripe(stripeKey: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.stripeCheckoutService.initializeStripe(stripeKey)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
    })
  }

  openRecurringCheckout(checkoutOptions: RecurringCheckoutOptions): Promise<string> {
    return new Promise((resolve, reject) => {
      this.stripeCheckoutService.openRecurringCheckout(checkoutOptions)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
    })
  }

  openOnetimeCheckout(checkoutOptions: OnetimeCheckoutOptions): Promise<string> {
    return new Promise((resolve, reject) => {
      this.stripeCheckoutService.openOnetimeCheckout(checkoutOptions)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
    })
  }

  openClientServerSession(checkoutOptions:sessionOptions): Promise<string> {
    return new Promise((resolve,reject)=>{
      this.stripeCheckoutService.openClientServerSession(checkoutOptions)
      .then((result) => resolve(result))
      .catch((err) => reject(err))
    })
  }
}
