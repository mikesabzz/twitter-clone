import React from 'react'

const SearchUser = (props) => {
    return (
        <div>
            <input type="text" placeholder="Search User" value={props.value} onChange={props.onChange} name="user-input" />
        </div>
    )

}
export default SearchUser