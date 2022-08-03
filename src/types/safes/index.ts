export interface SafeItem {
    tariffNumber: number
    price: number
    premium: number
}
export interface SafesInitialState {
    data: SafeItem | null
}