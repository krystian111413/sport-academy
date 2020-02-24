import {DialogType} from './dialog-type.model';

export interface DialogData {
    title: string;
    message: string;
    code: number;
    type: DialogType;
}