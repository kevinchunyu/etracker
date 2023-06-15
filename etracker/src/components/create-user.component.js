import React, { useState } from "react";
import axios from "axios";


const CreateUser = () => {
    const [Username, setUsername] = useState("");

    const onSubmit = () => {
        axios.post("http://localhost:5000/users/add", {username : Username})
            .then(response => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
    };

    return (
        <div>
            <h3>Create New User</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input
                    type="text"
                    required
                    className="form-control"
                    value={Username}
                    onChange={(e) => setUsername(e.target.value)}
                    >
                    </input>
                </div>
                <div className="form-group">
                    <input
                    type="submit"
                    value="Create User"
                    className="btn btn-primary"
                    >
                    </input>
                </div>
            </form>
        </div>
    )
};

export default CreateUser;
