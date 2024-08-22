import { createStore, combineReducers } from "redux";
import { categoriesReducer, manageWidgetsVisibilityReducer, selectedCategoryReducer } from "./reducers";

const reducers = combineReducers({
    categories: categoriesReducer,
    selectedCategory: selectedCategoryReducer,
    manageWidgetsVisibility: manageWidgetsVisibilityReducer,
})

export const store = createStore(reducers);
