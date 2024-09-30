import type {
    IAppSettings,
    ISettingCategory,
    ISettingSection,
    ISetting,
    IBooleanSetting,
    IPathSetting,
    IStringSetting,
    INumberSetting,
    IArraySetting,
    SettingType,
    IObjectSetting,
    IYTDLPSetting,
    IYTDLPPathSetting,
    IYTDLPMultiArgSetting
} from '../interfaces/settings.interface';

export class AppSettings implements IAppSettings {
    categories: ISettingCategory[];

    constructor(categories: ISettingCategory[]) {
        this.categories = categories;
    }

    addCategory(category: ISettingCategory) {
        this.categories.push(category);
    }

    addCategories(categories: ISettingCategory[]) {
        this.categories.push(...categories);
    }

    removeCategory(category: ISettingCategory) {
        this.categories = this.categories.filter(c => c !== category);
    }

    removeCategories(categories: ISettingCategory[]) {
        this.categories = this.categories.filter(c => !categories.includes(c));
    }

    getCategory(name: string) {
        return this.categories.find(c => c.name === name);
    }

    getCategories() {
        return this.categories;
    }
}

export class SettingsCategory implements ISettingCategory {
    name: string;
    sections: ISettingSection[];

    constructor(name: string, sections: ISettingSection[]) {
        this.name = name;
        this.sections = sections;
    }

    addSection(section: ISettingSection) {
        this.sections.push(section);
    }

    addSections(sections: ISettingSection[]) {
        this.sections.push(...sections);
    }

    removeSection(section: ISettingSection) {
        this.sections = this.sections.filter(s => s !== section);
    }

    removeSections(sections: ISettingSection[]) {
        this.sections = this.sections.filter(s => !sections.includes(s));
    }

    getSection(name: string) {
        return this.sections.find(s => s.name === name);
    }

    getSections() {
        return this.sections;
    }
}

export class SettingSection implements ISettingSection {
    name: string;
    description?: string;
    settings: ISetting[];

    constructor(name: string, settings: ISetting[], description?: string) {
        this.name = name;
        this.settings = settings;
        this.description = description;
    }

    addSetting(setting: ISetting) {
        this.settings.push(setting);
    }

    addSettings(settings: ISetting[]) {
        this.settings.push(...settings);
    }

    removeSetting(setting: ISetting) {
        this.settings = this.settings.filter(s => s !== setting);
    }

    removeSettings(settings: ISetting[]) {
        this.settings = this.settings.filter(s => !settings.includes(s));
    }

    getSetting(name: string) {
        return this.settings.find(s => s.name === name);
    }

    getSettings() {
        return this.settings;
    }
}

abstract class Setting implements ISetting {
    name: string;
    description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }
}

// Primitive Setting Classes
abstract class BaseSetting<T> extends Setting {
    default: T;
    value: T;

    constructor(name: string, description: string, defaultValue: T, value: T) {
        super(name, description);
        this.default = defaultValue;
        this.value = value;
    }

    reset() {
        this.value = this.default;
    }

    getValue() {
        return this.value;
    }

    setValue(value: T) {
        this.value = value;
    }
}

export class BooleanSetting extends BaseSetting<boolean> implements IBooleanSetting {
    enable() {
        this.value = true;
    }

    disable() {
        this.value = false;
    }
}

export class PathSetting extends BaseSetting<string> implements IPathSetting {}

export class StringSetting extends BaseSetting<string> implements IStringSetting {}

export class NumberSetting extends BaseSetting<number> implements INumberSetting {}

export class ArraySetting extends BaseSetting<string[]> implements IArraySetting {
    type: SettingType;

    constructor(
        name: string,
        description: string,
        defaultValue: string[],
        type: SettingType,
        value: string[]
    ) {
        super(name, description, defaultValue, value);
        this.type = type;
    }

    getType() {
        return this.type;
    }

    setType(type: SettingType) {
        this.type = type;
    }
}

export class ObjectSetting extends BaseSetting<object> implements IObjectSetting {}

// YouTube-DLP Specific Settings
abstract class YTDLPBaseSetting<T> extends BaseSetting<T> {
    enabledFlag: string;
    disabledFlag: string;

    constructor(
        name: string,
        description: string,
        defaultValue: T,
        value: T,
        enabledFlag: string,
        disabledFlag: string
    ) {
        super(name, description, defaultValue, value);
        this.enabledFlag = enabledFlag;
        this.disabledFlag = disabledFlag;
    }

    getEnabledFlag() {
        return this.enabledFlag;
    }

    setEnabledFlag(flag: string) {
        this.enabledFlag = flag;
    }

    getDisabledFlag() {
        return this.disabledFlag;
    }

    setDisabledFlag(flag: string) {
        this.disabledFlag = flag;
    }
}

export class YTDLPSetting extends YTDLPBaseSetting<boolean> implements IYTDLPSetting {}

export class YTDLPPathSetting extends YTDLPBaseSetting<string> implements IYTDLPPathSetting {}

export class YTDLPMultiArgSetting extends YTDLPBaseSetting<string[]> implements IYTDLPMultiArgSetting {
    type: SettingType;

    constructor(
        name: string,
        description: string,
        defaultValue: string[],
        type: SettingType,
        value: string[],
        enabledFlag: string,
        disabledFlag: string
    ) {
        super(name, description, defaultValue, value, enabledFlag, disabledFlag);
        this.type = type;
    }
}
