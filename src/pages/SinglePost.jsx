import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SinglePost = () => {
    const { id } = useParams(); // grab post id from the url
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/${id}`);
                setPost(response.data.data);
            } catch (error) {
                console.error('Error fetching the post:', error);
                setError('Failed to load post. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!post) return <div>No post found.</div>;

    return (
        <div className="single-post">
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </div>
    );
};

export default SinglePost;
