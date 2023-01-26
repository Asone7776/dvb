import { OrderData, OrderItem } from "../orders"
import { selectOption } from "../users"


export interface PolicyFilterProps {
    paginated: boolean
    page: number
    from?: string | null
    to?: string | null
    today?: boolean
    users?:any[]
    status?:string
    search?:string
}
export interface policeInitialStateType {
    savedPolicy: {
        loading: boolean
        data: OrderData | null
        error: any
        success: boolean
    },
    updatedPolicy: {
        loading: boolean
        error: any
        success: boolean
    },
    calculatedPolicy: {
        loading: boolean
        data: number | null
        error: any
    },
    holdedPolice: OrderItem | null
}

export interface createFormData {
    kladr: selectOption | null
    property_name: string
    index: string
    city: string
    street: string
    building: string
    house: number
    flat: number
    inn: number
    kpp: number
    ogrn: number
    phone: string
    email: string
    tariff: any
    name: string
    signer: string
    position: string
    attorney: string
    attorney_date: Date | null
    organization_name?: string
    legal_type?: selectOption
    document_type?: selectOption
    object_area: number
    floor: number
    number_of_floors: number
    legal_address: selectOption | null
}

export interface risk {
    code: string
    sum: number | string
}

export interface calculateRequestData {
    tariff: number
    risks: risk[]
}