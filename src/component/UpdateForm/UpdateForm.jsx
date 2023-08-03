import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
const UpdateForm = () => {

    const loadData = useLoaderData()
    // console.log(loadData);
    const { _id } = loadData;

    const handleUpdate = (event) => {
        event.preventDefault()

        const form = event.target
        const title = form.title.value
        const status = form.status.value
        const description = form.description.value

        const updateData = { title, status, description }

        // console.log(updateData);

        fetch(`http://localhost:5000/datas/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify(updateData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Data Updated Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }
            })
    }

    return (
        <div className='form'>
            <Form onSubmit={handleUpdate} className='border p-5 bg-secondary-subtle rounded-4'>
                <h2 className='text-center mb-5'>Update Form</h2>
                <Form.Group className="mb-3">
                    <Form.Label className='fs-2'>Title</Form.Label>
                    <Form.Control type="text" name='title' placeholder="Title" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className='fs-2'>Status</Form.Label>
                    <Form.Control type="text" name='status' placeholder="Status" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className='fs-2'>Description</Form.Label>
                    <Form.Control name='description'
                        className='mb-3'
                        as="textarea"
                        placeholder="Description"
                        style={{ height: '100px' }}
                    />
                </Form.Group>



                <Button variant="btn btn-outline-secondary" type="submit">
                    Submit
                </Button>
            </Form>
            <Link to='/' className='mt-5'>Go To Task Form Page</Link>
        </div>
    );
};

export default UpdateForm;