import React from 'react'
import './styles.css'

const SearchUser = (props) => {
    return (
        <div>
            <input className="search-users-input font-weight-normal" type="text" placeholder="Search User" value={props.value} onChange={props.onChange} name="user-input" />
        </div>
    )

}
export default SearchUser