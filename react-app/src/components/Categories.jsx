import { Link, useNavigate } from 'react-router-dom';
import './Header.css'
import categories from './CategoriesList';
import { useState } from 'react';
function Categories(props) {

    // const navigate = useNavigate();
    // const handleCategoryChange = (event) => {
    //     navigate('/category/' + event.target.value);
    // };
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleCategorySelect = (category) => {
        navigate('/category/' + category);
        setIsOpen(false); // Close dropdown after selection
    };
    return (
        // <div className='cat-container'>
        //     <div>
        //     <label className='pr-3'>All Categories </label>
        //         <select onChange={handleCategoryChange} className='category-select'>
        //             {categories && categories.length > 0 &&
        //                 categories.map((item, index) => (
        //                     <option key={index} value={item}>{item}</option>
        //                 ))
        //             }
        //         </select>
        //     </div>
        // </div>
        <div className='cat-container'>
            <div className='dropdown'>
                <span className='dropdown-label' onClick={toggleDropdown}>
                    Categories <span className={`arrow ${isOpen ? 'up' : 'down'}`}></span>
                </span>
                {isOpen && (
                    <div className='dropdown-content'>
                        {categories.map((item, index) => (
                            <div key={index} onClick={() => handleCategorySelect(item)} className='dropdown-item'>
                                {item}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}


export default Categories;