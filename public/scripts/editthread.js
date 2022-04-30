const threadFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#thread-title').value.trim();
  const content = document.querySelector('#thread-content').value.trim();
  const thread_id = document.querySelector('.thread-form').dataset.id;

  if (title && content) {
    const response = await fetch(`/api/threads/${thread_id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to edit thread');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/threads/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete thread');
    }
  }
};

document
  .querySelector('.thread-form')
  .addEventListener('submit', threadFormHandler);

document
  .querySelector('.btn-delete')
  .addEventListener('click', delButtonHandler);
