// components/BlogList.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import DeleteButton from './DeleteButton'; 

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(null);

    const fetchBlogs = useCallback(async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/?page=${currentPage}&limit=10`);
            const data = response.data;

            if (data.data.length > 0) {
                setBlogs(prevBlogs => {
                    const allBlogs = [...prevBlogs, ...data.data];
                    const sortedBlogs = allBlogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Sort by timestamp in descending order
                    const uniqueBlogs = Array.from(new Set(sortedBlogs.map(blog => blog.id))) // Remove duplicate posts by ID
                        .map(id => sortedBlogs.find(blog => blog.id === id));
                    return uniqueBlogs;
                });
                setCurrentPage(prevPage => prevPage + 1);
            } else {
                setHasMore(false); // No more posts available to load
            }
        } catch (error) {
            console.error('Error fetching blogs:', error);
            setError('Failed to load blogs. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, [loading, hasMore, currentPage]);

    const handleScroll = useCallback(() => {
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100 && !loading) {
            fetchBlogs();
        }
    }, [fetchBlogs, loading]);

    useEffect(() => {
        fetchBlogs(); // Initial fetch
    }, [fetchBlogs]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    const handleDelete = async (id) => {
        try {
            console.log('response')
            const response = await axios.delete(`http://localhost:5000/${id}`); 
            console.log('after axios')
            if(response.status === 200) {
                setBlogs(blogs.filter(blog => blog.id !== id)); // Reset the Blogs array to remove the deleted blog
            }
        } catch (error) {
            console.error('Error deleting blog:', error.message);
            setError('Failed to delete blog. Please try again later.');
        }
    };

    return (
        <Container className="my-4">
            <Row>
                {blogs.map(blog => (
                    <Col key={blog.id} md={4} className="mb-4">
                        <div className="blog-post border p-3 rounded">
                            <h2>
                                <Link to={`/${blog.id}`}>{blog.title}</Link>
                            </h2>
                            <p>{blog.content.substring(0, 100)}...</p>
                            <DeleteButton postId={blog.id} onDelete={() => handleDelete(blog.id)} />
                        </div>
                    </Col>
                ))}
            </Row>
            {loading && <div className="text-center"><Spinner animation="border" /> Loading...</div>}
            {error && <Alert variant="danger" className="text-center">{error}</Alert>}
            {!hasMore && !loading && <div className="text-center">---- END OF CONTENT ----</div>}
        </Container>
    );
};

export default BlogList;
