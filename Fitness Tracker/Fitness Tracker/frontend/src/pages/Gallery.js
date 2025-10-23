import React, { useState } from 'react';
import styled from 'styled-components';

const galleryImages = [
  { id: 1, category: 'workout', src: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1974&auto=format&fit=crop', title: 'Workout Session' },
  { id: 2, category: 'meals', src: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop', title: 'Healthy Meal' },
  { id: 3, category: 'progress', src: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop', title: 'Progress Chart' },
  { id: 4, category: 'fitness-exercises', src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop', title: 'Exercise Routine' },
  { id: 5, category: 'gym', src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop', title: 'Gym Environment' },
  { id: 6, category: 'workout', src: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069&auto=format&fit=crop', title: 'Weight Lifting' },
  { id: 7, category: 'meals', src: 'https://images.unsplash.com/photo-1490645935967-10de6ba17021?q=80&w=2053&auto=format&fit=crop', title: 'Nutritious Food' },
  { id: 8, category: 'progress', src: 'https://images.unsplash.com/photo-1555212697-608b68f1c5f8?q=80&w=2070&auto=format&fit=crop', title: 'Fitness Journey' },
  { id: 9, category: 'fitness-exercises', src: 'https://images.unsplash.com/photo-1594737625787-a8a121c44a58?q=80&w=1974&auto=format&fit=crop', title: 'Stretching' },
  { id: 10, category: 'gym', src: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1975&auto=format&fit=crop', title: 'Treadmill Workout' },
];

const GalleryContainer = styled.div`
  padding: 80px 20px;
  background: linear-gradient(135deg, #1a1a1a, #333333);
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const GalleryHeader = styled.h1`
  text-align: center;
  font-size: 4rem;
  font-weight: 900;
  color: #FFBF00;
  text-transform: uppercase;
  margin-bottom: 60px;
`;

const FilterNav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
`;

const FilterButton = styled.button`
  background: ${props => (props.active ? '#FFBF00' : 'transparent')};
  color: ${props => (props.active ? '#1a1a1a' : '#FFBF00')};
  border: 2px solid #FFBF00;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #FFBF00;
    color: #1a1a1a;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const ImageCard = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const Gallery = () => {
  const [filter, setFilter] = useState('all');

  const filteredImages = filter === 'all'
    ? galleryImages
    : galleryImages.filter(image => image.category === filter);

  return (
    <GalleryContainer>
      <GalleryHeader>Gallery</GalleryHeader>
      <FilterNav>
        <FilterButton onClick={() => setFilter('all')} active={filter === 'all'}>All</FilterButton>
        <FilterButton onClick={() => setFilter('workout')} active={filter === 'workout'}>Workout</FilterButton>
        <FilterButton onClick={() => setFilter('meals')} active={filter === 'meals'}>Meals</FilterButton>
        <FilterButton onClick={() => setFilter('progress')} active={filter === 'progress'}>Progress</FilterButton>
        <FilterButton onClick={() => setFilter('fitness-exercises')} active={filter === 'fitness-exercises'}>Fitness Exercises</FilterButton>
        <FilterButton onClick={() => setFilter('gym')} active={filter === 'gym'}>Gym</FilterButton>
      </FilterNav>
      <ImageGrid>
        {filteredImages.map(image => (
          <ImageCard key={image.id}>
            <img src={image.src} alt={image.title} />
          </ImageCard>
        ))}
      </ImageGrid>
    </GalleryContainer>
  );
};

export default Gallery;