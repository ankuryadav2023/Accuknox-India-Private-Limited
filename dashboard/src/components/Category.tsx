import Widget from './Widget'
import { CategoryType } from '../assets/types'
import AddWidget from './AddWidget'

const Category = (props: { category: CategoryType }) => {
    return (
        <div className='mt-4 mb-0 container d-flex flex-column justify-content-center align-items-center'>
            <h3 className='ms-3 container text-start'>{props.category.categoryName}</h3>
            <div className='container d-flex justify-content-start align-items-stretch widgets-container'>
                {props.category.widgets.map(widget => {
                    return widget?.visibility ? <Widget key={widget.widgetId} categoryId={props.category.categoryId} widget={widget} /> : <></>
                })}
                <AddWidget categoryId={props.category.categoryId} categoryName={props.category.categoryName} />
            </div>
        </div>
    )
}

export default Category