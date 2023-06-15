import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker-min.module.css"
import axios from "axios";

const CreateExercise = () => {
    const [Exercise, setExercise] = useState({
        username: "default",
        description: "",
        duration: 0,
        date: new Date()
    });

    const [Users, setUsers] = useState([]);

    const onSubmit = () => {
        axios.post("http://localhost:5000/exercises/add", Exercise)
            .then(response => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            })
    };

    useEffect( () => {
        let isMounted = true;
        axios.get("http://localhost:5000/users")
            .then(response => {
                if(isMounted) {
                    response.data.map(user => {
                        setUsers(oldArray => [...oldArray, user.username]);
                        return 0;
                    })
                }
            })
        return () => {
            isMounted = false;
        }
    }, []);

    return (
        <div>
            <h3>Create New Exercise Log</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <select
                        required
                        className="form-control"
                        value={Exercise.username}
                        onChange={(e) => {
                            setExercise({ ...Exercise, username: e.target.value})
                        }}
                    >
                        {Users.map(function (user) {
                            return (
                                <option key={user} value={user}>
                                    {user}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input
                        type="text"
                        required
                        className="form-control"
                        value={Exercise.description}
                        onChange = {(e) => {
                            setExercise({ ...Exercise, description: e.target.value})
                        }}
                    ></input>
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input
                        type="text"
                        className="form-control"
                        value={Exercise.duration}
                        onChange={(e) => {
                            setExercise({...Exercise, duration: e.target.value})
                        }}
                    >
                    </input>
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <div>
                        <DatePicker
                            selected={Exercise.date}
                            onChange={(e) => {
                                setExercise({...Exercise, date: e.target.value})
                            }}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value ="Create Exercise Log"
                        className="btn btn-primary"
                    >
                    </input>
                </div>
            </form>
        </div>
    );
};

export default CreateExercise;
