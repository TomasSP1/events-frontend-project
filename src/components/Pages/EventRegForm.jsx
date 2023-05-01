import React, { useState, useEffect } from 'react';
// import categoriesService from '../services/CategoriesService';
import { Container, Col, Row } from "react-bootstrap";

// import eventServices from '../services/EventService'

import { Form, Button } from 'react-bootstrap';



const EventRegForm = ({ getData }) => {
    const [categories, setCategories] = useState([]);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [place, setPlace] = useState('');
    const [date, setDate] = useState(new Date());
    const [photo, setPhoto] = useState('');

    const onSubmit = e => {
        e.preventDefault();

        // const newEvent = {
        //     title: title,
        //     description: description,
        //     photo: photo,
        //     user: '64457d49c6a3b8ef0849ec14'
        // }
        // eventServices.postEvents(newEvent);

        setTitle('');
        setDescription('');
        setPlace('');
        setDate(new Date());
        setPhoto('');
        // getData();
    }

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch("https://events-80pg.onrender.com/api/categories");
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchCategories();
    }, []);

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col lg="6">
                    <Form onSubmit={onSubmit} className='my-3'>

                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text"
                                placeholder="Enter title"
                                id='text'
                                name='text'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Select aria-label="Default select example">
                                {categories.map((category, index) => (
                                    <option key={index} value={index + 1}>{category.title}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea"
                                rows={3}
                                placeholder="Enter description"
                                id='description'
                                name='description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Place</Form.Label>
                            <Form.Control type="text"
                                placeholder="Enter place"
                                id='text'
                                name='text'
                                value={place}
                                onChange={(e) => setPlace(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="duedate" className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date"
                                name="duedate"
                                placeholder="Due date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Photo</Form.Label>
                            <Form.Control type="text"
                                placeholder="Enter a photo"
                                id='photo'
                                name='photo'
                                value={photo}
                                onChange={(e) => setPhoto(e.target.value)} />
                        </Form.Group>

                        <Button variant="dark" type="submit">
                            Save
                        </Button>
                    </Form>
                </Col>
            </Row>

        </ Container>
    )
}

export default EventRegForm