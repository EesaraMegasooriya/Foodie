import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const response = await axios.get(`/api/posts/${id}`);
                setPost(response.data);
            } catch (error) {
                console.error('Failed to fetch post details:', error);
            }
        };
        fetchPostDetails();
    }, [id]);

    return (
        <div>
            {post ? (
                <div>
                    <h2>{post.title}</h2>
                    <img src={post.mediaUrl} alt={post.title} />
                    {/* Display comments, reactions, etc. */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default PostDetail;
