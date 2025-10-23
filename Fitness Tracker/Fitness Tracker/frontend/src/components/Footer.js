import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    // State for hover effects
    const [hoveredIcon, setHoveredIcon] = useState(null);

    const styles = {
        footer: {
            backgroundColor: '#000', // Exact same as navbar
            color: '#ffffff',
            padding: '40px 20px',
            fontFamily: 'Arial, sans-serif',
        },
        container: {
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
        },
        socialIcons: {
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px',
        },
        iconLink: {
            color: '#ffffff',
            margin: '0 15px',
            fontSize: '22px',
            transition: 'color 0.3s ease-in-out',
        },
        copyright: {
            marginTop: '20px',
            fontSize: '14px',
            color: '#a0a0a0',
        },
        names: {
            color: '#FFBF00', // Mustard color for names
            fontWeight: 'bold',
        }
    };

    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <div style={styles.socialIcons}>
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            ...styles.iconLink,
                            color: hoveredIcon === 'facebook' ? '#FFBF00' : '#ffffff'
                        }}
                        onMouseEnter={() => setHoveredIcon('facebook')}
                        onMouseLeave={() => setHoveredIcon(null)}
                    >
                        <FaFacebookF />
                    </a>
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            ...styles.iconLink,
                            color: hoveredIcon === 'twitter' ? '#FFBF00' : '#ffffff'
                        }}
                        onMouseEnter={() => setHoveredIcon('twitter')}
                        onMouseLeave={() => setHoveredIcon(null)}
                    >
                        <FaTwitter />
                    </a>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            ...styles.iconLink,
                            color: hoveredIcon === 'instagram' ? '#FFBF00' : '#ffffff'
                        }}
                        onMouseEnter={() => setHoveredIcon('instagram')}
                        onMouseLeave={() => setHoveredIcon(null)}
                    >
                        <FaInstagram />
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            ...styles.iconLink,
                            color: hoveredIcon === 'linkedin' ? '#FFBF00' : '#ffffff'
                        }}
                        onMouseEnter={() => setHoveredIcon('linkedin')}
                        onMouseLeave={() => setHoveredIcon(null)}
                    >
                        <FaLinkedinIn />
                    </a>
                </div>
                <p>Stay connected with us on social media for the latest updates.</p>
                <div style={styles.copyright}>
                    &copy; {new Date().getFullYear()} Fitness Tracker. All Rights Reserved.
                    <br />
                    Designed & Developed by <span style={styles.names}>Laiba, Maham, Samad, Adnan, Hamza</span>.
                </div>
            </div>
        </footer>
    );
};

export default Footer;