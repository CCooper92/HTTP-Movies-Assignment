import React, {useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
    title:'',
    director:'',
    metascore: null,
};

const UpdateMovie = props => {
    const[updatedMovie, setUpdatedMovie] = useState(initialMovie);
    const { id } = useParams();
    const { push } = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then((res)=>{
            setUpdatedMovie(res.data);
          })
          .catch(err => {
              console.log(err);
          })
    }, []);
    
    const changeHandler = (ev, value) => {
        setUpdatedMovie({
          ...updatedMovie,
          [ev.target.name]: value
        });
      };

      const handleSubmit = (e) => {
          e.preventDefault();
          axios.put(`http://localhost:5000/api/movies/${id}`, updatedMovie)
          .then(res => {
              props.setUpdatedMovie(res.data);
              push('/');
          })
          .catch(err => {
              console.log(err);
          })
      }

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <label>Title   </label>
                <input  
                    type='text'
                    name='title'
                    onChange={changeHandler}
                    placeholder='title'
                    value={updatedMovie.title}
                />
                
                <label>Director    </label> 
                <input
                    type='text'
                    name='director'
                    onChange={changeHandler}
                    placeholder='director'
                    value={updatedMovie.director}
                />
                
                <label>MetaScore   </label> 
                  <input
                    type='text'
                    name='metascore'
                    onChange={changeHandler}
                    placeholder='metascore'
                    value={updatedMovie.metascore}
                />
                
                <button onClick={handleSubmit}>Update Movie</button>
            </form>
        </div>
    )
}

export default UpdateMovie;