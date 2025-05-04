import React from "react";
import { Container, Row, Col, Button, Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import chefImage from "../assets/chef1.jpeg";
import increaseIcon from "../assets/increase.png";
import barChartIcon from "../assets/bar-chart.png";
import shortTermIcon from "../assets/short-term.png";
import learningIcon from "../assets/learning.png";
import chef1 from "../assets/chef.jpg";
import chef4 from "../assets/chef4.jpg";
import chef5 from "../assets/chef5.jpg";
import tools2 from "../assets/tools2.jpeg";
import serv from "../assets/serv.jpg";
import koreanchef from "../assets/koreanchef.jpg";
import blackamreicanchef1 from "../assets/blackamreicanchef1.jpg";
import chef2 from "../assets/chef2.jpg";
import chef3 from "../assets/chef3.jpg";
import biscut from "../assets/biscut.webp";
import food from "../assets/food.png";
import food5 from "../assets/food5.jpeg";
import f13 from "../assets/f13.jpg";
import food2 from "../assets/food2.jpeg";
import midi from "../assets/midi.jpg";
import nudles from "../assets/nudles.jpg";


const HomeSkillShare = () => {
  const navigate = useNavigate();
  
  

  const handleLessonClick = () => {
    navigate("/lessons");
  };

  return (
    <>
      {/* Hero Section */}
      <div className="hero-section">
        <img src={chefImage} alt="Chef" className="blurred-image" />
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h3
            className="learning-path"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
          >
            LEARNING PATH
          </motion.h3>
          <motion.h1
            className="cooking-title"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5 }}
          >
            Welcome to Foodie Skill Sharing
          </motion.h1>
          <motion.p
            className="hero-description"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.8 }}
          >
            If you always wanted to cook some healthy, tasty dishes, start with us.
            Our best chefs will guide you through easy and delicious recipes.
          </motion.p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 120, delay: 2 }}
          >
            <Button className="cooking-button" onClick={handleLessonClick}>
              🍳 COOKING LESSONS
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Feature Rectangle */}
      <motion.div
        className="feature-rectangle"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      >
        <Container>
          <Row className="text-center">
            {[increaseIcon, barChartIcon, shortTermIcon, learningIcon].map(
              (icon, idx) => (
                <Col key={idx}>
                  <motion.img
                    src={icon}
                    alt="Feature Icon"
                    className="feature-icon"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: idx * 0.2 }}
                    viewport={{ once: true }}
                  />
                  <p>
                    {["Learning Experience", "Beginner Level", "Short Lessons", "Skill Building"][idx]}
                  </p>
                </Col>
              )
            )}
          </Row>
        </Container>
      </motion.div>

      {/* Centered Message Below the Feature Rectangle */}
      <motion.div
        className="award-message"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <p>
          Enjoy an award-winning cookery school experience in your own kitchen or workplace.
        </p>
      </motion.div>

      {/* Chef Images Section */}
      <motion.div
        className="chef-images-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <Container>
          <Row className="text-center">
            <Col>
              <motion.img
                src={chef1}
                alt="Chef 1"
                className="chef-image"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            </Col>
            <Col>
              <motion.img
                src={chef4}
                alt="Chef 4"
                className="chef-image"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            </Col>
            <Col>
              <motion.img
                src={chef5}
                alt="Chef 5"
                className="chef-image"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            </Col>
            <Col>
              <motion.img
                src={tools2}
                alt="Tools"
                className="chef-image"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            </Col>
          </Row>
        </Container>
      </motion.div>

      {/* Star Reviews Section */}
      <motion.div
        className="reviews-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <Container>
          <Row className="text-center">
            <Col>
              <h3>⭐⭐⭐⭐⭐</h3>
              
            </Col>
          </Row>
        </Container>
      </motion.div>
      
      
      {/* Carousel Section */}
      <motion.div className="carousel-section">
        <Container>
          <Carousel interval={4000}>
            {/* Slide 1 */}
            <Carousel.Item>
              <Row className="text-center">
                <Col>
                  <h3>Share Your Passion</h3>
                  <p>Post recipes, tips, and kitchen experiences. Let others learn from your creativity!</p>
                </Col>
              </Row>
              <Row className="image-row">
                {[chef1, chef2, chef3, chef4].map((img, idx) => (
                  <Col key={idx} xs={6} md={3}>
                    <img src={img} alt="Cooking" className="carousel-image" />
                  </Col>
                ))}
              </Row>
            </Carousel.Item>

            {/* Slide 2 */}
            <Carousel.Item>
              <Row className="text-center">
                <Col>
                  <h3>Learn from Experts</h3>
                  <p>Follow structured lessons and step-by-step guidance from experienced chefs.</p>
                </Col>
              </Row>
              <Row className="image-row">
                {[koreanchef, chef3, chef4, serv].map((img, idx) => (
                  <Col key={idx} xs={6} md={3}>
                    <img src={img} alt="Learning" className="carousel-image" />
                  </Col>
                ))}
              </Row>
            </Carousel.Item>

            {/* Slide 3 */}
            <Carousel.Item>
              <Row className="text-center">
                <Col>
                  <h3>Join the Community</h3>
                  <p>Like, comment, and challenge your friends with fun cooking competitions.</p>
                </Col>
              </Row>
              <Row className="image-row">
                {[blackamreicanchef1, chef2, chef5, tools2].map((img, idx) => (
                  <Col key={idx} xs={6} md={3}>
                    <img src={img} alt="Community" className="carousel-image" />
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          </Carousel>
        </Container>
      </motion.div>
      
      <motion.div className="image-text-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
  <Container>
    <Row className="align-items-center text-center">
      <Col md={6} className="text-md-start">
        <img src={biscut} alt="biscut" className="left-image" />
      </Col>
      <Col md={6}>
        <div className="food-love-text">
          <span>Best place</span> <span>to find</span> <span>your food</span> <span>love</span>
          <img src={food} alt="love" className="love-image" />
        </div>
      </Col>
    </Row>
  </Container>
</motion.div>
<motion.div 
  className="culinary-education-text" 
  initial={{ opacity: 0, y: 20 }} 
  animate={{ opacity: 1, y: 0 }} 
  transition={{ duration: 1 }}
>
  <Container>
    <Row className="justify-content-center text-center">
      <Col md={10}>
        <p className="culinary-text">
          By combining <span className="highlight">world-renowned culinary education</span> with cutting-edge technology, <br />
          <span className="foodie-name">Foodie Online</span> makes it <span className="exciting">simple and exciting</span> to learn professional cookery skills <br />
          from any kitchen, on your own schedule, and on any device.
        </p>
      </Col>
    </Row>
  </Container>
</motion.div>

<motion.div 
  className="image-text-section" 
  initial={{ opacity: 0, y: 20 }} 
  animate={{ opacity: 1, y: 0 }} 
  transition={{ duration: 1 }}
>
  <Container>
    {/* Image Section */}
    <Row className="justify-content-center">
      {/* Top Row - 3 Images */}
      <Col md={3}>
        <img src={food5} alt="Culinary 1" className="image img-1" />
        <img src={nudles} alt="Noodles Dish" className="image img-6" /> {/* Nudles Image under food5 */}
      </Col>
      <Col md={5}>
        <img src={f13} alt="Culinary 2" className="image img-2" />
        <img src={midi} alt="Culinary 5" className="image img-5" /> {/* Midi Image under f13 */}
      </Col>
      <Col md={3}>
        <img src={food2} alt="Culinary 3" className="image img-3" />
      </Col>
    </Row>
  </Container>
</motion.div>

<motion.div 
  className="choose-path-text-section" 
  initial={{ opacity: 0, y: 20 }} 
  animate={{ opacity: 1, y: 0 }} 
  transition={{ duration: 1 }}
>
  <Container>
    {/* Text Section */}
    <Row className="justify-content-center">
      <Col>
        <div className="choose-path-text">
          Choose Your Path
        </div>
        <div className="light-text">
        With courses for everyone from absolute beginners to accomplished chefs, you are sure to find a path that suits you.
        </div>
      </Col>
    </Row>
  </Container>
</motion.div>






      

      {/* CSS Styles */}
      <style jsx>{`
        .hero-section {
          position: relative;
          width: 100%;
          height: 80vh;
          overflow: hidden;
        }

        .blurred-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.6) blur(3px);
        }

        .hero-text {
          position: absolute;
          top: 35%;
          left: 5%;
          color: white;
          max-width: 500px;
        }

        .learning-path {
          font-size: 24px;
          font-weight: bold;
          color: #F8C035;
          text-shadow: 1px 1px 2px #000;
        }

        .cooking-title {
          font-size: 44px;
          font-weight: bold;
          margin-top: 10px;
          line-height: 1.2;
          text-shadow: 2px 2px 4px #000;
        }

        .hero-description {
          font-size: 18px;
          margin: 20px 0;
          color: #f4f4f4;
          text-shadow: 1px 1px 2px #000;
        }

        .cooking-button {
          background: linear-gradient(135deg, #f8c035, #ff9800) !important;
          border: none;
          padding: 14px 26px;
          font-size: 18px;
          font-weight: bold;
          color: #000;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          transition: background 0.3s ease, transform 0.2s ease;
        }

        .cooking-button:hover {
          background: linear-gradient(135deg, #ff9800, #f8c035) !important;
          transform: scale(1.05);
        }

        .feature-rectangle {
          width: 100%;
          background-color: #F8C035;
          padding: 20px 0;
          height: 180px;
        }

        .feature-icon {
          width: 60px;
          height: 60px;
          margin-bottom: 10px;
        }

        .feature-rectangle p {
          font-size: 16px;
          font-weight: bold;
          color: white;
        }

        .feature-rectangle .col {
          padding: 20px;
        }

        .award-message {
          text-align: center;
          padding: 30px 20px;
          background-color: #fff;
          font-size: 33px;
          font-weight: 500;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
        }

        .chef-images-section {
          padding: 40px 0;
        }

        .chef-image {
          width: 100%;
          height: 300px; /* Ensure uniform height */
          object-fit: cover;
          max-width: 300px;
          border-radius: 20px;
          margin-bottom: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease;
        }

        .chef-image:hover {
          transform: scale(1.05); /* Popup effect */
        }

        .reviews-section {
          padding: 40px 0;
        }
       
          .cooking-title {
            font-size: 30px;
          }

          .feature-icon {
            width: 50px;
            height: 50px;
          }

          .feature-rectangle {
            height: auto;
            padding: 30px 0;
          }

          .chef-image {
            max-width: 90%;
          }
      }
      .carousel-section {
  padding: 50px 0;
  text-align: center;
}

.carousel-container {
  width: 90%;
  margin: 0 auto;
}

.carousel-item {
  text-align: center;
  position: relative;
}

.carousel-image {
  width: 100%;
  height: 400px; /* Adjust height as needed */
  object-fit: cover;
  border-radius: 15px;
}

.carousel-caption {
  position: absolute;
  bottom: -50px; /* Moves caption below the image */
  left: 50%;
  transform: translateX(-50%);
  background: rgba(226, 204, 9, 0.9);
  padding: 10px 15px;
  border-radius: 10px;
  width: 80%;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.carousel-indicators [data-bs-target] {
  background-color: #F8C035 !important; /* Yellow indicators */
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.carousel-indicators {
  bottom: -30px; /* Adjust spacing below the images */
  
}
.carousel-section {
          padding: 50px 0;
          text-align: center;
        }

        .carousel-image {
          width: 100%;
          height: 400px;
          object-fit: cover;
          border-radius: 15px;
        }

        .image-text-section {
          padding: 50px 0;
          text-align: center;
          
        }

        .left-image {
          width: 100%;
          max-width: 600px;
          height : 600px;
          
         
       
        }

 

    .food-love-text {
  font-size: 50px;
  font-weight: regular;
  color: rgb(20, 19, 18);
  text-align: left;
}

.food-love-text span {
  display: inline-block;
  margin-right: 10px; /* Adjust spacing between the pairs of words */
}

.love-image {
  width: 123px;
  height: 123px;
  margin-left: 10px; /* Space between the word "love" and the image */
  vertical-align: middle; /* Align the image with the text */
}

 .culinary-text {
  font-size: 48px;
  font-weight: 400;
  color: #222;  /* Dark gray for readability */
  text-align: center;
  margin-top: 30px;
  line-height: 1.4; /* Improve readability */
  letter-spacing: 1px;
  padding: 10px 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1); /* Light text shadow for depth */
}

/* Adding slight color variations for emphasis */
.highlight {
  color: #FF9800; /* Warm golden color for impact */
  font-weight: bold;
}

.foodie-name {
  color: #D84315; /* Deep orange-red for branding */
  font-weight: bold;
  font-style: italic;
}

.exciting {
  color: #388E3C; /* Green shade to indicate excitement */
  font-weight: bold;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .culinary-text {
    font-size: 32px;
    padding: 10px;
  }
}
.image {
  border-radius: 40px;
  width: 100%; /* Ensures responsiveness */
  display: block;
  margin: 10px auto; /* Adds spacing */
}

.img-1 { width: 300px; height: 300px; }
.img-2 { width: 422px; height:346px; }
.img-3 { width: 300px; height: 322px; }

.img-5 { width: 306px; height: 303px;margin-top: 15px;  }

.img-6 { 
  width: 300px; 
  height: 300px; 
  margin-top: 10px; /* Adjust spacing if necessary */
}

.choose-path-text {
  text-align: center; /* Center align the text */
  font-size: 70px;     /* Set the text size to 70px */
  font-weight: bold;   /* Make the text bold */
  margin-top: 30px;    /* Add some margin above the text */
}

 

.light-text {
  text-align: center;  /* Center align the text */
  font-size: 40px;     /* Set the text size to 40px */
  font-weight: light;  /* Light font-weight */
  margin-top: 10px;    /* Add some margin above the text */
}

      `}</style>
    </>
  );
};

export default HomeSkillShare;
