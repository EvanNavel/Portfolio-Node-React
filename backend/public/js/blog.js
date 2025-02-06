// js/blog.js

document.addEventListener('DOMContentLoaded', () => {
    console.log("JavaScript is running");
  
    const postSquares = document.querySelectorAll('.post-square');
    if (postSquares.length === 0) {
      console.error("No .post-square elements found");
      return;
    }
  
    postSquares.forEach((square) => {
      square.addEventListener('click', () => {
        console.log("Square clicked:", square);
  
        // Remove 'selected' class from all squares
        postSquares.forEach((sq) => sq.classList.remove('selected'));
  
        // Add 'selected' class to clicked square
        square.classList.add('selected');
  
        // Get data attributes from the clicked post
        const postId = square.dataset.postId;
        const postTitle = square.dataset.title || 'Untitled Post';
        const postContent = square.dataset.content || 'No content available.';
        const postDate = square.dataset.date || 'Unknown Date';
  
        // Update the details box with content
        const detailsText = document.querySelector('.details-text');
        if (detailsText) {
          detailsText.textContent = postContent;
        } else {
          console.error("Could not find .details-text element");
        }
  
        // Update title and date bar
        const postTitleElement = document.querySelector('.post-title');
        const postDateElement = document.querySelector('.post-date');
          
        if (postTitleElement) {
          postTitleElement.textContent = postTitle;
        } else {
          console.error("Could not find .post-title element");
        }
  
        if (postDateElement) {
          postDateElement.textContent = `Posted on ${postDate}`;
        } else {
          console.error("Could not find .post-date element");
        }
      });
    });
  });
  