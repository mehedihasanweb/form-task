import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const TaskList = () => {
    const [datas, setDatas] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/datas")
            .then(res => res.json())
            .then(data => setDatas(data))
    })

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`http://localhost:5000/datas/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deleteCount) {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                            const remaining = datas.filter(data => data._id !== id)
                            setDatas(remaining)
                        }
                    })
            }
        })
    }

    

    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Status</th>
                        <th scope="col">Description</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {datas.map((data, i) => (
                        <tr key={i}>
                            <th scope="row">1</th>
                            <td>{data.title}</td>
                            <td>Otto</td>
                            <td>{data.description}</td>
                            <td><Link to={`/update/${data._id}`}><button className='btn btn-outline-secondary'>Update</button></Link></td>
                            <td><button onClick={()=>handleDelete(data._id)} className='btn btn-outline-secondary'>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className='text-center pt-3'><Link to='/' >Go to Form Page</Link></p>
        </div>
    );
};

export default TaskList;