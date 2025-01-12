document.getElementById('publishForm')?.addEventListener('submit', async function (e) {
    e.preventDefault();
    const title = document.getElementById('newsTitle').value;
    const content = tinymce.get('newsContent').getContent();
    const mediaFile = document.getElementById('newsMedia').files[0];

    // رفع الوسائط (اختياري)
    let mediaUrl = '';
    if (mediaFile) {
        const formData = new FormData();
        formData.append('file', mediaFile);
        formData.append('upload_preset', 'your-upload-preset'); // Cloudinary إعداد مسبق
        const response = await fetch('https://api.cloudinary.com/v1_1/your-cloud-name/upload', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        mediaUrl = data.secure_url;
    }

    // إرسال البيانات إلى الخادم
    await fetch('https://your-backend-api.com/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title,
            content,
            media: mediaUrl,
            status: 'pending',
            author: 'user1'
        })
    });

    alert('تم إرسال الخبر للمراجعة.');
    document.getElementById('publishForm').reset();
});
