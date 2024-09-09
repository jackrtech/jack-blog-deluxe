import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './BlogList.css'; 

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
                    //sort by descending order
                    const sortedBlogs = allBlogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                    //remove duplicate IDs
                    const uniqueBlogs = Array.from(new Set(sortedBlogs.map(blog => blog.id)))
                                            .map(id => sortedBlogs.find(blog => blog.id === id));
                    return uniqueBlogs;
                });
                setCurrentPage(prevPage => prevPage + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching blogs:', error);
            setError('Failed to load blogs. Please try again later.');
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    }, [loading, hasMore, currentPage]);
    

    const handleScroll = useCallback(() => {
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50 && !loading) {
            fetchBlogs();
        }
    }, [fetchBlogs, loading]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        fetchBlogs(); //first fetch here

        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll, fetchBlogs]);

    return (
        <div className="blog-list">
            {blogs.map(blog => (
                <div key={blog.id} className="blog-post">
                    <h2>{blog.title}</h2>
                    <p>{blog.content}</p>
                </div>
            ))}
            {loading && <div className="loading">Loading...</div>}
            {error && <div className="error">{error}</div>}
            {!hasMore && !loading && <div className="end-of-content">---- END OF CONTENT ----</div>}
        </div>
    );
};

export default BlogList;
