import Resources from "./resources.d.ts";

declare module 'i18next'{
    interface CustomTypeOptions {
        defaultNS: "common";
        resources: Resources;
    }
}