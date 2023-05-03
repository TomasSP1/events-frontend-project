import React, { useState, useEffect } from 'react';
// import categoriesService from '../services/CategoriesService';
import { Container, Col, Row } from "react-bootstrap";
import axios from 'axios';

// import eventServices from '../services/EventService'

import { Form, Button } from 'react-bootstrap';



const EventRegForm = ({ getEventsData }) => {
    const [categories, setCategories] = useState([]);

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [place, setPlace] = useState('');
    const [date, setDate] = useState(new Date());
    const [image, setImage] = useState('');

    const onSubmit = e => {
        e.preventDefault();


        //post events
        const postEvents = async (event) => {
            const userStr = localStorage.getItem("user");
            const userObj = JSON.parse(userStr);
            const { token } = userObj;
            try {
                const response = await axios.post(
                    "https://events-80pg.onrender.com/api/events",
                    event,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                return response;
            } catch (error) {
                console.error(error);
            }
        }


        const newEvent = {
            title: title,
            category: category,
            description: description,
            place: place,
            date: date,
            image: image,
        }
        postEvents(newEvent);
        console.log(newEvent)

        setTitle('');
        setCategory('');
        setDescription('');
        setPlace('');
        setDate(new Date());
        setImage('');
        console.log(getEventsData())
        getEventsData();
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
                    <h1 className='text-center'>Event registration form</h1>
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
                            <Form.Select aria-label="Default select example" value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Select a category</option>
                                {categories.map((category, index) => (
                                    <option key={index + 1} value={category.id}>{category.title}</option>
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
                                id='image'
                                name='image'
                                value={image}
                                onChange={(e) => setImage(e.target.value)} />
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