import { useDispatch } from 'react-redux'

const AddCategory = () => {
    const dispatch = useDispatch();

    return (
        <div className='p-2 d-flex justify-content-center align-items-center border rounded cursor-pointer' onClick={() => dispatch({ type: 'UPDATEMWVRT' })} style={{ backgroundColor: 'rgb(180,180,180)' }}>
            <span className="material-symbols-outlined">
                add
            </span>
            <p className='m-0 ms-2'>Add Category</p>
        </div>
    )
}

export default AddCategory