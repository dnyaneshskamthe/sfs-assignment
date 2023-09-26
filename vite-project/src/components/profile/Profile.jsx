import  { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useAuth } from '../context/AuthContext';



const ProfilePage = () => {
  const [user, setUser] = useState({});
  const token = localStorage.getItem('token')
  const auth = useAuth()
   // Import the environment variable
   const apiUrl = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    // Fetch user profile data from your API
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/users/profile`,{
          method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          console.error('Failed to fetch user profile');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
  
    fetchUserProfile();
  }, []);

  return (
    <>
    {auth.isAuthenticated() ? (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center text-muted fw-bold fst-italic">User Profile</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {user.name}<br />
                <strong>Email:</strong> {user.email}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container> ):  (
        <p>Please log in to view your profile.</p>
      )}
    </>
  );
};

export default ProfilePage;
