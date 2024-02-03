import { FieldMetadata } from "./field-metadata";

export interface ColumnMetadata {
    field: FieldMetadata,
    title: string,
    displayComponentType: 'p:outputLabel' | 'p:inputLabel',
    isEditable: boolean,
    editorComponentType:  'h:inputLabel' | 'p:inputLabel',
    decimalPlaces: number, /** for numbers p:inputNumber */
    isFilterable: boolean,
    isSortable: boolean,
}

/**
 * In actionsColumns, the user must be able to drag and drop commandButtons and commandLinks
 */
export interface ActionsColumn {
    order: number,
}