# NamGT - Personal Portfolio 🚀

Đây là trang web cá nhân (Portfolio) của **NamGT**, được thiết kế theo phong cách Hacker/Dark mode hiện đại, với hiệu ứng động mượt mà và hỗ trợ đa ngôn ngữ.

## ✨ Tính năng nổi bật

- **Giao diện Hacker Dark Mode**: Tông màu tối kết hợp với các hiệu ứng `tsParticles` nền động và hiệu ứng gõ chữ (Typewriter).
- **Đa ngôn ngữ (i18n)**: Hỗ trợ chuyển đổi mượt mà giữa 3 ngôn ngữ: Tiếng Việt, Tiếng Anh và Tiếng Nhật mà không cần tải lại trang.
- **Trạng thái Discord trực tiếp (Lanyard)**: Tích hợp API Lanyard để hiển thị trạng thái hoạt động thực tế trên Discord (Online, Đang code, Đang nghe Spotify,...).
- **Sổ Lưu Bút (Guestbook)**: Tích hợp hệ thống bình luận bằng GitHub Discussions thông qua **Giscus**.
- **Trình phát nhạc nền**: Tích hợp nhạc nền tự động phát với trình trực quan hóa sóng âm thanh (Audio Visualizer) phản hồi theo điệu nhạc.
- **Tuỳ biến màu sắc**: Hỗ trợ đổi theme màu chủ đạo (Tím Violet, Xanh Hacker, Đỏ Sith) trực tiếp trên giao diện.
- **Theo dõi thông tin truy cập**: Tự động hiển thị thời gian thực, địa chỉ IP (qua API `ipify`), hệ điều hành và trình duyệt của người truy cập ở phần chân trang.

## 🛠 Công nghệ sử dụng

- **HTML5 & CSS3**
- **Tailwind CSS** (via CDN) - Tiện lợi cho việc style nhanh gọn.
- **Vanilla Javascript (ES6+)** - Xử lý toàn bộ logic, không phụ thuộc framework nặng.
- **tsParticles** - Tạo hiệu ứng hạt bay lơ lửng ở background.
- **FontAwesome** - Thư viện icon.

## 🚀 Cài đặt & Sử dụng

1. **Clone repository này về máy:**
   ```bash
   git clone https://github.com/namgtitm/namgtitm.github.io.git
   ```
2. **Chạy trực tiếp:**
   Bạn chỉ cần mở file `index.html` (hoặc `main.html`) bằng bất kỳ trình duyệt nào (Chrome, Edge, Safari,...).
3. **Chạy với Live Server (Khuyên dùng):**
   Mở thư mục trong VS Code và sử dụng extension **Live Server** để có trải nghiệm tốt nhất (đặc biệt cần thiết nếu muốn phát nhạc tự động mà không bị trình duyệt chặn).

## 💬 Hướng dẫn cấu hình Sổ Lưu Bút (Giscus)

Hệ thống bình luận sử dụng Giscus (kết nối với GitHub Discussions). Nếu bạn fork repo này, bạn cần tự cấu hình lại Giscus:
1. Đảm bảo kho chứa của bạn là **Public** và đã bật tính năng **Discussions** trong phần `Settings`.
2. Truy cập [Giscus App](https://giscus.app/) và cài đặt Giscus cho kho chứa của bạn.
3. Thay thế đoạn thẻ `<script src="https://giscus.app/client.js"...>` trong file `index.html` (dòng ~480) bằng đoạn mã Giscus cấp cho bạn.

## 📄 Bản quyền

Dự án này được phát triển và thiết kế bởi **NamGT**. Mọi sao chép vui lòng để lại nguồn gốc tác giả.

---

https://cdn.discordapp.com/attachments/1515654020017029160/1520297804524687470/Messenger_creation_2CFFCC16-A54E-4F0D-8AED-DF7029796C71.jpg?ex=6a40af2a&is=6a3f5daa&hm=31dfd264455af82953bbe9c0dd34698a56003c2394d830e26b0d0c2a42fa9883&