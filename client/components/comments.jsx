import React from 'react';

export default function Comments(props) {
  return (
    <div>
      <h2>Comments</h2>
      <ul className="comments-list">
        {props.comments.map((comment) => {
          return (
            <li className="comment-list-element" key={comment.commentId}>
              <h4>@{comment.username}</h4>
              <section className="comment-user-container">
                {comment.username === props.loggedUser && (
                  <section onClick={()=> props.handleDeleteComment(comment.commentId)} className="comment-trash-container">
                    <i className="fa-solid fa-trash"></i>
                  </section>
                )}
              </section>
              <p>{comment.content}</p>
            </li>
          );
        })}
      </ul>
      {props.loggedUser !== props.author && (
        <button
          onClick={props.handleAddCommentButton}
          className={props.addCommentButton}
        >
          Add Comment
        </button>
      )}

      <form onSubmit={props.handleCommentForm} className={props.commentForm}>
        <textarea
          className="comment-textarea"
          onChange={props.handleCommentTextarea}
          value={props.commentValue}
        ></textarea>
        <button className="app-button background-orange float-right">
          Submit
        </button>
        <button
          onClick={props.handleCancelComment}
          className="app-button background-red"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
