// imports
import { Injectable } from '@angular/core';
import { OnetimeCheckoutOptions, RecurringCheckoutOptions, sessionOptions } from './models';

// variables
declare var Stripe: any; // Stripe checkout
declare var document: any;

// Interfaces
interface Scripts {
    name: string;
    src: string;
}

@Injectable()
export class StripeCheckoutService {
    private stripe: any;
    private scripts: any = {};
    private ScriptStore: Scripts[] = [
        { name: 'stripe', src: 'https://js.stripe.com/v3/' },
        { name: 'stripecheckout', src: 'https://checkout.stripe.com/checkout.js' }
    ];

    constructor() {
        this.ScriptStore.forEach((script: any) => {
            this.scripts[script.name] = {
                loaded: false,
                src: script.src
            };
        });
    }

    initializeStripe(stripeKey: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.load('stripe', 'stripecheckout')
                .then(data => {
                    this.stripe = Stripe(stripeKey);
                    resolve('Stripe initialized.');
                }).catch(err => {
                    reject('Could not register stripe scripts.');
                })
        })
    }

    openOnetimeCheckout(checkoutOptions: OnetimeCheckoutOptions): Promise<string> {
        return new Promise((resolve, reject) => {
            this.stripe.redirectToCheckout({
                items: checkoutOptions.items,
                clientReferenceId: checkoutOptions.clientReferenceId || undefined,
                successUrl: checkoutOptions.successUrl,
                cancelUrl: checkoutOptions.cancelUrl,
                customerEmail: checkoutOptions.customerEmail || undefined,
                billingAddressCollection: checkoutOptions.billingAddressCollection || undefined,
                sessionId: checkoutOptions.sessionId || undefined,
                locale: checkoutOptions.locale || undefined,
                submitType: checkoutOptions.submitType || undefined
            }).then(function (result) {
                if (result.error)
                    reject(result.error)
                else
                    resolve(result)
            });
        })
    }

    openRecurringCheckout(checkoutOptions: RecurringCheckoutOptions): Promise<string> {
        return new Promise((resolve, reject) => {
            this.stripe.redirectToCheckout({
                items: checkoutOptions.items,
                clientReferenceId: checkoutOptions.clientReferenceId || undefined,
                successUrl: checkoutOptions.successUrl,
                cancelUrl: checkoutOptions.cancelUrl,
                customerEmail: checkoutOptions.customerEmail || undefined,
                billingAddressCollection: checkoutOptions.billingAddressCollection || undefined,
                sessionId: checkoutOptions.sessionId || undefined,
                locale: checkoutOptions.locale || undefined,
                submitType: checkoutOptions.submitType || undefined
            }).then(function (result) {
                if (result.error)
                    reject(result.error)
                else
                    resolve(result)
            });
        })
    }

    // Register Stripe scripts
    private load(...scripts: string[]) {
        const promises: any[] = [];
        scripts.forEach((script) => promises.push(this.loadScript(script)));
        return Promise.all(promises);
    }

    private loadScript(name: string) {
        return new Promise((resolve, reject) => {
            if (!this.scripts[name].loaded) {
                //load script
                let script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = this.scripts[name].src;
                if (script.readyState) {  //IE
                    script.onreadystatechange = () => {
                        if (script.readyState === "loaded" || script.readyState === "complete") {
                            script.onreadystatechange = null;
                            this.scripts[name].loaded = true;
                            resolve({ script: name, loaded: true, status: 'Loaded' });
                        }
                    };
                } else {  //Others
                    script.onload = () => {
                        this.scripts[name].loaded = true;
                        resolve({ script: name, loaded: true, status: 'Loaded' });
                    };
                }
                script.onerror = (error: any) => resolve({ script: name, loaded: false, status: 'Loaded' });
                document.getElementsByTagName('head')[0].appendChild(script);
            } else {
                resolve({ script: name, loaded: true, status: 'Already Loaded' });
            }
        });
    }

    openClientServerSession(checkoutOptions:sessionOptions): Promise<string>{
        return new Promise((resolve, reject) => {
            this.stripe.redirectToCheckout({
                sessionId: checkoutOptions.id
            }).then(function (result) {
                if (result.error)
                    reject(result.error)
                else
                    resolve(result)
            });
        })
    }

}
