import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { motion, useAnimation } from 'framer-motion';
import background from "./assets/background.jpg"
import MouseTrail from './MouseTrail';

const App = () => {
  const [countdown, setCountdown] = useState({});
  const [email, setEmail] = useState('');
  const controls = useAnimation();

  useEffect(() => {
    const fixedEndDate = new Date('2024-10-02T00:00:00');
    localStorage.setItem('countDownDate', fixedEndDate.toISOString());

    const getTargetDate = () => {
      const storedDate = localStorage.getItem('countDownDate');
      return storedDate ? new Date(storedDate) : fixedEndDate;
    };

    const countDownDate = getTargetDate();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });

      if (distance < 0) {
        clearInterval(interval);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        localStorage.removeItem('countDownDate');
      }
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();

    // Initial animation
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" }
    });

    return () => clearInterval(interval);
  }, [controls]);

  const handleSubscribe = () => {
    if (email) {
      subscribeToNewsletter(email);
    } else {
      toast.error('Please enter a valid email address.');
    }
  };

  const subscribeToNewsletter = (email) => {
    fetch('https://comingsoon-backend.onrender.com/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Subscription successful') {
          toast.success('Thank you for subscribing!');
          setEmail('');
        } else {
          toast.error(data.message || 'There was an error. Please try again.');
          setEmail('');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        toast.error('There was an error. Please try again.');
      });
  };

  return (
    <>
      <div
        className="container"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <img
          src={background}
          alt="background"
          className="image"

        />
        <motion.div
          className="site-name"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <span className="sthaniya">Sthaniya</span><span className="saathi">Saathi</span>
        </motion.div>
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Coming Soon
        </motion.header>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          We are excited to announce that we will be launching soon and can't wait to share our new platform with you.
        </motion.p>
        <motion.div
          className="time-content"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <div className="time days">
            <span className="number">{countdown.days || 0}</span>
            <span className="text">days</span>
          </div>
          <div className="time hours">
            <span className="number">{countdown.hours || 0}</span>
            <span className="text">hours</span>
          </div>
          <div className="time minutes">
            <span className="number">{countdown.minutes || 0}</span>
            <span className="text">minutes</span>
          </div>
          <div className="time seconds">
            <span className="number">{countdown.seconds || 0}</span>
            <span className="text">seconds</span>
          </div>
        </motion.div>
        <motion.div
          className="email-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          <p>Subscribe now to get the latest updates!</p>
          <div className="input-box">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
            />
            <motion.button
              onClick={handleSubscribe}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Notify Me
            </motion.button>
          </div>
        </motion.div>
        
      </div>
      <MouseTrail />
      <Toaster position="top-right" />
    </>
  );
};

export default App;