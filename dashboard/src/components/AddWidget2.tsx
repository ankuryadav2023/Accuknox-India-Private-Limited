import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { StatesType } from '../assets/types';

const AddWidget = () => {
    const [widgetName, setWidgetName] = useState('');
    const { categories, selectedCategory } = useSelector((states: StatesType) => states);
    const dispatch = useDispatch();

    const addWidget = () => {
        dispatch({
            type: 'UPDATECR', payload: categories.map(category => {
                if (category.categoryId === selectedCategory.categoryId) {
                    category.widgets.push({ widgetId: category.widgets.length.toString(), widgetName: widgetName, visibility: true });
                }
                return category;
            })
        });
    }

    return (
        <div className='container d-flex flex-column align-items-center justify-content-center'>
            <input type="text" className='m-2 p-2 container rounded' value={widgetName} onChange={(e) => setWidgetName(e.target.value)} placeholder='Enter Widget Name Here' />
            <button className='m-2 p-1 container rounded cursor-pointer' onClick={addWidget}>Add</button>
        </div>
    )
}

export default AddWidget