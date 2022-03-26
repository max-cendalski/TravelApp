import React, { useState, useEffect } from 'react';

export default function Comments(props) {
  return (
    <div>
      <h1>comments</h1>
      <ul>
       {
        props.comments.map((comment, index) => {
          return <li className='comment-list' key={index + 1}>{comment.content} </li>;
        })
      }
      </ul>

    </div>
  );
}
