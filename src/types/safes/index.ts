import { FC } from "react"
export interface SafeItem {
    icon: FC
    subTitle: string
    heading: string
    content: string
    link: string
}
export interface SafesInitialState {
    data: SafeItem | null
}


export interface Coverage {
    description?: string
    name: string
    required: boolean
    price: number
}
export interface SafeProgram {
    tariffName: string
    programCode: string
    orderNo: 1 | 2 | 3
    coverages: Coverage[]
    premium?: number
}

