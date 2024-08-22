import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { StatesType } from '../assets/types';

const AddCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const { categories } = useSelector((states: StatesType) => states);
    const dispatch = useDispatch();

    const addCategory = () => {
        dispatch({
            type: 'UPDATECR', payload: [...categories, { categoryId: categories.length, categoryName: categoryName, widgets: [] }]
        });
    }

    return (
        <div className='mb-4 container d-flex flex-column align-items-center justify-content-center'>
            <input type="text" className='m-2 p-2 container rounded' value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder='Enter Category Name Here' />
            <button className='m-2 p-1 container rounded' onClick={addCategory}>Add</button>
        </div>
    )
}

export default AddCategory