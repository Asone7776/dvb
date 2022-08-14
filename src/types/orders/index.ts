export interface orderOption {
    case: string
    value: boolean
}
export interface OrderItem {
    id: number
    user_id: number
    type: number
    name: string
    manager: string
    manager_email: string
    amount: string
    limit_amount: string
    term: number
    policy_id: string
    policy_number: string
    status: number
    url: null | string
    policy_url: null | string
    invoice_url: null | string
    buy_url: null | string
    address: string
    insurer: string
    phone: string
    email: string
    options: orderOption[],
    is_legal: number
    passport: string
    credit_number: string
    credit_institution: string
    created_at: string
    updated_at: string
    inn: number
    kpp: number
    index: string
    ogrn: number
    house: number
    flat: number
    property_name: string
    position: string
    city: string
    object_area: number
    floor: number
    number_of_floors: number
    signer: string
}

export interface OrderData {
    policy_number: OrderData | null
    invoice_url: any
    order: any
    current_page: number
    total: number
    last_page: number
    data: OrderItem[] | []
}

export interface OrdersInitialState {
    loading: boolean
    data: OrderData | null
    error: any
    changeStatus: {
        loading: boolean
        data: null | string
        success: boolean
        error: any
    }
}

export interface updateStatusObject {
    order_id: number
    status: number
}
