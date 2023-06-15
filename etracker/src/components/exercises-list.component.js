import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ExerciseList = () => {
    const [Data, setData] = useState([]);

    useEffect(() => {
        let isMounted = true;
        axios.get('http://localhost:5000/exercises/')
            .then(response => {
                if(isMounted) {
                    response.data.map((data) => {
                        setData((oldArray) => [...oldArray, data]);
                        return 0;
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
        return () => {
            isMounted = false;
        }
    }, []);

    const deleteExercise = (id) => {
        axios.delete("http://localhost:5000/exercises/" + id)
            .then(response => {
                console.log(response.data);
            });

        setData(Data.filter((el) => {
            return el._id !== id
        }))
    };

    return (
        <div>
            <h3>Logged Exercises</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Data.map((data, index) => {
                        return (<tr key={index}>
                            <td>{data.username}</td>
                            <td>{data.description}</td>
                            <td>{data.duration}</td>
                            <td>{data.date.substring(0,10)}</td>
                            <td>
                                <Link className="btn btn-primary" to={"/edit/" + data._id}>edit</Link>
                                <button className="btn btn-danger"
                                    href='/'
                                    onClick={() => {
                                        deleteExercise(data._id);
                                    }}
                                >
                                    delete
                                </button>
                            </td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ExerciseList;