import { FC } from "react"
export interface SafeItem {
    icon: FC
    subTitle: string
    heading: string
    content: string
    link?: string
    orderNo?: number
}
export interface SafesInitialState {
    data: SafeProgram | null
}


export interface Coverage {
    description?: string
    code: string
    required: boolean
    sum: number
    asSlider: boolean
}
export interface SafeProgram {
    tariffName: string
    programCode: string
    orderNo: number
    coverages: Coverage[]
    premium?: number
}

