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
       props.loggedUser !== props.author && <button onClick={props.handleAddComment} className={props.addCommentButton}>{props.user}Add Comment</button>
      }
      <form onSubmit={props.handleCommentForm} className={props.commentForm}>
        <textarea className='comment-textarea' onChange={props.handleCommentTextarea}>
        </textarea>
        <button className='comment-submit-button'>Submit</button>
      </form>
    </div>
  );
}
