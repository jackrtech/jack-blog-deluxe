import React, { useState } from 'react';
import axios from 'axios';

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/', {
                title,
                content,
            });
            setMessage('Post created successfully!');
            
            setTitle('');
            setContent('');
        } catch (error) {
            console.error('Error creating post:', error.response ? error.response.data : error.message);
            setMessage('Failed to create post.');
        }
    };

    return (
        <div>
            <h2>Create a New Blog Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">Create Post</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateBlog;
