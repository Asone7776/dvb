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
        content: "",
        orderNo: 0,
        external: false,
    },
    {
        icon: FrameTwo,
        subTitle: "Защита бизнеса",
        heading: "Пакеты",
        content: "",
        link: '/admin/new/packages',
        external: false,
    },
    // {
    //     icon: FrameThree,
    //     subTitle: "Защита бизнеса",
    //     heading: "Стандарт",
    //     content: "Комплексное страхование имущества ЮЛ Индивидуальный расчет",
    //     link: 'https://vskcorp.ru/shield',
    //     external: true,
    // }
];

export const tariffs: SafeProgram[] = [
    {
        tariffName: TARIFF_NAMES.PLEDGE_TARIFF.name,
        programCode: TARIFF_NAMES.PLEDGE_TARIFF.code,
        orderNo: 0,
        coverages: [
            {
                description: RISKS_DESCRIPTIONS.BUSINESS_PROTECTION_CONSTRUCTIVE,
                code: RISK_CONSTANTS.REAL_ESTATE.BUSINESS_PROTECTION_CONSTRUCTIVE,
                required: false,
                sum: 10000000,
                asSlider: true
            },
            {
                description: RISKS_DESCRIPTIONS.BUSINESS_PROTECTION_FINISHING_AND_EQUIPMENT,
                code: RISK_CONSTANTS.REAL_ESTATE.BUSINESS_PROTECTION_FINISHING_AND_EQUIPMENT,
                required: false,
                sum: 5000000,
                asSlider: true
            },
            {
                description: RISKS_DESCRIPTIONS.BUSINESS_PROTECTION_PP,
                code: RISK_CONSTANTS.MOVABLE_PROPERTY.BUSINESS_PROTECTION_PP,
                required: false,
                sum: 5000000,
                asSlider: true
            },
            {
                description: RISKS_DESCRIPTIONS.CIVIL_LIABILITY,
                code: RISK_CONSTANTS.CIVIL_LIABILITY,
                required: false,
                sum: 3000000,
                asSlider: true
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
                sum: 5000000,
                asSlider: true
            },
            {
                description: RISKS_DESCRIPTIONS.BUSINESS_PROTECTION_PP_DESC,
                code: RISK_CONSTANTS.MOVABLE_PROPERTY.BUSINESS_PROTECTION_PP,
                required: true,
                sum: 1000000,
                asSlider: true
            },
            {
                description: RISKS_DESCRIPTIONS.CIVIL_LIABILITY_DESC,
                code: RISK_CONSTANTS.CIVIL_LIABILITY,
                required: true,
                sum: 500000,
                asSlider: false
            }
        ],
        risks: [
            {
                name: 'Пожар',
                includes: true
            },
            {
                name: 'Удар молнии',
                includes: true
            },
            {
                name: 'Взрыв',
                includes: true
            },
            {
                name: 'Падение летательных аппаратов',
                includes: true
            },
            {
                name: 'Гражданская ответственность',
                includes: true
            },
            {
                name: 'Действия воды',
                includes: false
            },
            {
                name: 'Противоправные действия 3-х лиц',
                includes: false
            },
            {
                name: 'Убытки от перерыва в хозяйственной деятельности',
                includes: false
            },
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
                sum: 7000000,
                asSlider: true
            },
            {
                description: RISKS_DESCRIPTIONS.BUSINESS_PROTECTION_PP_DESC,
                code: RISK_CONSTANTS.MOVABLE_PROPERTY.BUSINESS_PROTECTION_PP,
                required: true,
                sum: 1000000,
                asSlider: true
            },
            {
                description: RISKS_DESCRIPTIONS.CIVIL_LIABILITY_DESC,
                code: RISK_CONSTANTS.CIVIL_LIABILITY,
                required: true,
                sum: 700000,
                asSlider: false
            }
        ],
        risks: [
            {
                name: 'Пожар',
                includes: true
            },
            {
                name: 'Удар молнии',
                includes: true
            },
            {
                name: 'Взрыв',
                includes: true
            },
            {
                name: 'Падение летательных аппаратов',
                includes: true
            },
            {
                name: 'Гражданская ответственность',
                includes: true
            },
            {
                name: 'Действия воды',
                includes: true
            },
            {
                name: 'Противоправные действия 3-х лиц',
                includes: false
            },
            {
                name: 'Убытки от перерыва в хозяйственной деятельности',
                includes: false
            },
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
                sum: 10000000,
                asSlider: true
            },
            {
                description: RISKS_DESCRIPTIONS.BUSINESS_PROTECTION_PP_DESC,
                code: RISK_CONSTANTS.MOVABLE_PROPERTY.BUSINESS_PROTECTION_PP,
                required: true,
                sum: 1000000,
                asSlider: true
            },
            {
                description: RISKS_DESCRIPTIONS.INTERRUPTION_DESC,
                code: RISK_CONSTANTS.INTERRUPTION,
                required: true,
                sum: 100000,
                asSlider: false
            },
            {
                description: RISKS_DESCRIPTIONS.CIVIL_LIABILITY_DESC,
                code: RISK_CONSTANTS.CIVIL_LIABILITY,
                required: true,
                sum: 1000000,
                asSlider: false
            }
        ],
        risks: [
            {
                name: 'Пожар',
                includes: true
            },
            {
                name: 'Удар молнии',
                includes: true
            },
            {
                name: 'Взрыв',
                includes: true
            },
            {
                name: 'Падение летательных аппаратов',
                includes: true
            },
            {
                name: 'Гражданская ответственность',
                includes: true
            },
            {
                name: 'Действия воды',
                includes: true
            },
            {
                name: 'Противоправные действия 3-х лиц',
                includes: true
            },
            {
                name: 'Убытки от перерыва в хозяйственной деятельности',
                includes: true
            },
        ]
    }
];

export const documentTypes = {
    DOCUMENT_TYPE_1: 'Доверенность',
    DOCUMENT_TYPE_2: 'Устав',
    DOCUMENT_TYPE_3: 'Свидетельство о государственной регистрации ФЛ в качестве ИП',
    DOCUMENT_TYPE_4: 'Лист записи ЕГРИП'
}