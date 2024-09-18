// components/SinglePost.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import DeleteButton from '../components/DeleteButton'; 
import { Container, Button, Spinner, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const SinglePost = () => {
    const { id } = useParams(); // Grab post id from the URL
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook for navigation

    const fetchPost = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:5000/${id}`);
            setPost(response.data.data);
        } catch (error) {
            console.error('Error fetching the post:', error);
            setError('Failed to load post. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchPost();
    }, [fetchPost]);

    const handleDelete = () => {
        navigate('/'); 
    };

    if (loading) return <div><Spinner animation="border" /> Loading...</div>;
    if (error) return <Alert variant="danger">{error}</Alert>;
    if (!post) return <div>No post found.</div>;

    return (
        <Container className="my-4">
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <DeleteButton postId={post.id} onDelete={handleDelete} />
        </Container>
    );
};

export default SinglePost;
