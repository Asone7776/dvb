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
        link: '/admin/new/create',

    },
    {
        icon: FrameTwo,
        subTitle: "Защита бизнеса",
        heading: "Пакеты",
        content: "Комплексное страхование имущества ЮЛ Коробочные решения",
        link: '/admin/new/packages',

    },
    {
        icon: FrameThree,
        subTitle: "Защита бизнеса",
        heading: "Стандарт",
        content: "Комплексное страхование имущества ЮЛ Индивидуальный расчет",
        link: '/admin/new/create',

    }
];

export const tariffs: SafeProgram[] = [
    {
        tariffName: TARIFF_NAMES.PLEDGE_TARIFF.name,
        programCode: TARIFF_NAMES.PLEDGE_TARIFF.code,
        orderNo: 1,
        coverages: [
            {
                description: RISKS_DESCRIPTIONS.BUSINESS_PROTECTION_DESC,
                name: RISK_CONSTANTS.REAL_ESTATE.BUSINESS_PROTECTION,
                required: true,
                price: 5000000
            },
            {
                description: RISKS_DESCRIPTIONS.BUSINESS_PROTECTION_PP_DESC,
                name: RISK_CONSTANTS.MOVABLE_PROPERTY.BUSINESS_PROTECTION_PP,
                required: false,
                price: 15000000
            },
            {
                description: RISKS_DESCRIPTIONS.CIVIL_LIABILITY_DESC,
                name: RISK_CONSTANTS.CIVIL_LIABILITY,
                required: false,
                price: 3000000
            }
        ]
    },
    {
        tariffName: TARIFF_NAMES.ECONOM_TARIFF.name,
        programCode: TARIFF_NAMES.ECONOM_TARIFF.code,
        orderNo: 3,
        premium: TARIFF_NAMES.ECONOM_TARIFF.premium,
        coverages: [
            {
                description: RISKS_DESCRIPTIONS.BUSINESS_PROTECTION_DESC,
                name: RISK_CONSTANTS.REAL_ESTATE.BUSINESS_PROTECTION,
                required: true,
                price: 5000000
            },
            {
                description: RISKS_DESCRIPTIONS.BUSINESS_PROTECTION_PP_DESC,
                name: RISK_CONSTANTS.MOVABLE_PROPERTY.BUSINESS_PROTECTION_PP,
                required: true,
                price: 1000000
            },
            {
                description: RISKS_DESCRIPTIONS.CIVIL_LIABILITY_DESC,
                name: RISK_CONSTANTS.CIVIL_LIABILITY,
                required: true,
                price: 500000
            }
        ]
    },
    {
        tariffName: TARIFF_NAMES.STANDART_TARIFF.name,
        programCode: TARIFF_NAMES.STANDART_TARIFF.code,
        orderNo: 3,
        premium: TARIFF_NAMES.STANDART_TARIFF.premium,
        coverages: [
            {
                description: RISKS_DESCRIPTIONS.BUSINESS_PROTECTION_DESC,
                name: RISK_CONSTANTS.REAL_ESTATE.BUSINESS_PROTECTION,
                required: true,
                price: 7000000
            },
            {
                description: RISKS_DESCRIPTIONS.BUSINESS_PROTECTION_PP_DESC,
                name: RISK_CONSTANTS.MOVABLE_PROPERTY.BUSINESS_PROTECTION_PP,
                required: true,
                price: 1000000
            },
            {
                description: RISKS_DESCRIPTIONS.CIVIL_LIABILITY_DESC,
                name: RISK_CONSTANTS.CIVIL_LIABILITY,
                required: true,
                price: 700000
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
                name: RISK_CONSTANTS.REAL_ESTATE.BUSINESS_PROTECTION,
                required: true,
                price: 10000000
            },
            {
                description: RISKS_DESCRIPTIONS.BUSINESS_PROTECTION_PP_DESC,
                name: RISK_CONSTANTS.MOVABLE_PROPERTY.BUSINESS_PROTECTION_PP,
                required: true,
                price: 1000000
            },
            {
                description: RISKS_DESCRIPTIONS.INTERRUPTION_DESC,
                name: RISK_CONSTANTS.INTERRUPTION,
                required: true,
                price: 100000
            },
            {
                description: RISKS_DESCRIPTIONS.CIVIL_LIABILITY_DESC,
                name: RISK_CONSTANTS.CIVIL_LIABILITY,
                required: true,
                price: 1000000
            }
        ]
    }
];