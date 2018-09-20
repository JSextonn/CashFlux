import { Action } from '@ngrx/store';

export const SELECT = '[SelectedProfile] Select a profile by id';
export const CLEAR = '[SelectedProfile] Set selected profile to none.';

export class SelectProfile implements Action {
    readonly type = SELECT;

    constructor(public payload: string) { }
}

export class ClearProfileSelection implements Action {
    readonly type = CLEAR;
}

export type Actions = SelectProfile | ClearProfileSelection;
