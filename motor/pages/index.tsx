import { useState,useEffect } from "react";
const LandingPage: React.FC = () => {
  return (

    
    <div className="landing-page">
      <div className="hero">

      <nav className="navigation">
      <ul className="nav-links">
        <li>
          <a href="/" className="nav-link">Beranda</a>
        </li>
        <li>
          <a href="/form" className="nav-link">Edit Stock</a>
        </li>
      </ul>
    </nav>

        <h1>Anver Garage</h1>
        <p>only for admins</p>
      </div>
      <center><div className="fotobawah">
      <img src="./logo.png" alt="Deskripsi Foto" width="300" height="250"/>
      <p>Murah tapi bukan murahan</p>
    </div></center>
    <div className="help-center">
      <p>Untuk bantuan dan pertanyaan, silakan hubungi kami melalui:</p>
      <ul>
        <li>Email: help@garage-anver.com</li>
        <li>Telepon: 021-434-5352</li>
        <li>WhatsApp: <a href="https://wa.me/">Kirim Pesan</a></li>
      </ul>
    </div>


    
      <div className="footer">
        <p>&copy; 2023 ANVERGARAGE.</p>
      </div>
    </div>
  );
};

export default LandingPage;