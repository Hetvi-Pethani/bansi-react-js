import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import './Table.css';


const Table = () => {

    const navigate = useNavigate();


    const [title, setTitle] = useState("");
    const [mdelete, setMdelete] = useState([])
    const allusers = JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")) : []
    const [record, setRecord] = useState(allusers)


    const multipleDeleteRecord = (id, checked) => {
        let old = [...mdelete];
        if (checked) {
            old.push(id)
        }
        else {
            old = old.filter(val => val != id)
        }
        setMdelete(old)

    }
    const multipleDelete = () => {
        let d = record.filter(val => !mdelete.includes(val.id));
        localStorage.setItem("users", JSON.stringify(d));
        setRecord(d);
        alert("multiple status delete");
        setMdelete([])
    }


    const [allrecord, setAllRecord] = useState(localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [])

    const handleSubmit = (e) => {
        e.preventDefault();

        let obj = {
            id: Math.floor(Math.random() * 100000),
            title: title,
           

        }
        const newrecord = [...allrecord, obj];
        localStorage.setItem("users", JSON.stringify(newrecord));
        alert("record add");
        navigate('/');
    }


    return (
        <>
            <div align="center">
                <h2>Add user</h2>
                <form onSubmit={handleSubmit}>
                    

                    <table border={0} cellPadding={10} cellSpacing={5} style={{ margin: "20px" }}>
                        <tr>
                            <td>Title:-</td>
                            <td><input type="text" onChange={(e) => setTitle(e.target.value)} value={title} /></td>
                        </tr>
                       

                        <td></td>
                        <td><input type="submit" className="btn" /></td>

                    </table>
                </form>
            </div>

            <div className="table">
                <div align="center" >
                    <h2>View user</h2>
                   
                    <table border={0} cellPadding={10} cellSpacing={5} style={{ margin: "20px" }}>
                        <thead>
                            <tr>
                                <th># </th>
                                <th>Title</th>
                                <th>Action</th>
                                <th>
                                    <button onClick={() => multipleDelete()}><MdDelete /></button>
                                </th>
                            </tr>

                        </thead>
                        <tbody>

                            {
                                record.map((u, i) => {
                                    const { title } = u
                                    return (
                                        <tr key={++i} align="center">
                                            <td>{++i}</td>
                                            <td>{title}</td>
                                        
                                            <td>
                                                <span onClick={() => navigate(`/edit`, { state: u })}><FaUserEdit style={{ color: "#fff", fontSize: "25px" }} /></span>
                                            </td>
                                            <td>
                                                <input type="checkbox" checked={mdelete.includes(u.id)} onChange={(e) => multipleDeleteRecord(u.id, e.target.checked)} />
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    )
}
export default Table;
