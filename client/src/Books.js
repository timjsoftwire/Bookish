import React, {useState, useEffect } from 'react';


export default function Books() {
    // TODO: separate token functionality!
    const [result, setResult] = useState(null);

    


    useEffect(() => {
        const currentUrl = new URL(window.location.href);
        let params = new URLSearchParams(currentUrl.search);

        let bookToSearch = params.getAll("bookTitle");

        let url = "http://localhost:3001/books?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYSIsImlhdCI6MTU2MjgzNTIxNywiZXhwIjoxNTYyODc4NDE3fQ.m-3OoA6aSFrbwWtZV_CWQkTRSE-_4n-21pxFTZ9f-xg";
        if (bookToSearch) {url += "&title=" + bookToSearch}

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
            <h2>{book.title} <small>by {book.author.lname}, {book.author.fname} <small>(ISBN: {book.isbn})</small></small></h2>
            <p>We have {book.copies} {book.copies === 1 ? "copy" : "copies"} of this book!</p>
        </div>
    );
}