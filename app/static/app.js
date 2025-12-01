// Small helper JS for client-side fetches and UI
function getTokenFromCookie(){
  const m = document.cookie.split('; ').find(r=>r.startsWith('access_token='));
  return m?.split('=')[1] || null;
}

async function apiFetch(path, opts={}){
  const token = getTokenFromCookie();
  opts.headers = opts.headers || {};
  if(token) opts.headers['Authorization'] = 'Bearer ' + token;
  opts.credentials = 'include';
  const resp = await fetch(path, opts);
  const contentType = resp.headers.get('content-type') || '';
  let body = null;
  if(contentType.includes('application/json')) body = await resp.json();
  else body = await resp.text();
  return {status: resp.status, body};
}

// registration helper called from the login/register page
async function registerUser(form){
  const username = form.username.value.trim();
  const password = form.password.value;
  const full_name = form.full_name.value || '';
  const role = form.role.value || 'student';
  const out = document.getElementById('register-result');
  out.innerHTML = '';

  // Client-side validation
  const errors = [];
  if(!username || username.length < 3) errors.push('Username must be at least 3 characters');
  if(!password || password.length < 8) errors.push('Password must be at least 8 characters');
  if(password && !(/[0-9]/.test(password) && /[A-Za-z]/.test(password))) errors.push('Password must contain letters and numbers');
  if(errors.length){
    out.innerHTML = '<div class="message error">' + errors.join('<br>') + '</div>';
    return false;
  }

  // disable submit button if present
  const submitBtn = form.querySelector('button[type=submit]');
  if(submitBtn) submitBtn.disabled = true;

  try{
    const resp = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({username,password,full_name,role})
    });
    const data = await resp.json().catch(()=>null);
    if(resp.status >= 400){
      const msg = data ? (data.detail || JSON.stringify(data)) : 'Registration failed';
      out.innerHTML = '<div class="message error">' + msg + '</div>';
      if(submitBtn) submitBtn.disabled = false;
    } else {
      out.innerHTML = '<div class="message success">Registered successfully — redirecting to login...</div>';
      // after short delay redirect to /login for nicer flow
      setTimeout(()=>{ window.location.href = '/login'; }, 1400);
    }
  }catch(e){
    out.innerHTML = '<div class="message error">Network error</div>';
    if(submitBtn) submitBtn.disabled = false;
  }
  return false;
}

function showTab(id){
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p=>p.style.display='none');
  document.getElementById(id).classList.add('active');
  const panel = id === 'login-tab' ? 'login-panel' : 'register-panel';
  document.getElementById(panel).style.display = 'block';
}

// Catalog rendering helper
function renderBooksInto(targetId, books){
  const t = document.getElementById(targetId);
  if(!books || books.length === 0){ t.innerText = 'No books found'; return; }
  let html = '<table class="table"><thead><tr><th>ID</th><th>Title</th><th>Author</th><th>ISBN</th><th>Available</th></tr></thead><tbody>';
  for(const b of books){
    html += `<tr><td>${b.id}</td><td>${b.title}</td><td>${b.author || ''}</td><td>${b.isbn || ''}</td><td>${b.available || 0}</td></tr>`;
  }
  html += '</tbody></table>';
  t.innerHTML = html;
}

async function searchBooks(){
  const q = document.getElementById('q').value || '';
  const r = await apiFetch('/api/books?q=' + encodeURIComponent(q));
  if(r.status === 200 && Array.isArray(r.body)) renderBooksInto('results', r.body);
  else document.getElementById('results').innerText = JSON.stringify(r.body || r, null, 2);
}

async function borrowBook(){
  const bookId = document.getElementById('book_id').value;
  const resDiv = document.getElementById('borrow-result');
  resDiv.innerText = '';
  const r = await apiFetch('/api/borrows', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({book_id: bookId})});
  if(r.status >= 400) resDiv.innerHTML = '<div class="message error">' + JSON.stringify(r.body) + '</div>';
  else resDiv.innerHTML = '<div class="message success">' + JSON.stringify(r.body) + '</div>';
}

window.addEventListener('DOMContentLoaded', ()=>{
  // default tab
  if(document.getElementById('login-tab')) showTab('login-tab');
});
