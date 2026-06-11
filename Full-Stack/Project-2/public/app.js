const API_URL = '/api/feedback';

const form = document.getElementById('feedbackForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');
const feedbackList = document.getElementById('feedbackList');
const loadBtn = document.getElementById('loadBtn');

function showFieldError(id, msg) {
  document.getElementById(id).textContent = msg;
}

function clearFieldErrors() {
  ['nameError', 'emailError', 'messageError'].forEach(id => {
    document.getElementById(id).textContent = '';
  });
  [nameInput, emailInput, messageInput].forEach(el => el.classList.remove('invalid'));
}

function setStatus(msg, type) {
  formStatus.textContent = msg;
  formStatus.className = 'form-status ' + type;
}

function clearStatus() {
  formStatus.textContent = '';
  formStatus.className = 'form-status';
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearFieldErrors();
  clearStatus();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  let hasError = false;

  if (!name) {
    showFieldError('nameError', 'Name is required.');
    nameInput.classList.add('invalid');
    hasError = true;
  }

  if (!email) {
    showFieldError('emailError', 'Email is required.');
    emailInput.classList.add('invalid');
    hasError = true;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showFieldError('emailError', 'Enter a valid email address.');
    emailInput.classList.add('invalid');
    hasError = true;
  }

  if (!message) {
    showFieldError('messageError', 'Message is required.');
    messageInput.classList.add('invalid');
    hasError = true;
  }

  if (hasError) return;

  submitBtn.disabled = true;
  submitBtn.querySelector('.btn-text').textContent = 'Sending...';

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });

    const data = await res.json();

    if (res.ok && data.success) {
      setStatus('✓ ' + data.message, 'success');
      form.reset();
    } else {
      setStatus(data.message || 'Something went wrong.', 'error');
    }
  } catch {
    setStatus('Could not reach the server. Please try again.', 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.querySelector('.btn-text').textContent = 'Send Feedback';
  }
});

loadBtn.addEventListener('click', async () => {
  feedbackList.innerHTML = '<div class="loading-state">Loading feedback...</div>';

  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    if (!data.length) {
      feedbackList.innerHTML = '<div class="empty-state"><p>No feedback submitted yet. Be the first!</p></div>';
      return;
    }

    feedbackList.innerHTML = data
      .slice()
      .reverse()
      .map(fb => `
        <div class="feedback-card">
          <div class="card-meta">
            <div>
              <span class="card-name">${escapeHtml(fb.name)}</span>
              <span class="card-email"> &mdash; ${escapeHtml(fb.email)}</span>
            </div>
            <span class="card-id">#${fb.id}</span>
          </div>
          <p class="card-message">${escapeHtml(fb.message)}</p>
        </div>
      `)
      .join('');
  } catch {
    feedbackList.innerHTML = '<div class="empty-state"><p>Failed to load feedback. Is the server running?</p></div>';
  }
});

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
