import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Add() {
    const [book, setBook] = useState({
        title: "",
        desc: "",
        price: null,
        cover: ""
    });

    const [error, setError] = useState(false)

    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/book', book);
            navigate('/');
        } catch (err) {
            console.log(err);
            setError(true);
        }
    }

    const handleChange = (e) => {
        setBook((prev) => ({...prev, [e.target.name]: e.target.value }));
    }

  return (
    <div className='form'>
        <h1>Add New Book</h1>
        <input 
            type="text"
            placeholder='Book Title'
            name='title'
            onChange={handleChange}
        />
        <textarea 
            type="text"
            placeholder='Book Description'
            name='desc'
            onChange={handleChange}
        />
        <input 
            type="number"
            placeholder='Book Price'
            name='price'
            onChange={handleChange}
        />
        <input 
            type="text"
            placeholder='Book Cover'
            name='cover'
            onChange={handleChange}
        />
        <button onClick={handleClick}>Add</button>
        {error && 'Something went wrong!'}
        <Link to='/'>See all books</Link>
    </div>
  )
}

export default Add