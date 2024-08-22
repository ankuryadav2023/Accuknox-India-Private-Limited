import React from 'react'
import { useDispatch } from 'react-redux'

const AddWidget = (props: { categoryId: string, categoryName: string }) => {
    const dispatch = useDispatch();

    return (
        <div onClick={() => {
            dispatch({
                type: 'UPDATESCR', payload: {
                    categoryId: props.categoryId,
                    categoryName: props.categoryName
                }
            })
            dispatch({ type: 'UPDATEMWVRT' });
        }} className='m-3 my-0 d-flex flex-column align-items-center justify-content-center widget-container rounded'>
            <span className="material-symbols-outlined">
                add
            </span>
            <p>Add Widget</p>
        </div>
    )
}

export default AddWidget