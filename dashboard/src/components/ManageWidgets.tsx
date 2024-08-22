import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StatesType, WidgetType } from '../assets/types'
import AddWidget2 from './AddWidget2';
import AddCategory2 from './AddCategory2';

const ManageWidgets = () => {
    const [selectedCategoryWidgets, setSelectedCategoryWidgets] = useState<WidgetType[]>([]);
    const { categories, selectedCategory } = useSelector((states: StatesType) => states);
    const dispatch = useDispatch();

    useEffect(() => {
        setSelectedCategoryWidgets(categories.filter(category => {
            return category.categoryId === selectedCategory.categoryId;
        })[0].widgets);
    });

    const toggleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: 'UPDATECR', payload: categories.map(category => {
                if (category.categoryId === selectedCategory.categoryId) {
                    category.widgets.map(widget => {
                        if (widget.widgetId === e.target.id.split('-')[1]) {
                            widget.visibility = !(widget.visibility);
                        }
                        return widget;
                    })
                }
                return category;
            })
        });
        e.target.checked = !(e.target.checked);
    }

    return (
        <div className='d-flex flex-column align-items-center manage-widgets-container'>
            <div className='p-2 container d-flex justify-content-between align-items-center mw-heading-container'>
                <h4 className='mb-0'>Manage Widgets</h4>
                <span className="material-symbols-outlined cursor-pointer" onClick={() => dispatch({ type: 'UPDATEMWVRF' })}>
                    close
                </span>
            </div>
            <p className='pt-2 container text-start'>Personalise your dashboard by adding the following widgets.</p>
            <AddCategory2 />
            <div className='d-flex justify-content-start align-items-center mw-categories-container'>
                {categories.map(category => {
                    if (category.categoryId === selectedCategory.categoryId) return <p style={{ textDecoration: 'underline', textUnderlineOffset: '10px', textWrap: 'nowrap', wordSpacing: '-4px' }} onClick={() => dispatch({ type: 'UPDATESCR', payload: { categoryId: category.categoryId, categoryName: category.categoryName } })} className='mx-3 my-2 cursor-pointer'>{category.categoryName}</p>
                    return <p style={{ textWrap: 'nowrap', wordSpacing: '-4px' }} onClick={() => dispatch({ type: 'UPDATESCR', payload: { categoryId: category.categoryId, categoryName: category.categoryName } })} className='mx-3 my-2 cursor-pointer'>{category.categoryName}</p>
                })}
            </div>
            <div className='m-4 container d-flex flex-column align-items-center justify-content-center'>
                {selectedCategoryWidgets.map(widget => {
                    return <div className='mb-2 p-2 container d-flex justify-content-start align-items-center border rounded'>
                        <input type="checkbox" id={'checkbox-' + widget.widgetId} className='cursor-pointer' value={'checkbox-' + widget.widgetId} checked={widget.visibility} onChange={toggleCheckbox} />
                        <p className='mb-0 ms-3'>{widget.widgetName}</p>
                    </div>
                })}
            </div>
            <AddWidget2 />
        </div>
    )
}

export default ManageWidgets