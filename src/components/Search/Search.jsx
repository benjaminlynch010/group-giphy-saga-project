import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Search() {
    const dispatch = useDispatch();


    useEffect(() => {
        getGifs()
    }, []);

    const getGifs = () => {
        dispatch({ type: 'GET_GIFS' })
    }


    return (
        <>
            <form>
                <div>
                    <input
                        type="search"
                        id="mySearch"
                        name="q"
                        placeholder="Search gifs"
                        size="30" />
                    <button>Search</button>
                </div>
            </form>

        </>
    )
}

export default Search;