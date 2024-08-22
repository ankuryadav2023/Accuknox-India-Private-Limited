import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { StatesType } from '../assets/types';

const SearchWidgets = () => {
    const { categories } = useSelector((states: StatesType) => states);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState<string[]>([]);

    useEffect(() => {
        if (searchQuery.length > 0) {
            let aOAOWidgets = categories.map(category => {
                return category.widgets;
            });
            let filteredWidgets = [];
            for (let i = 0; i < aOAOWidgets.length; i++) {
                for (let j = 0; j < aOAOWidgets[i].length; j++) {
                    if (aOAOWidgets[i][j].widgetName.toLowerCase().includes(searchQuery)) filteredWidgets.push(aOAOWidgets[i][j].widgetName);
                }
            }
            setSearchResult(filteredWidgets);
        } else {
            setSearchResult([]);
        }
    }, [searchQuery])

    return (
        <div className='me-4 d-flex flex-column align-items-center justify-content-center search-widgets-container'>
            <input type="text" className='p-2 container rounded' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='Search' />
            <div className='rounded search-widgets-results-container'>
                {searchResult.map(sr => <p className='m-0 p-2 border rounded'>{sr}</p>)}
                {(searchResult.length === 0 && searchQuery.length > 0) ? <p className='m-0 p-2 border rounded'>No Widgets Found</p> : <></>}
            </div>
        </div>
    )
}

export default SearchWidgets