
import React, { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';

function App() {
    const [data, setData] = useState();

    useEffect(() => {
        axios.get('http://localhost:5000/api/products').then(
            response => {
                setData(response.data);
            }
        ).catch(error => {
            console.error(error);
        })
    }, [])

    return (
        <div className="App">
            {
                <div className='products'>
                    {data?.map((data) => {
                        return (
                            <div key={data.id}>
                                <img className='img'
                                    src={data.image}
                                    alt="img" />
                                <h1>{data.name}</h1>
                                <p>{data.description}</p>
                            </div>
                        );
                    })
                    }
                </div>
            }
        </div>
    );
}
export default App;