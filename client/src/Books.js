import React, {useState, useEffect } from 'react';

export default function Books() {
    // TODO: separate token functionality!
    const [result, setResult] = useState(null);
    
    useEffect(() => {
        const url = "http://localhost:3001/books?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYSIsImlhdCI6MTU2MjgzNTIxNywiZXhwIjoxNTYyODc4NDE3fQ.m-3OoA6aSFrbwWtZV_CWQkTRSE-_4n-21pxFTZ9f-xg";
        fetch(url)
            .then(response => response.json())
            .then(body => {
                setResult(body.map(Book))
            })
    }, []);
    return (
        <div>
            { result }
        </div>
    )
}

function Book(book) {
    return (
        <div className="book" key={book.isbn}>
            <h2>{book.title} <small>({book.isbn})</small></h2>
            <h3>by {book.author.lname}, {book.author.fname}</h3>
        </div>
    );
}