import React, { useState, useRef } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaBicycle, FaAppleAlt, FaDumbbell, FaHeartbeat, FaAngleRight, FaImage } from 'react-icons/fa';

// --- Styling Object ---
const styles = {
  // ... (Yahan par aapke purane styles jaise carousel, choose us, classes section ke styles rahenge)
  homeCarouselContainer: {
    width: '100vw',
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  carouselSlide: {
    position: 'relative',
    height: 'calc(100vh - 60px)',
    backgroundColor: '#000',
  },
  carouselImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'brightness(0.7)',
  },
  legendOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#fff',
    textAlign: 'center',
    width: '100%',
    padding: '20px',
    boxSizing: 'border-box',
  },
  welcomeText: {
    fontSize: '2.8rem',
    fontWeight: '600',
    color: '#FFBF00',
    textShadow: '2px 2px 6px rgba(0, 0, 0, 0.7)',
  },
  choseUsSection: {
    padding: '80px 20px 60px 20px',
    backgroundColor: '#1a1a1a',
    textAlign: 'center',
    width: '100vw',
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)',
    boxSizing: 'border-box',
  },
  sectionTitle: {
    marginBottom: '50px',
  },
  whyText: {
    fontSize: '1.2rem',
    color: '#FFBF00',
    textTransform: 'uppercase',
    letterSpacing: '2px',
  },
  limitsText: {
    fontSize: '2.5rem',
    color: '#fff',
    fontWeight: '700',
    marginTop: '10px',
  },
  csItemsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    flexWrap: 'wrap',
  },
  csItem: {
    width: '260px',
    textAlign: 'center',
  },
  iconCircle: {
    height: '130px',
    width: '130px',
    backgroundColor: '#2a2a2a',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 30px auto',
    transition: 'background-color 0.3s ease',
  },
  iconStyle: {
    fontSize: '50px',
    color: '#FFBF00',
    transition: 'color 0.3s ease',
  },
  csItemH4: {
    fontSize: '1.4rem',
    color: '#fff',
    fontWeight: '600',
    marginBottom: '15px',
  },
  csItemP: {
    fontSize: '1rem',
    color: '#c4c4c4',
    lineHeight: '1.6',
  },
  classesSection: {
    padding: '80px 20px',
    backgroundColor: '#000000',
    textAlign: 'center',
    width: '100vw',
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)',
    boxSizing: 'border-box',
  },
  classesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
  },
  classItem: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  classItemImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    transition: 'transform 0.4s ease',
  },
  classItemText: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: '30px 20px',
    background: 'linear-gradient(to top, rgba(0,0,0,0.95), transparent)',
    textAlign: 'left',
  },
  classItemSpan: {
    color: '#FFBF00',
    fontWeight: '600',
    textTransform: 'uppercase',
    fontSize: '0.9rem',
  },
  classItemH5: {
    color: '#fff',
    fontSize: '1.6rem',
    fontWeight: '600',
    marginTop: '5px',
  },
  classItemLink: {
    position: 'absolute',
    right: '20px',
    bottom: '30px',
    color: '#fff',
    fontSize: '1.5rem',
  },

  // "Banner Section" Styles
  bannerSection: {
    padding: '100px 0',
    backgroundImage: `url('https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2070&auto=format&fit=crop')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    textAlign: 'center',
    position: 'relative',
    color: '#fff',
    width: '100vw',
    left: '50%',
    transform: 'translateX(-50%)',
    boxSizing: 'border-box',
  },
  bannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  bannerTextContainer: {
    position: 'relative',
    zIndex: 1,
  },
  bannerTitle: {
    fontSize: '2.8rem',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  bannerTips: {
    fontSize: '1.2rem',
    color: '#c4c4c4',
    margin: '15px 0 30px 0',
  },
  appointmentButton: {
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: 'transparent',
    border: '2px solid #FFBF00', // Mustard outline
    padding: '14px 28px',
    textTransform: 'uppercase',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  // --- Gallery Section Styles ---
  gallerySection: {
    width: '100vw',
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)',
    boxSizing: 'border-box',
    backgroundColor: '#000',
    padding: '80px 0',
    textAlign: 'center',
  },
  galleryContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  },
  galleryItem: {
    position: 'relative',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '350px',
    cursor: 'pointer',
    overflow: 'hidden',
  },
  galleryOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'background-color .3s ease',
  },
  thumbIcon: {
    fontSize: '50px',
    color: '#fff',
    opacity: 0,
    transform: 'scale(0.8)',
    transition: 'all .3s ease',
  },
  // --- Testimonials Section Styles (Updated) ---
  testimonialsSection: {
    width: '100vw',
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#222222', // Lighter black
    padding: '80px 20px',
    boxSizing: 'border-box',
    textAlign: 'center',
  },
  testimonialCarousel: {
    maxWidth: '800px',
    margin: '0 auto',
    color: '#fff',
  },
  testimonialItem: {
    padding: '20px',
  },
  testimonialText: {
    fontSize: '1.1rem',
    fontStyle: 'italic',
    color: '#c4c4c4',
    lineHeight: '1.7',
    marginBottom: '30px',
  },
  testimonialAuthor: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  testimonialImage: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    marginRight: '20px',
    objectFit: 'cover',
  },
  testimonialName: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#fff',
    textAlign: 'left',
  },
  testimonialDesignation: {
    fontSize: '0.9rem',
    color: '#FFBF00',
    textAlign: 'left',
  },
};

// --- Reusable Components ---

const ChoiceItem = ({ icon, title, text }) => {
  const [isHovered, setIsHovered] = useState(false);
  const circleStyle = { ...styles.iconCircle, backgroundColor: isHovered ? '#FFBF00' : '#2a2a2a' };
  const iconStyle = { ...styles.iconStyle, color: isHovered ? '#fff' : '#FFBF00' };
  return (
    <div style={styles.csItem} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div style={circleStyle}>{React.cloneElement(icon, { style: iconStyle })}</div>
      <h4 style={styles.csItemH4}>{title}</h4>
      <p style={styles.csItemP}>{text}</p>
    </div>
  );
};

const ClassItem = ({ imgSrc, category, title, width }) => {
    const [isHovered, setIsHovered] = useState(false);
    const imgStyle = { ...styles.classItemImg, transform: isHovered ? 'scale(1.1)' : 'scale(1)' };
    const itemStyle = { ...styles.classItem, width: width || '32%' };
    return (
        <div style={itemStyle} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <img src={imgSrc} alt={title} style={imgStyle} />
            <div style={styles.classItemText}>
                <span style={styles.classItemSpan}>{category}</span>
                <h5 style={styles.classItemH5}>{title}</h5>
                <a href="#" style={styles.classItemLink}><FaAngleRight /></a>
            </div>
        </div>
    );
};

const AppointmentButton = ({ onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const buttonStyle = {
        ...styles.appointmentButton,
        backgroundColor: isHovered ? '#FFBF00' : 'transparent',
        color: isHovered ? '#000' : '#fff',
    };
    return (
        <button style={buttonStyle} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={onClick}>
            Appointment
        </button>
    );
};

const GalleryItem = ({ imgSrc, isWide }) => {
  const [isHovered, setIsHovered] = useState(false);

  const itemStyle = {
    ...styles.galleryItem,
    backgroundImage: `url(${imgSrc})`,
    width: isWide ? '50%' : '25%',
  };

  const overlayStyle = {
    ...styles.galleryOverlay,
    backgroundColor: 'rgba(0, 0, 0, 0)', // Always transparent
  };

  const iconStyle = {
    ...styles.thumbIcon,
    color: '#FFBF00', // Mustard icon color
    opacity: isHovered ? 1 : 0,
    transform: isHovered ? 'scale(1)' : 'scale(0.8)',
  };

  return (
    <div
      style={itemStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a href={imgSrc} className="image-popup" style={overlayStyle} target="_blank" rel="noopener noreferrer">
        <FaImage style={iconStyle} />
      </a>
    </div>
  );
};

// --- Testimonial Item Component (New) ---
const TestimonialItem = ({ name, designation, text, image }) => {
  return (
    <div style={styles.testimonialItem}>
      <p style={styles.testimonialText}>"{text}"</p>
      <div style={styles.testimonialAuthor}>
        <img src={image} alt={name} style={styles.testimonialImage} />
        <div>
          <h4 style={styles.testimonialName}>{name}</h4>
          <span style={styles.testimonialDesignation}>{designation}</span>
        </div>
      </div>
    </div>
  );
};

// --- Sample Data for Testimonials (New) ---
const testimonials = [
  { name: 'Jessica Page', designation: 'Client', text: 'The trainers here are amazing. They push you to your limits in the most encouraging way. I\'ve never felt stronger!', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop' },
  { name: 'Mike Smith', designation: 'Client', text: 'A great variety of classes and top-notch equipment. The community vibe is fantastic. Highly recommended!', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop' },
  { name: 'Sarah Lee', designation: 'Client', text: 'I love the nutrition plans they offer. It\'s not just about working out; it\'s a complete lifestyle change.', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop' },
  { name: 'David Chen', designation: 'Client', text: 'Clean facilities, friendly staff, and challenging workouts. What more could you ask for? Five stars!', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop' },
  { name: 'Emily White', designation: 'Client', text: 'The boxing classes are my favorite. A perfect way to de-stress after a long day at work.', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop' },
  { name: 'James Brown', designation: 'Client', text: 'I achieved my fitness goals faster than I ever thought possible, all thanks to the personalized training plan.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop' },
];


// --- Main Home Component ---
const Home = () => {
  const carouselRef = useRef(null);

  const scrollToCarousel = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* --- Carousel Section --- */}
      <div ref={carouselRef} style={styles.homeCarouselContainer}>
        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} interval={5000}>
          <div style={styles.carouselSlide}><img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop" alt="Welcome" style={styles.carouselImg} /><div style={styles.legendOverlay}><h1 style={styles.welcomeText}>Welcome To Fitness Tracker</h1></div></div>
          <div style={styles.carouselSlide}><img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop" alt="Motivation" style={styles.carouselImg} /></div>
          <div style={styles.carouselSlide}><img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop" alt="Workout" style={styles.carouselImg} /></div>
        </Carousel>
      </div>

      {/* --- "Why Choose Us" Section --- */}
      <section style={styles.choseUsSection}>
        <div style={styles.sectionTitle}><span style={styles.whyText}>Why chose us?</span><h2 style={styles.limitsText}>PUSH YOUR LIMITS FORWARD</h2></div>
        <div style={styles.csItemsContainer}>
          <ChoiceItem icon={<FaBicycle />} title="Modern equipment" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut dolore facilisis." />
          <ChoiceItem icon={<FaAppleAlt />} title="Healthy nutrition" text="Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis." />
          <ChoiceItem icon={<FaDumbbell />} title="Professional training " text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut dolore facilisis." />
          <ChoiceItem icon={<FaHeartbeat />} title="Unique your needs" text="Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis." />
        </div>
      </section>

      {/* --- "Our Classes" Section --- */}
      <section style={styles.classesSection}>
        <div style={styles.sectionTitle}><span style={{...styles.whyText, ...styles.ourClassesText}}>Our Classes</span><h2 style={styles.limitsText}>WHAT WE CAN OFFER</h2></div>
        <div style={styles.classesContainer}>
            <ClassItem imgSrc="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1887&auto=format&fit=crop" category="STRENGTH" title="Weightlifting" />
            <ClassItem imgSrc="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" category="Cardio" title="Indoor cycling" />
            <ClassItem imgSrc="https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=2070&auto=format&fit=crop" category="STRENGTH" title="Kettlebell power" />
            <ClassItem imgSrc="https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1887&auto=format&fit=crop" category="Training" title="Boxing" width="48.5%" />
            <ClassItem imgSrc="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2070&auto=format&fit=crop" category="Cardio" title="CrossFit" width="48.5%" />
        </div>
      </section>

      {/* --- Banner Section --- */}
      <section style={styles.bannerSection}>
        <div style={styles.bannerOverlay}></div>
        <div style={styles.bannerTextContainer}>
            <h2 style={styles.bannerTitle}>registration now to get more deals</h2>
            <div style={styles.bannerTips}>Where health, beauty and fitness meet.</div>
            <AppointmentButton onClick={scrollToCarousel} />
        </div>
      </section>

      {/* --- Gallery Section --- */}
      <section style={styles.gallerySection}>
        <div style={styles.sectionTitle}>
            <h2 style={{...styles.limitsText, color: '#FFBF00'}}>Our Gallery</h2>
        </div>
        <div style={styles.galleryContainer}>
          <GalleryItem imgSrc="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1975&auto=format&fit=crop" isWide />
          <GalleryItem imgSrc="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2070&auto=format&fit=crop" />
          <GalleryItem imgSrc="https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1887&auto=format&fit=crop" />
          <GalleryItem imgSrc="https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=2071&auto=format&fit=crop" />
          <GalleryItem imgSrc="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop" />
          <GalleryItem imgSrc="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1887&auto=format&fit=crop" isWide />
        </div>
      </section>

      {/* --- Testimonials Section (New) --- */}
      <section style={styles.testimonialsSection}>
        <div style={styles.sectionTitle}>
            <span style={styles.whyText}>Testimonials</span>
            <h2 style={styles.limitsText}>WHAT OUR CLIENTS SAY</h2>
        </div>
        <div style={styles.testimonialCarousel}>
            <Carousel
                showThumbs={false}
                showStatus={false}
                infiniteLoop
                autoPlay
                interval={6000}
                showArrows={false}
            >
                {testimonials.map((testimonial, index) => (
                    <TestimonialItem
                        key={index}
                        name={testimonial.name}
                        designation={testimonial.designation}
                        text={testimonial.text}
                        image={testimonial.image}
                    />
                ))}
            </Carousel>
        </div>
      </section>
    </>
  );
};

export default Home;