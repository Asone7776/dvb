import React, { ReactElement } from "react"

export interface SafeItem {
    tariffNumber: number
    icon: React.FC
    subTitle: string
    heading: string
    content: string
    link: string
}
export interface SafesInitialState {
    data: SafeItem | null
}