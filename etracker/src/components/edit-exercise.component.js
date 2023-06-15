import React, {useState, useEffect} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker-min.module.css"
import axios from "axios";
import {useParams} from "react-router-dom";


const EditExercise = () => {
    const {id} = useParams();

    const [Exercise, setExercise] = useState({
        username: "hello",
        description: "",
        duration: 0,
        date: new Date()
    });

    const [Users, setUsers] = useState([]);
    const onSubmit = () => {
        axios.post("http://localhost:5000/exercises/update/" + id, Exercise)
    };

    useEffect ( () => {
        let isMounted = true;
        axios.get("http://localhost:5000/exercises/" + id)
            .then(response => {
                if(isMounted) {
                    setExercise({
                        username: response.data.username,
                        description: response.data.description,
                        duration: response.data.duration,
                        date: new Date(response.data.date)
                    })
                }
            })
            .catch(function(error) {
                console.log(error);
            })

        axios.get("http://localhost:5000/users")
            .then(res => {
                if(isMounted) {
                    res.data.map(user => {
                        setUsers(oldArray => [...oldArray, user.username])
                        return 0;
                    })
                }
            })

        return () => {
            isMounted = false;
        }
    }, [id]);

    return (
        <div>
            <h3>Edit Exercise Log</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <select
                        required
                        className="form-control"
                        value={Exercise.username}
                        onChange={(e) =>
                            setExercise({...Exercise, username: e.target.value})
                        }
                    >
                        {Users.map(function(user) {
                            return (
                                <option key={user} value={user}>
                                    {user}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={Exercise.description}
                        onChange={(e) =>
                            setExercise({...Exercise, description: e.target.value})
                        }
                    >
                    </input>
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input
                        type="text"
                        className="form-control"
                        value={Exercise.duration}
                        onChange = {(e) =>
                            setExercise({...Exercise, duration: e.target.value})
                        }
                    >
                    </input>
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            selected={Exercise.date}
                            onChange= {(e) =>
                                setExercise({...Exercise, date: e.target.value})
                            }
                        />
                    </div>
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Create Exercise Log"
                        className="btn btn-primary"
                    >
                    </input>
                </div>
            </form>
        </div>
    );
};

export default EditExercise;