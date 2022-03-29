import React from 'react';

export default function Comments(props) {
  return (
    <div className='column-width90'>
      <h2 className='comments-header'>Comments</h2>
      <ul className='comments-list'>
       {
        props.comments.map((comment, index) => {
          return <li className='comment-list-element' key={index + 1}><h4>@{comment.username}</h4><p>{comment.content}</p> </li>;
        })
      }
      </ul>
      {
       props.loggedUser !== props.author && <button onClick={props.handleAddComment} className='add-comment-button float-right'>{props.user}Add Comment</button>
      }
      <form onSubmit={props.handleCommentForm} className='comment-form'>
        <textarea className='comment-textarea'>
        </textarea>
        <button>Submit</button>
      </form>
    </div>
  );
}
