import React, { useState, useEffect, useCallback } from 'react';
import './BlogList.css'; // Custom styles

const BlogList = () => {

    const [blogs, setBlogs] = useState([]); // state to store the fetched blogs in an array
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true); // state to check if more blogs are available
    const [currentPage, setCurrentPage] = useState(1); 


    const exampleBlogs = [
        { id: 1, title: 'Blog Post 1', content: 'This is the content of the first blog post.' },
        { id: 2, title: 'Blog Post 2', content: 'This is the content of the second blog post.' },
        { id: 3, title: 'Blog Post 3', content: 'This is the content of the third blog post.' },
        { id: 4, title: 'Blog Post 4', content: 'This is the content of the fourth blog post.' },
        { id: 5, title: 'Blog Post 5', content: 'This is the content of the fifth blog post.' },
        { id: 6, title: 'Blog Post 6', content: 'This is the content of the sixth blog post.' },
        { id: 7, title: 'Blog Post 7', content: 'This is the content of the seventh blog post.' },
        { id: 8, title: 'Blog Post 8', content: 'This is the content of the eighth blog post.' },
        { id: 9, title: 'Blog Post 9', content: 'This is the content of the ninth blog post.' },
        { id: 10, title: 'Blog Post 10', content: 'This is the content of the tenth blog post.' },
        { id: 11, title: 'Blog Post 11', content: 'This is the content of the eleventh blog post.' },
        { id: 12, title: 'Blog Post 12', content: 'This is the content of the twelfth blog post.' },
        { id: 13, title: 'Blog Post 13', content: 'This is the content of the thirteenth blog post.' },
        { id: 14, title: 'Blog Post 14', content: 'This is the content of the fourteenth blog post.' },
        { id: 15, title: 'Blog Post 15', content: 'This is the content of the fifteenth blog post.' },
        { id: 16, title: 'Blog Post 16', content: 'This is the content of the sixteenth blog post.' },
    ];

    // Function to fetch more blogs
    const fetchBlogs = useCallback(() => {
        if (loading || !hasMore) return;
        setLoading(true);

        // Simulating the API call with hardcoded example blogs
        setTimeout(() => {

            const blogsPerPage = 4; 
            const startIndex = (currentPage - 1) * blogsPerPage;
            const endIndex = startIndex + blogsPerPage;

            const newBlogs = exampleBlogs.slice(startIndex, endIndex);

            if (newBlogs.length > 0) {
                setBlogs(prevBlogs => [...prevBlogs, ...newBlogs]);
                setCurrentPage(prevPage => prevPage + 1);
            } else {
                setHasMore(false);
            }

            setLoading(false);
        }, 1000);
    }, [loading, hasMore, currentPage]);


    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
        fetchBlogs();
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        fetchBlogs(); //initial fetch of the blogs + event listener for the scroll

        return () => window.removeEventListener('scroll', handleScroll);
    }, [fetchBlogs]);

    return (
        <div className="blog-list">
            {blogs.map(blog => (
                <div key={blog.id} className="blog-post">
                    <h2>{blog.title}</h2>
                    <p>{blog.content}</p>
                </div>
            ))}
            {loading && <div className="loading">Loading...</div>}
            {!hasMore && !loading && <div className="end-of-content">---- END OF CONTENT ----</div>}
        </div>
    );
};

export default BlogList;
