import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="Footer">
      <ul>
        <Link to="/">Home</Link>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSe00hFvasKPDvHBk9gJyAlmbFMHLRPibG4LI1YtAX9amAjISQ/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer">Contact</a>
      </ul>
    </footer>
  )
}

export default Footer;