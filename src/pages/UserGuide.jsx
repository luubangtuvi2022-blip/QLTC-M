import React from 'react';
import { BookOpen, Target, CheckSquare, Calendar, History, BarChart2, ShieldCheck, Download } from 'lucide-react';
import './UserGuide.css';

const UserGuide = () => {
  return (
    <div className="page-container fade-in user-guide-page">
      <div className="page-header">
        <h2>Hướng dẫn sử dụng phần mềm</h2>
        <p className="subtitle">Tài liệu tham khảo để làm chủ hệ thống Quản lý công việc</p>
      </div>

      <div className="guide-content">
        <section className="guide-section card">
          <div className="section-header">
            <div className="icon-wrapper bg-primary-light">
              <BookOpen size={24} className="text-primary" />
            </div>
            <h3>1. Giới thiệu chung</h3>
          </div>
          <div className="section-body">
            <p><strong>TaskMaster</strong> là phần mềm quản lý công việc và dự án cá nhân được thiết kế theo phương pháp khoa học nhằm tối ưu hóa năng suất làm việc (Productivity). Ứng dụng hỗ trợ đa nền tảng (hoạt động mượt mà trên cả máy tính và điện thoại di động).</p>
            <p>Tác giả phần mềm: <strong>Man Nguyen</strong></p>
          </div>
        </section>

        <section className="guide-section card">
          <div className="section-header">
            <div className="icon-wrapper bg-success-light">
              <ShieldCheck size={24} className="text-success" />
            </div>
            <h3>2. Bảo mật & Tài khoản</h3>
          </div>
          <div className="section-body">
            <ul>
              <li><strong>Đăng ký/Đăng nhập:</strong> Hệ thống yêu cầu mỗi người dùng phải có tài khoản riêng biệt (Sử dụng Email & Mật khẩu) được xác thực qua Firebase.</li>
              <li><strong>Dữ liệu cá nhân:</strong> Dữ liệu của bạn (Dự án, Công việc, Lịch sử) được mã hóa và bảo mật hoàn toàn. Không ai có thể truy cập dữ liệu của bạn ngoài chính bạn.</li>
            </ul>
          </div>
        </section>

        <section className="guide-section card">
          <div className="section-header">
            <div className="icon-wrapper bg-warning-light">
              <Target size={24} className="text-warning" />
            </div>
            <h3>3. Quản lý Dự án (Projects)</h3>
          </div>
          <div className="section-body">
            <p>Dự án là nơi tập hợp các công việc có chung một mục tiêu hoặc hạng mục lớn.</p>
            <ul>
              <li>Vào mục <strong>Dự án</strong> trên menu bên trái.</li>
              <li>Nhấn <strong>Thêm dự án</strong>, nhập Tên dự án, Mô tả và chọn Màu sắc nhận diện.</li>
              <li>Màu sắc của dự án sẽ được dùng để tô sáng các công việc thuộc dự án đó trên Lịch và Biểu đồ.</li>
            </ul>
          </div>
        </section>

        <section className="guide-section card">
          <div className="section-header">
            <div className="icon-wrapper bg-info-light">
              <CheckSquare size={24} className="text-info" />
            </div>
            <h3>4. Quản lý Công việc & Bảng Kanban</h3>
          </div>
          <div className="section-body">
            <p>Bạn có thể theo dõi công việc qua 2 chế độ: <strong>Danh sách</strong> (List) và <strong>Bảng Kanban</strong> (Kéo thả).</p>
            <ul>
              <li><strong>Tạo công việc:</strong> Nhấn nút "Tạo mới" (Dấu +) ở góc trên bên phải màn hình. Điền đầy đủ thông tin (Tên, Mô tả, Dự án, Hạn chót, Trạng thái).</li>
              <li><strong>Trạng thái công việc:</strong> Có 4 trạng thái khoa học: <em>Chưa bắt đầu, Đang làm, Chờ duyệt, Hoàn thành</em>.</li>
              <li><strong>Bảng Kanban:</strong> Tại đây, bạn có thể <strong>Kéo & Thả</strong> (Drag & Drop) thẻ công việc từ cột này sang cột khác để tự động chuyển trạng thái vô cùng trực quan.</li>
            </ul>
          </div>
        </section>

        <section className="guide-section card">
          <div className="section-header">
            <div className="icon-wrapper bg-danger-light">
              <Calendar size={24} className="text-danger" />
            </div>
            <h3>5. Lịch làm việc (Calendar)</h3>
          </div>
          <div className="section-body">
            <p>Cung cấp cái nhìn toàn cảnh về lịch trình của bạn theo Tháng, Tuần hoặc Ngày.</p>
            <ul>
              <li>Công việc sẽ hiển thị màu nền trắng, viền màu dựa theo <strong>Màu sắc của Dự án</strong> mà bạn đã chọn, giúp bạn phân biệt dễ dàng.</li>
              <li>Nhấp đúp chuột hoặc chạm vào bất kỳ ô trống nào trên lịch để <strong>tạo nhanh công việc</strong> cho ngày hôm đó.</li>
              <li>Nhấp vào một công việc đã có trên lịch để xem chi tiết và chỉnh sửa.</li>
            </ul>
          </div>
        </section>

        <section className="guide-section card">
          <div className="section-header">
            <div className="icon-wrapper bg-purple-light">
              <BarChart2 size={24} className="text-purple" />
            </div>
            <h3>6. Tổng quan & Thống kê (Dashboard)</h3>
          </div>
          <div className="section-body">
            <p>Trang Tổng quan (Dashboard) tự động tính toán hiệu suất của bạn:</p>
            <ul>
              <li><strong>Thống kê nhanh:</strong> Số liệu tổng công việc theo từng trạng thái.</li>
              <li><strong>Biểu đồ Phân bổ:</strong> Cho bạn biết tỷ lệ phần trăm các công việc đã hoàn thành so với chưa bắt đầu.</li>
              <li><strong>Biểu đồ Dự án:</strong> Biểu đồ phân lớp (Stacked Bar Chart) trực quan hóa tiến độ của từng dự án cụ thể. Cột đậm thể hiện công việc <em>Đã xong</em>, cột nhạt là <em>Chưa xong</em>. Bạn có thể rê chuột vào để xem tỷ lệ %.</li>
            </ul>
          </div>
        </section>

        <section className="guide-section card">
          <div className="section-header">
            <div className="icon-wrapper bg-gray-light">
              <Download size={24} className="text-gray" />
            </div>
            <h3>7. Lịch sử & Xuất Dữ Liệu</h3>
          </div>
          <div className="section-body">
            <ul>
              <li><strong>Lịch sử hoạt động:</strong> Mọi thao tác (Thêm, Sửa, Xóa, Chuyển trạng thái) đều được hệ thống ghi nhận lại theo thời gian thực tại mục Lịch sử.</li>
              <li><strong>Xuất Excel:</strong> Bạn có thể xuất toàn bộ danh sách công việc ra file Excel (.xls) có kẻ bảng chuẩn đẹp, với đầy đủ các cột STT, Tên, Trạng thái, Ghi chú để báo cáo.</li>
              <li><strong>Sao lưu dữ liệu:</strong> Xuất định dạng JSON giúp bạn lưu trữ toàn bộ cơ sở dữ liệu làm bản sao lưu an toàn.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserGuide;
