import React from 'react';

export default function SearchForm() {
    return (
        <form id="search">
            <label>
                Book title: 
                <input
                    name="bookTitle"
                    type="text"
                    placeholder="Book title"
                    
                />
            </label>
            <br />
            <label>
                Author first name: 
                <input
                    name="fname"
                    type="text"
                    placeholder="Author first name"
                />
            </label>
            <br />
            <label>
                Author last name: 
                <input
                    name="lname"
                    type="text"
                    placeholder="Author last name"
                    />
            </label>
            <br />
            <button type="submit"> 
            Search
            </button>
        </form>
    )

}