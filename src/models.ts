export interface RecurringCheckoutOptions {
    items: Array<RecurringItem>
    successUrl: string,
    cancelUrl: string
    clientReferenceId?: string
    customerEmail?: string,
    billingAddressCollection?: "required",
    sessionId?: string,
    locale?: "da" | "de" | "en" | "es" | "fi" | "fr" | "it" | "ja" | "nb" | "nl" | "pl" | "pt" | "sv" | "zh",
    submitType?: "auto" | "book" | "donate" | "pay"
}

export interface RecurringItem {
    plan: string,     // plan id or sku id
    quantity: number
}

export interface OnetimeCheckoutOptions {
    items: Array<OnetimeItem>
    successUrl: string,
    cancelUrl: string
    clientReferenceId?: string
    customerEmail?: string,
    billingAddressCollection?: "required",
    sessionId?: string,
    locale?: "da" | "de" | "en" | "es" | "fi" | "fr" | "it" | "ja" | "nb" | "nl" | "pl" | "pt" | "sv" | "zh",
    submitType?: "auto" | "book" | "donate" | "pay"
}

export interface OnetimeItem {
    sku: string,     // plan id or sku id
    quantity: number
}