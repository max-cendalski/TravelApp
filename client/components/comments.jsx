import React, { useState, useEffect } from 'react';

export default function Comments(props) {
  return (
    <div>
      <h2>Comments</h2>
      <ul className='comment-list'>
       {
        props.comments.map((comment, index) => {
          return <li className='comment-list-element' key={index + 1}><h4>{comment.username}</h4><p>{comment.content}</p> </li>;
        })
      }
      </ul>
      <button className='add-comment-button'>Add Comment</button>
    </div>
  );
}
