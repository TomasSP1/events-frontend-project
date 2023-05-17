import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EventRegForm = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const eventId = queryParams.get('eventId');

    const [categories, setCategories] = useState([]);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [place, setPlace] = useState('');
    const [date, setDate] = useState('');
    const [image, setImage] = useState('');

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
      
        console.log('Submitting form:', title, category, description, place, date, image);
      
        const newEvent = {
          title,
          category_id: category,
          description,
          location: place,
          date: new Date(date).toISOString(), // Convert the date to ISO 8601 format
          image_url: image,
        };
      
        console.log('New event:', newEvent);
      
        try {
          const userStr = localStorage.getItem("user");
          const userObj = JSON.parse(userStr);
      
          if (userObj === null) {
            // Handle the case where the user is not logged in
            console.log("User not logged in");
            return;
          }
      
          const { token } = userObj;
      
          let response;
          if (eventId) {
            // Update an existing event
            response = await axios.put(
              `https://events-80pg.onrender.com/api/events/${eventId}`,
              newEvent,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          } else {
            // Create a new event
            response = await axios.post(
              "https://events-80pg.onrender.com/api/events",
              newEvent,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          }
      
          console.log('Response:', response.data);
      
          navigate('/my_events');
        } catch (error) {
          console.error(error);
        }
      };

    useEffect(() => {
        async function fetchEventDetails() {
            try {
                const eventProps = location.state?.eventData;
                if (eventProps) {
                    const { eventID, eventTitle, eventCategory, eventDescription, eventPlace, eventDate, eventImage } = eventProps;
                    setTitle(eventTitle);
                    setCategory(eventCategory);
                    setDescription(eventDescription);
                    setPlace(eventPlace);
                    setDate(eventDate);
                    setImage(eventImage);
                } else if (eventId) {
                    const response = await axios.get(
                        `https://events-80pg.onrender.com/api/events/${eventId}`
                    );
                    const eventData = response.data;
                    setTitle(eventData.title);
                    setCategory(eventData.category);
                    setDescription(eventData.description);
                    setPlace(eventData.place);
                    setDate(eventData.date);
                    setImage(eventData.image);
                }
            } catch (error) {
                console.error(error);
            }
        }

        if (eventId || location.state?.eventData) {
            fetchEventDetails();
        }
    }, [eventId, location.state?.eventData]);




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
            <Row className="justify-content-md-center my-5">
                <Col lg="6">
                    <h1 className='text-center'>Event registration form</h1>
                    <Form onSubmit={onSubmit} className='my-3'>

                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
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