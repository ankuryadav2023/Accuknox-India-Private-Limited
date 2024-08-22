export interface WidgetType {
    widgetId: string;
    widgetName: string;
    widgetType?: 'line' | 'bar' | 'pie' | 'doughnut';
    visibility?: boolean;
    data?: {
        labels: string[];
        datasets: Array<{
            label: string;
            data: number[];
            backgroundColor?: string | string[];
            borderColor?: string | string[];
            borderWidth?: number;
        }>;
    };
}

export interface CategoryType {
    categoryId: string;
    categoryName: string;
    widgets: WidgetType[];
}

export interface StatesType {
    categories: CategoryType[];
    selectedCategory: {
        categoryId: string;
        categoryName: string;
    };
    manageWidgetsVisibility: boolean;
}

export interface CategoriesReducerType {
    type: string;
    payload: CategoryType[];
}

export interface SelectedCategoryReducerType {
    type: string;
    payload: {
        categoryId: string;
        categoryName: string;
    }
}