import React from "react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center"
             style={{
                 height: '100vh',
                 backgroundColor: '#f8f9fa'
             }}>
            <h1 style={{
                fontSize: '5rem',
                fontWeight: '700',
                marginBottom: '1rem',
                color: '#343a40'
            }}>404</h1>
            <h2 style={{
                fontSize: '2rem',
                fontWeight: '400',
                marginBottom: '2rem',
                color: '#6c757d'
            }}>PAGE NOT FOUND</h2>
            <Link to='/'
                  style={{
                      display: 'inline-block',
                      padding: '0.5rem 1.5rem',
                      fontSize: '1rem',
                      fontWeight: '400',
                      color: '#fff',
                      backgroundColor: '#343a40',
                      border: '1px solid #343a40',
                      borderRadius: '0.25rem',
                      textDecoration: 'none',
                      transition: 'all 0.2s'
                  }}>
                Back Home
            </Link>
        </div>
    );
}
