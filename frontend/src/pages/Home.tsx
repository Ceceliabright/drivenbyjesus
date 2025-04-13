import React, { useEffect, useState, CSSProperties } from "react";
import { getUserById } from "../api/users"; // Import your API function
import ccCoder from "../images/ccCoder.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

const Home: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init();

    const fetchUser = async () => {
      const userId = localStorage.getItem("id");

      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        const user = await getUserById(userId);
        setUsername(user.username || "Guest");
        // alert(`Welcome back, ${user.username || "Guest"}!`);
      } catch (err) {
        setError("Failed to fetch user data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const backgroundStyle: CSSProperties = {
    margin: 0,
    padding: 0,
    backgroundColor: "red",
    backgroundImage: `url(${ccCoder})`,
    backgroundSize: "cover",
    backgroundPosition: "top center",
    backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  };

  if (isLoading) {
    return <div style={{ textAlign: "center" }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ textAlign: "center", color: "red" }}>Error: {error}</div>;
  }

  return (
    <div style={backgroundStyle}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            marginTop: "40px",
       
            background: "rgba(62, 66, 47, 0.6)", // Translucent background
            borderRadius: "16px", // Rounded corners
            padding: "40px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow
            maxWidth: "600px",
            textAlign: "left",
            color: "rgba(0, 0, 0, 2.0)",
          }}
          data-aos="fade-up"
        >
          {username ? (
            <h1>
              Welcome, {username}!
              <br />
              Click on the links in the navigation bar to explore some of our current
              features until we finish the future fun as we gamify the time we spend on
              our apps with Jesus!
            </h1>
          ) : (
            <>
              <h1>Welcome to the Total Wellness App!</h1>
              <p>Here is where we will be rendering your chart!</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;


