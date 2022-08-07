import FrameOne from "./components/icons/FrameOne";
import FrameTwo from "./components/icons/FrameTwo";
import FrameThree from "./components/icons/FrameThree";
import { RISK_CONSTANTS, TARIFF_NAMES, RISKS_DESCRIPTIONS } from "./risk-constants";
import { SafeItem, SafeProgram } from "./types/safes";

export const cards: SafeItem[] = [
    {
        icon: FrameOne,
        subTitle: "Защита бизнеса",
        heading: "Страхование имущества в залоге",
        content: "Комплексное страхование имущества ЮЛ Индивидуальный расчет",
        orderNo: 0
    },
    {
        icon: FrameTwo,
        subTitle: "Защита бизнеса",
        heading: "Пакеты",
        content: "Комплексное страхование имущества ЮЛ Коробочные решения",
        link: '/admin/new/packages'
    },
    {
        icon: FrameThree,
        subTitle: "Защита бизнеса",
        heading: "Стандарт",
        content: "Комплексное страхование имущества ЮЛ Индивидуальный расчет",
        orderNo: 2
    }
];

export const tariffs: SafeProgram[] = [
    {
        tariffName: TARIFF_NAMES.PLEDGE_TARIFF.name,
        programCode: TARIFF_NAMES.PLEDGE_TARIFF.code,
        orderNo: 0,
        coverages: [
            {
                description: RISKS_DESCRIPTIONS.BUSINESS_PROTECTION_DESC,
                code: RISK_CONSTANTS.REAL_ESTATE.BUSINESS_PROTECTION,
                required: true,
                sum: 5000000
            },
            {
                description: RISKS_DESCRIPTIONS.BUSINESS_PROTECTION_PP_DESC,
                code: RISK_CONSTANTS.MOVABLE_PROPERTY.BUSINESS_PROTECTION_PP,
                required: false,
                sum: 15000000
            },
            {
                description: RISKS_DESCRIPTIONS.CIVIL_LIABILITY_DESC,
                code: RISK_CONSTANTS.CIVIL_LIABILITY,
                required: false,
                sum: 3000000
            }
        ]
    },
    {
        tariffName: TARIFF_NAMES.ECONOM_TARIFF.name,
        programCode: TARIFF_NAMES.ECONOM_TARIFF.code,
        orderNo: 1,
        premium: TARIFF_NAMES.ECONOM_TARIFF.premium,
        coverages: [
            {
                description: RISKS_DESCRIPTIONS.BUSINESS_PROTECTION_DESC,
                code: RISK_CONSTANTS.REAL_ESTATE.BUSINESS_PROTECTION,
                required: true,
                sum: 5000000
            },
            {
                description: RISKS_DESCRIPTIONS.BUSINESS_PROTECTION_PP_DESC,
                code: RISK_CONSTANTS.MOVABLE_PROPERTY.BUSINESS_PROTECTION_PP,
                required: true,
                sum: 1000000
            },
            {
                description: RISKS_DESCRIPTIONS.CIVIL_LIABILITY_DESC,
                code: RISK_CONSTANTS.CIVIL_LIABILITY,
                required: true,
                sum: 500000
            }
        ]
    },
    {
        tariffName: TARIFF_NAMES.STANDART_TARIFF.name,
        programCode: TARIFF_NAMES.STANDART_TARIFF.code,
        orderNo: 2,
        premium: TARIFF_NAMES.STANDART_TARIFF.premium,
        coverages: [
            {
                description: RISKS_DESCRIPTIONS.BUSINESS_PROTECTION_DESC,
                code: RISK_CONSTANTS.REAL_ESTATE.BUSINESS_PROTECTION,
                required: true,
                sum: 7000000
            },
            {
                description: RISKS_DESCRIPTIONS.BUSINESS_PROTECTION_PP_DESC,
                code: RISK_CONSTANTS.MOVABLE_PROPERTY.BUSINESS_PROTECTION_PP,
                required: true,
                sum: 1000000
            },
            {
                description: RISKS_DESCRIPTIONS.CIVIL_LIABILITY_DESC,
                code: RISK_CONSTANTS.CIVIL_LIABILITY,
                required: true,
                sum: 700000
            }
        ]
    },
    {
        tariffName: TARIFF_NAMES.PREMIUM_TARIFF.name,
        programCode: TARIFF_NAMES.PREMIUM_TARIFF.code,
        orderNo: 3,
        premium: TARIFF_NAMES.PREMIUM_TARIFF.premium,
        coverages: [
            {
                description: RISKS_DESCRIPTIONS.BUSINESS_PROTECTION_DESC,
                code: RISK_CONSTANTS.REAL_ESTATE.BUSINESS_PROTECTION,
                required: true,
                sum: 10000000
            },
            {
                description: RISKS_DESCRIPTIONS.BUSINESS_PROTECTION_PP_DESC,
                code: RISK_CONSTANTS.MOVABLE_PROPERTY.BUSINESS_PROTECTION_PP,
                required: true,
                sum: 1000000
            },
            {
                description: RISKS_DESCRIPTIONS.INTERRUPTION_DESC,
                code: RISK_CONSTANTS.INTERRUPTION,
                required: true,
                sum: 100000
            },
            {
                description: RISKS_DESCRIPTIONS.CIVIL_LIABILITY_DESC,
                code: RISK_CONSTANTS.CIVIL_LIABILITY,
                required: true,
                sum: 1000000
            }
        ]
    }
];