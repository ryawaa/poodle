export interface IAppSettings {
    categories: ISettingCategory[];
}

export interface ISettingCategory {
    name: string;
    sections: ISettingSection[];
}

export interface ISettingSection {
    name: string;
    description?: string;
    settings: ISetting[];
}

export interface ISetting {
    name: string;
    description: string;
}

// Primitive Settings
export interface IBooleanSetting extends ISetting {
    default: boolean;
    value: boolean;
}

export interface IPathSetting extends ISetting {
    default: string;
    value: string;
}

export interface IStringSetting extends ISetting {
    default: string;
    value: string;
}

export interface INumberSetting extends ISetting {
    default: number;
    value: number;
}

export interface IArraySetting extends ISetting {
    default: string[];
    type: SettingType;
    value: string[];
}

export interface IObjectSetting extends ISetting {
    default: object;
    value: object;
}

// YouTube-DLP Specific Settings
export interface IYTDLPSetting extends IBooleanSetting {
    enabledFlag: string;
    disabledFlag: string;
}

export interface IYTDLPPathSetting extends IPathSetting {
    enabledFlag: string;
    disabledFlag: string;
}

export interface IYTDLPMultiArgSetting extends IArraySetting {
    enabledFlag: string;
    disabledFlag: string;
}

export enum SettingType {
    BOOLEAN = 'boolean',
    PATH = 'path',
    STRING = 'string',
    NUMBER = 'number',
    OBJECT = 'object',
}