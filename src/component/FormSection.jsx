import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FormSection.css'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const FormSection = () => {
    const handleForm = (event) => {
        event.preventDefault()

        const form = event.target
        const title = form.title.value
        const status = form.status.value
        const description = form.description.value

        const datas = { title, status, description }
        // console.log(datas);

        fetch("http://localhost:5000/datas", {
            method: "POST",
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify(datas)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    if (data.insertedId) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Form Data Added',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                }
            })
    }

    return (
        <div className='form'>
            <Form onSubmit={handleForm} className='border p-5 bg-secondary-subtle rounded-4'>
                <h2 className='text-center mb-5'>Create A New Form</h2>
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
            <Link to='/list' className='mt-5'>Go To Task List Page</Link>
        </div>
    );
};

export default FormSection;