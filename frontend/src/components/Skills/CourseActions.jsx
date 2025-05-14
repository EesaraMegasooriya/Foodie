import React from 'react';
import { Button } from 'react-bootstrap';
import { FaHeart, FaRegHeart, FaThumbsUp, FaRegThumbsUp } from 'react-icons/fa';

const CourseActions = ({ 
  courseId, 
  isFavorite, 
  isLiked, 
  likesCount, 
  onToggleFavorite, 
  onToggleLike 
}) => {
  return (
    <div className="d-flex gap-2">
      <Button 
        variant={isFavorite ? "danger" : "outline-danger"} 
        onClick={() => onToggleFavorite(courseId)}
        size="sm"
        title="Favorite"
      >
        {isFavorite ? <FaHeart /> : <FaRegHeart />}
      </Button>
      
      <Button 
        variant={isLiked ? "primary" : "outline-primary"} 
        onClick={() => onToggleLike(courseId)}
        size="sm"
        title="Like"
      >
        {isLiked ? <FaThumbsUp /> : <FaRegThumbsUp />}
        <span className="ms-1">{likesCount || 0}</span>
      </Button>
    </div>
  );
};

export default CourseActions;