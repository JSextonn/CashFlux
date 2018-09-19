import { Action } from '@ngrx/store';

export const SELECT = '[SelectedProfile] Select a profile by id';
export const SELECT_NONE = '[SelectedProfile] Set selected profile to none.';

export class Select implements Action {
    readonly type = SELECT;

    constructor(public payload: string) { }
}

export class SelectNone implements Action {
    readonly type = SELECT_NONE;
}

export type Actions = Select | SelectNone;
