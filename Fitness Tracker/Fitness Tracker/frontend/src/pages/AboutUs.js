
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframes for animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const AboutUsContainer = styled.div`
  width: 100vw;
  min-height: calc(100vh - 70px);
  position: relative;
  left: 50%;   
  transform: translateX(-50%);
  background: linear-gradient(135deg, #1a1a1a, #333333);
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow-x: hidden;
`;

const Header = styled.header`
  text-align: center;
  padding: 100px 20px;
  background-image: url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
  }
`;

const HeaderContent = styled.div`
  position: relative;
  z-index: 1;
  animation: ${fadeIn} 1s ease-out;
`;

const MainHeading = styled.h1`
  font-size: 4.5rem;
  font-weight: 900;
  color: #FFBF00;
  text-transform: uppercase;
  letter-spacing: 4px;
`;

const SubHeading = styled.p`
  font-size: 1.8rem;
  color: #eee;
`;

const Section = styled.section`
  padding: 80px 20px;
  max-width: 1400px;
  margin: 0 auto;
  background: ${props => props.bg || 'transparent'};
  ${props => props.marginTop && `margin-top: ${props.marginTop};`}
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 3.5rem;
  color: #FFBF00;
  margin-bottom: 60px;
  text-transform: uppercase;
  margin-top: ${props => props.marginTop || '0'};
`;

// Gallery Styles
const galleryImages = [
  // Workout (10 images)
  { id: 1, category: 'workout', src: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1974&auto=format&fit=crop' },
  { id: 2, category: 'workout', src: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069&auto=format&fit=crop' },
  { id: 3, category: 'workout', src: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1975&auto=format&fit=crop' },
  { id: 4, category: 'workout', src: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop' },
  { id: 5, category: 'workout', src: 'https://images.unsplash.com/photo-1581009137042-c552e485697a?q=80&w=2070&auto=format&fit=crop' },
  { id: 6, category: 'workout', src: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=2071&auto=format&fit=crop' },
  { id: 7, category: 'workout', src: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=2071&auto=format&fit=crop' },

  { id: 34, category: 'workout', src: 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=1982&auto=format&fit=crop' },
  // Meals (10 images)
  { id: 9, category: 'meals', src: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop' },
  { id: 10, category: 'meals', src: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1974&auto=format&fit=crop' },
  { id: 11, category: 'meals', src: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=1964&auto=format&fit=crop' },
  { id: 12, category: 'meals', src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop' },
  { id: 13, category: 'meals', src: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=1953&auto=format&fit=crop' },
  { id: 14, category: 'meals', src: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=2070&auto=format&fit=crop' },
  { id: 15, category: 'meals', src: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1974&auto=format&fit=crop' },
  { id: 16, category: 'meals', src: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?q=80&w=1974&auto=format&fit=crop' },
  // Progress (10 images)
  { id: 17, category: 'progress', src: 'https://images.unsplash.com/photo-1545389336-cf090694435e?q=80&w=1974&auto=format&fit=crop' },
  { id: 18, category: 'progress', src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2120&auto=format&fit=crop' },
  { id: 19, category: 'progress', src: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=1974&auto=format&fit=crop' },
  { id: 20, category: 'progress', src: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1999&auto=format&fit=crop' },
  { id: 21, category: 'progress', src: 'https://images.unsplash.com/photo-1562771242-a02d9090c90c?q=80&w=2071&auto=format&fit=crop' },
  { id: 22, category: 'progress', src: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=1926&auto=format&fit=crop' },
  { id: 23, category: 'progress', src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop' },
  { id: 24, category: 'progress', src: 'https://images.unsplash.com/photo-1591291621164-2c6367723315?q=80&w=2070&auto=format&fit=crop' },
  // Fitness Exercises (10 images)
  { id: 25, category: 'fitness-exercises', src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop' },
  { id: 26, category: 'fitness-exercises', src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop' },
  { id: 27, category: 'fitness-exercises', src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop' },
  { id: 28, category: 'fitness-exercises', src: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069&auto=format&fit=crop' },
  { id: 29, category: 'fitness-exercises', src: 'https://images.unsplash.com/photo-1623874514711-0f321325f318?q=80&w=1974&auto=format&fit=crop' },
  { id: 30, category: 'fitness-exercises', src: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop' },
  { id: 31, category: 'fitness-exercises', src: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=2071&auto=format&fit=crop' },
  { id: 32, category: 'fitness-exercises', src: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1974&auto=format&fit=crop' },
];

const FilterNav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  background: ${props => (props.active ? '#FFBF00' : 'transparent')};
  color: ${props => (props.active ? '#1a1a1a' : '#FFBF00')};
  border: 2px solid #FFBF00;
  padding: 12px 25px;
  font-size: 1.1rem;
  font-weight: 700;
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
  gap: 25px;
  animation: ${fadeIn} 1s ease-out;
`;

const ImageCard = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
  height: 250px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  &:hover img {
    transform: scale(1.15);
  }
`;

// Feature Section Styles
const FeatureSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 80px;
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  flex-direction: ${props => (props.reverse ? 'row-reverse' : 'row')};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FeatureImage = styled.img`
  width: 50%;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
  transition: all 0.4s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 15px 35px rgba(0,0,0,0.9);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FeatureContent = styled.div`
  width: 50%;
  text-align: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FeatureHeading = styled.h3`
  font-size: 2.5rem;
  font-weight: 700;
  color: #FFBF00;
  margin-bottom: 20px;
`;

const FeatureText = styled.p`
  font-size: 1.2rem;
  line-height: 1.7;
  color: #ccc;
`;

const AboutUs = () => {
  const [filter, setFilter] = useState('all');

  const filteredImages = filter === 'all' 
    ? galleryImages 
    : galleryImages.filter(image => image.category === filter);

  return (
    <AboutUsContainer>
      <Header>
        <HeaderContent>
          <MainHeading>About Our Fitness Tracker</MainHeading>
          <SubHeading>Your Ultimate Companion in Achieving Fitness Goals</SubHeading>
        </HeaderContent>
      </Header>

      <Section bg="#000">
        <SectionTitle marginTop="-70px">Gallery</SectionTitle>
        <FilterNav>
          <FilterButton onClick={() => setFilter('all')} active={filter === 'all'}>All</FilterButton>
          <FilterButton onClick={() => setFilter('workout')} active={filter === 'workout'}>Workout</FilterButton>
          <FilterButton onClick={() => setFilter('meals')} active={filter === 'meals'}>Meals</FilterButton>
          <FilterButton onClick={() => setFilter('progress')} active={filter === 'progress'}>Progress</FilterButton>
          <FilterButton onClick={() => setFilter('fitness-exercises')} active={filter === 'fitness-exercises'}>Fitness Exercises</FilterButton>
        </FilterNav>
        <ImageGrid>
          {filteredImages.map(image => (
            <ImageCard key={image.id}>
              <img src={image.src} alt={image.category} />
            </ImageCard>
          ))}
        </ImageGrid>
      </Section>

      <Section bg="#1C1C1C">
        <SectionTitle>Core Features</SectionTitle>
        <FeatureSection>
          <Feature>
            <FeatureImage src="https://images.unsplash.com/photo-1581009137042-c552e485697a?q=80&w=2070&auto=format&fit=crop" alt="Workout Tracking" />
            <FeatureContent>
              <FeatureHeading>Track Your Workouts</FeatureHeading>
              <FeatureText>
                Log every rep, set, and exercise. Our intuitive workout tracker helps you monitor your strength training and cardio sessions with precision.
              </FeatureText>
            </FeatureContent>
          </Feature>
          <Feature reverse>
            <FeatureImage src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop" alt="Meal Management" />
            <FeatureContent>
              <FeatureHeading>Manage Your Meals</FeatureHeading>
              <FeatureText>
                Fuel your body right. Track your daily caloric intake, manage your diet, and ensure you're getting the nutrients you need.
              </FeatureText>
            </FeatureContent>
          </Feature>
          <Feature>
            <FeatureImage src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop" alt="Progress Monitoring" />
            <FeatureContent>
              <FeatureHeading>Monitor Your Progress</FeatureHeading>
              <FeatureText>
                Stay motivated by seeing your progress in real-time. Track your weight, body measurements, and performance improvements to see how far you've come.
              </FeatureText>
            </FeatureContent>
          </Feature>
          <Feature reverse>
            <FeatureImage src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop" alt="Fitness Reports" />
            <FeatureContent>
              <FeatureHeading>Generate Fitness Reports</FeatureHeading>
              <FeatureText>
                Get detailed insights with comprehensive reports in both PDF and CSV formats to analyze your performance.
              </FeatureText>
            </FeatureContent>
          </Feature>
        </FeatureSection>
      </Section>
    </AboutUsContainer>
  );
};

export default AboutUs;