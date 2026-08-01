import React from 'react';
import { Search, Bell, Plus } from 'lucide-react';
import './Header.css';

const Header = () => {
  return (
    <header className="header glass-panel">
      <div className="header-search">
        <Search className="search-icon" size={18} />
        <input 
          type="text" 
          className="search-input" 
          placeholder="Tìm kiếm công việc, dự án..." 
        />
      </div>
      
      <div className="header-actions">
        <button className="btn-icon">
          <Bell size={20} />
          <span className="notification-badge"></span>
        </button>
        <button className="btn-primary">
          <Plus size={18} />
          <span>Tạo mới</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
