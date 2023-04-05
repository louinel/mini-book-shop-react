import axios from 'axios';
import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Update() {
    const [book, setBook] = useState({
        title: "",
        desc: "",
        price: "",
        cover: "",
    });  

    const [error, setError] = useState(false)

    const location = useLocation();
    const navigate = useNavigate();

    const bookId = location.pathname.split('/')[2];

    useEffect(() => {
        const fetchAllBooks = async () => {
          try {
            const res = await axios.get(`http://localhost:5000/book/${bookId}`);
            setBook(res.data)
          } catch (err) {
              console.log(err);
              setError(true);
          }
        }
        fetchAllBooks();
      }, [bookId, navigate]);

    const handleChange = (e) => {
        setBook((prev) => ({...prev, [e.target.name]: e.target.value }));
        e.preventDefault();
    }

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:5000/book/${bookId}`, book);
            navigate('/');
        } catch (err) {
            console.log(err);
            setError(true);
        }
    }

  return (
    <div className='form'>
        <h1>Update the Book</h1>
        <input 
            type="text"
            placeholder='Book Title'
            name='title'
            id='title'
            value={book.title}
            onChange={handleChange}
        />
        <textarea 
            rows={5}
            type="text"
            placeholder='Book Description'
            name='desc'
            id='desc'
            value={book.desc}
            onChange={handleChange}
        />
        <input 
            type="number"
            placeholder='Book Price'
            value={book.price}
            name='price'
            id='price'
            onChange={handleChange}
        />
        <input 
            type="text"
            placeholder='Book Cover'
            name='cover'
            id='cover'
            value={book.cover}
            onChange={handleChange}
        />
        <button onClick={handleClick}>Update</button>
        {error && 'Something went wrong!'}
        <Link to='/'>See all books</Link>
    </div>
  )
}

export default Update