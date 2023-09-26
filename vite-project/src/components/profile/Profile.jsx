import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const token = localStorage.getItem("token");
  const auth = useAuth();
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    // Fetch user profile data from your API
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/users/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          console.error("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  // Handle file input change to set the profile picture
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {auth.isAuthenticated() ? (
        <Container className="mt-4">
          <Row className="justify-content-center">
  <Col md={6}>
    <Card>
      <Card.Body>
        <Card.Title className="text-center text-muted fw-bold fst-italic">
          User Profile
        </Card.Title>
        <Card.Text className="col-12">
          <div className="d-flex justify-content-between align-items-end">
            <div className="col-6">
              <strong>Name:</strong> {user.name}
              <br />
              <strong>Email:</strong> {user.email}
            </div>
            <div className="col-6">
              <div className="mt-2 px-2">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile Pic"
                    className="rounded-circle"
                    style={{ maxWidth: '100%', maxHeight: '100px' }}
                  />
                ) : (
                  <div
                  className="rounded-circle"
                    style={{
                      width: '100px',
                      height: '100px',
                      border: '1px solid #ccc',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <small className="text-center">No picture selected</small>
                  </div>
                )}
                <input
                  className="mt-2"
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                />
              </div>
            </div>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  </Col>
</Row>

        </Container>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </>
  );
};

export default ProfilePage;
