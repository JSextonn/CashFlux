import * as SelectedProfileActions from '../actions/selected-profile.actions';

const initialState = '';

export function selectedProfileReducer(state = initialState, action: SelectedProfileActions.Actions): string {
    switch (action.type) {
        case SelectedProfileActions.SELECT: {
            return action.payload;
        }

        case SelectedProfileActions.SELECT_NONE: {
            return '';
        }

        default: {
            return state;
        }
    }
}
