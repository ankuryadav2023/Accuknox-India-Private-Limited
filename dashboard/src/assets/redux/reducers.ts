import categories from '../data.json';
import { CategoriesReducerType, SelectedCategoryReducerType } from '../types';

export const categoriesReducer = (state = categories, action: CategoriesReducerType) => {
    switch (action.type) {
        case 'UPDATECR':
            return action.payload;
        default:
            return state;
    }
}

export const selectedCategoryReducer = (state = { categoryId: categories[0].categoryId, categoryName: categories[0].categoryName }, action: SelectedCategoryReducerType) => {
    switch (action.type) {
        case 'UPDATESCR':
            return action.payload;
        default:
            return state;
    }
}

export const manageWidgetsVisibilityReducer = (state = false, action: { type: string }) => {
    switch (action.type) {
        case 'UPDATEMWVRT':
            return true;
        case 'UPDATEMWVRF':
            return false;
        default:
            return state;
    }
}