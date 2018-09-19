import { Action } from '@ngrx/store';
import { FluxProfile } from '../models/profile.model';

export const ADD = '[FluxProfile] Add flux profile';
export const ADD_MANY = '[FluxProfile] Add many flux profiles';
export const REMOVE = '[FluxProfile] Remove flux profile';
export const REMOVE_MANY = '[FluxProfile] Remove many flux profiles';

export class AddProfile implements Action {
    readonly type = ADD;

    constructor(public payload: FluxProfile) { }
}

export class AddProfiles implements Action {
    readonly type = ADD_MANY;

    constructor(public payload: FluxProfile[]) { }
}

export class RemoveProfile implements Action {
    readonly type = REMOVE;

    constructor(public payload: string) { }
}

export class RemoveProfiles implements Action {
    readonly type = REMOVE_MANY;

    constructor(public payload: string[]) { }
}

export type Actions = AddProfile | AddProfiles | RemoveProfile | RemoveProfiles;
