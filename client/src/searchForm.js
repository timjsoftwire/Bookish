import React from 'react';

export default function SearchForm() {
    return (
        <form>
            <label>
                Book Title: 
                <input
                    name="bookTitle"
                    type="text"
                    placeholder="Book title"
                    
                />
            </label>
        </form>
    )

}