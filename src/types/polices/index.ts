import { OrderData } from "../orders"
import { selectOption } from "../users"


export interface PolicyFilterProps {
    paginated: boolean
    page: number
    from?: string | null
    to?: string | null
    today?: boolean
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
    holdedPolice: OrderData | null
}

export interface createFormData {
    full_name: string
    term: number
    phone: string
    email: string
    premium: number
    insuranceSum: number
    organization_name?: string
    organization_prefix?: selectOption
    inn: number
    kpp: number
}

// export interface sendCreateFormData extends Omit<createFormData, 'holder' | 'male'> {
//     holder: number
//     male: number
// }