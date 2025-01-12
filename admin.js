// تسجيل الخروج
document.getElementById('logoutButton')?.addEventListener('click', function () {
    window.location.href = 'index.html';
});

// عرض المستخدمين
function loadUsers() {
    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(users => {
            const userList = document.getElementById('userList');
            userList.innerHTML = '';
            users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `${user.username} (${user.role})`;
                userList.appendChild(li);
            });
        });
}

// إضافة مستخدم
document.getElementById('addUserForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role })
    }).then(() => {
        loadUsers();
    });
});

// عرض الأخبار المعلقة
function loadPendingNews() {
    fetch('http://localhost:3000/news?status=pending')
        .then(response => response.json())
        .then(news => {
            const pendingNews = document.getElementById('pendingNews');
            pendingNews.innerHTML = '';
            news.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.title}: ${item.content}`;
                pendingNews.appendChild(li);
            });
        });
}

// تحميل البيانات عند فتح الصفحة
loadUsers();
loadPendingNews();