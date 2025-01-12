// تسجيل الدخول
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(users => {
            const user = users.find(u => u.username === username && u.password === password);
            if (user) {
                if (user.role === 'admin') {
                    window.location.href = 'admin.html';
                } else {
                    window.location.href = 'publish.html';
                }
            } else {
                document.getElementById('errorMessage').textContent = 'اسم المستخدم أو كلمة المرور غير صحيحة';
            }
        });
});

// إنشاء حساب
document.getElementById('registerForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;

    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role: 'user' })
    }).then(() => {
        window.location.href = 'login.html';
    });
});