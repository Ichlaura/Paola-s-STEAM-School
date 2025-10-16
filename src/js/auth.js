// auth.js
export function initAuth() {
  if (!localStorage.getItem('users')) {
    const users = [
      { id: 'u1', name: 'Demo', email: 'demo@example.com', password: 'demo' }
    ];
    localStorage.setItem('users', JSON.stringify(users));
  }
}
