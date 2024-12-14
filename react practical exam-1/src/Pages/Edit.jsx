import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"
import './Edit.css';

const Edit = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [editid, setEditId] = useState("")

    const [allrecord, setAllRecord] = useState(localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [])

    useEffect(() => {
        setTitle(location?.state?.title)
        setEditId(location?.state?.id)
    }, [location?.state])

    const handleSubmit = (e) => {
        e.preventDefault();
        let up = allrecord.map((val, i) => {
            if (val.id == editid) {
                val.title = title
            }
            return val;
        })
        localStorage.setItem("users", JSON.stringify(up));
        alert("record updated");
        navigate("/")
    }

    return (
        <div align="center">
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit}>
                <table  style={{ margin: "20px" }}>
                    <tr>
                        <td>Title:-</td>
                        <td><input type="text" onChange={(e) => setTitle(e.target.value)} value={title} /></td>
                    </tr>
                   
                    <td></td>
                    <td><input type="submit" className="btn"/></td>
                </table>
            </form>
          
        </div>
    )
}
export default Edit;
