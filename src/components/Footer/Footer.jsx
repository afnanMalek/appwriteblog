import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <footer className="py-8 bg-gray-800 text-white">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <div className="mb-4">
            <Logo width="100px" />
          </div>
          <p className="text-sm">
            &copy; Copyright 2023. All Rights Reserved by DevUI.
          </p>
        </div>
        <div className="w-full md:w-1/6">
          <h3 className="uppercase font-semibold text-gray-400 mb-4">Company</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-gray-300">Features</Link></li>
            <li><Link to="/" className="hover:text-gray-300">Pricing</Link></li>
            <li><Link to="/" className="hover:text-gray-300">Affiliate Program</Link></li>
            <li><Link to="/" className="hover:text-gray-300">Press Kit</Link></li>
          </ul>
        </div>
        <div className="w-full md:w-1/6">
          <h3 className="uppercase font-semibold text-gray-400 mb-4">Support</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-gray-300">Account</Link></li>
            <li><Link to="/" className="hover:text-gray-300">Help</Link></li>
            <li><Link to="/" className="hover:text-gray-300">Contact Us</Link></li>
            <li><Link to="/" className="hover:text-gray-300">Customer Support</Link></li>
          </ul>
        </div>
        <div className="w-full md:w-1/6">
          <h3 className="uppercase font-semibold text-gray-400 mb-4">Legals</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-gray-300">Terms & Conditions</Link></li>
            <li><Link to="/" className="hover:text-gray-300">Privacy Policy</Link></li>
            <li><Link to="/" className="hover:text-gray-300">Licensing</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer;

