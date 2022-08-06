export const RISK_CONSTANTS = {
    REAL_ESTATE: {
        BUSINESS_PROTECTION: 'BUSINESS_PROTECTION',
        VEHICLE_COLLISION: 'VEHICLE_COLLISION',
        NATURAL: 'NATURAL',
        ENGINEERING_SYSTEM_ACCIDENT: 'ENGINEERING_SYSTEM_ACCIDENT',
        ROBBERY: 'ROBBERY',
        ILLEGAL_3DPARTY: 'ILLEGAL_3DPARTY',
        WATER_DAMAGE: 'WATER_DAMAGE'
    },
    MOVABLE_PROPERTY: {
        BUSINESS_PROTECTION_PP: "BUSINESS_PROTECTION_PP",
        VEHICLE_COLLISION_PP: "VEHICLE_COLLISION_PP",
        NATURAL_PP: "NATURAL_PP",
        ENGINEERING_SYSTEM_ACCIDENT_PP: 'ENGINEERING_SYSTEM_ACCIDENT_PP',
        ROBBERY_PP: 'ROBBERY_PP',
        ILLEGAL_3DPARTY_PP: 'ILLEGAL_3DPARTY_PP',
        WATER_DAMAGE_PP: 'WATER_DAMAGE_PP',
    },
    TERRORISM: "TERRORISM",
    CIVIL_LIABILITY: 'CIVIL_LIABILITY',
    INTERRUPTION: 'INTERRUPTION',
};

export const TARIFF_NAMES = {
    PLEDGE_TARIFF: {
        name: 'Страхование имущества в залоге',
        code: "PLEDGE",
    },
    ECONOM_TARIFF: {
        name: 'Эконом',
        code: "ECONOM",
        premium:12600,
    },
    STANDART_TARIFF: {
        name: 'Стандарт',
        code: "STANDART",
        premium: 19100,
    },
    PREMIUM_TARIFF: {
        name: "Премиум",
        code: "PREMIUM",
        premium: 32000,
    }
};

export const RISKS_DESCRIPTIONS = {
    BUSINESS_PROTECTION_DESC: 'Недвижимое имущество(включая конструктивные элементы, внутреннюю отделку, инженерное оборудование)',
    BUSINESS_PROTECTION_PP_DESC: "Движимое имущество",
    INTERRUPTION_DESC: 'Убытки от перерыва в деятельности',
    CIVIL_LIABILITY_DESC: 'Гражданская ответственность'
}