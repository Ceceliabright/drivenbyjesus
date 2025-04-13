import React, { useState, useEffect, useCallback } from 'react';
import { fetchData, saveData, updateData, deleteData } from './CrudService';
import AOS from 'aos';
import 'aos/dist/aos.css';


interface Prayer {
  id: number;
  prayer: string;
  reason: string;
  date: string;
}

const Prayers: React.FC = () => {
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [newPrayer, setNewPrayer] = useState('');
  const [newReason, setNewReason] = useState('');
  const [editingPrayer, setEditingPrayer] = useState<number | null>(null);
  const [editPrayerText, setEditPrayerText] = useState('');
  const [editReason, setEditReason] = useState('');
  const [error, setError] = useState('');
  const [animate, setAnimate] = useState<boolean>(false); // Animation flag for additional effects


  // State for Bible verses related to prayers
  const [bibleVersesPrayers, setBibleVersesPrayers] = useState<any[]>([]);
  const [currentVerse, setCurrentVerse] = useState<any | null>(null);

  useEffect(() => {
    AOS.init({ duration: 1200, once: false }); // Initialize AOS (Animate on Scroll) for animations

    const loadPrayers = async () => {
      try {
        const data = await fetchData('prayers');
        setPrayers(data);
      } catch (error) {
        setError('Error fetching prayers');
      }
    };

    const loadBibleVerses = async () => {
      try {
        const data = await fetchData('bibleVersesPrayers');
        setBibleVersesPrayers(data);
      } catch (error) {
        setError('Error fetching Bible verses');
      }
    };

    loadPrayers();
    loadBibleVerses();
  }, []);

  // Get a random Bible verse from the fetched data
  const getRandomVerse = useCallback(() => {
    if (bibleVersesPrayers.length > 0) {
      const randomIndex = Math.floor(Math.random() * bibleVersesPrayers.length);
      return bibleVersesPrayers[randomIndex];
    }
    return null;
  }, [bibleVersesPrayers]);

  // Set a random Bible verse on initial load or when the verses change
  useEffect(() => {
    if (bibleVersesPrayers.length > 0) {
      setCurrentVerse(getRandomVerse());
    }
  }, [bibleVersesPrayers, getRandomVerse]);

  // Function to reload a new Bible verse
  const reloadVerse = () => {
    setCurrentVerse(getRandomVerse());
  };

  const handleAddPrayer = async () => {
    if (!newPrayer || !newReason) {
      setError('Prayer and reason cannot be empty');
      return;
    }

    const newPrayerItem = {
      prayer: newPrayer,
      reason: newReason,
      date: new Date().toLocaleString(),
    };

    try {
      const savedPrayer = await saveData('prayers', newPrayerItem);
      setPrayers([...prayers, savedPrayer]);
      setNewPrayer('');
      setNewReason('');
      setError('');
    } catch (error) {
      setError('Error saving prayer');
    }
  };

  const handleUpdate = async (id: number) => {
    if (!editPrayerText || !editReason) {
      setError('Prayer and reason cannot be empty');
      return;
    }

    const updatedPrayer = {
      prayer: editPrayerText,
      reason: editReason,
      date: new Date().toLocaleString(),
    };

    try {
      const updated = await updateData('prayers', id, updatedPrayer);
      setPrayers((prevPrayers) =>
        prevPrayers.map((item) =>
          item.id === id ? { ...item, ...updated } : item
        )
      );
      setEditingPrayer(null);
      setError('');
    } catch (error) {
      setError('Error updating prayer');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteData('prayers', id);
      setPrayers(prayers.filter((item) => item.id !== id));
    } catch (error) {
      setError('Error deleting prayer');
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url("/images/Jesusprayersbackground.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        width: '100vw',
        position: 'relative',
        backgroundRepeat: 'no-repeat',
        paddingTop: '8px', // 👈 Add this line (adjust the number as needed)
      }}
    >
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Translucent Overlay
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.3)', // Black overlay with opacity
          filter: 'blur(5px)', // Optional: blur the background
          zIndex: -1, // Make sure the overlay is behind the content
        }}
      ></div> */}

      {/* Random Bible Verse Display */}


      {currentVerse && (
        <div
          style={{
            // style={{
            fontStyle: 'italic',
            fontSize: '1.1em',
            width: '100vw',
            backgroundColor: 'rgba(42, 74, 62, 0.5)', // Similar translucent background
            color: 'white',
            marginBottom: '60px',
            marginTop: '990px',
            animation: 'moveVerse 3s ease-in-out infinite', // Smooth animation for the verse
            padding: '10px',
            paddingTop: '150px',
            // backgroundColor: 'lightgreen',
            borderRadius: '5px',
            textAlign: 'center',
          }}
        data-aos="slide-up"
      >



          {/* <blockquote style={{ fontStyle: 'italic', fontSize: '30px' }}> */}


          <blockquote
            style={{
              fontStyle: 'italic',
              fontSize: '30px',
              border: '1px solid white', /* Thin white border */
              borderRadius: '8px', /* Rounded corners */
              padding: '10px', /* Optional padding for better spacing */
              backgroundColor: 'rgba(42, 74, 62, 0.8)', // Slightly darker translucent background
              margin: '20px auto', // Centers the blockquote with proper spacing
              maxWidth: '100%', // Ensures readability on wider screens
              width: '100vw',
            }}
          >
            "{currentVerse.verse}"
          </blockquote>
          <p>{currentVerse.reference}</p>
          <button
            onClick={reloadVerse}
            style={{
              border: '1px solid white', /* Thin white border */
              borderRadius: '8px', /* Rounded corners */
              padding: '10px', /* Optional padding for better spacing */
              cursor: 'pointer',
              backgroundColor: 'rgba(42, 74, 62, 0.5)', // Similar translucent background
              color: 'white',
            }}
          >
            More of what God says about prayer
          </button>
        </div>
      )}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          // height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.3)', // Translucent background
          borderRadius: '10px',
          border: '2px solid white', // Thin white border
          padding: '20px',
          boxSizing: 'border-box',
        }}
      >

        <label style={{ color: 'white', justifyContent: "center" }}>
       
        <p>
          {/* <strong>Philippians 4:6-7:</strong> <br /> */}
          "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus."
          <br></br>
          What’s on your heart today?

        </p>
        </label>
        <br></br>
        <textarea
          placeholder="My prayer"
          value={newPrayer}
          onChange={(e) => setNewPrayer(e.target.value)}
          style={{
            padding: '8px',
            marginRight: '5px',
            borderRadius: '5px',
            border: '1px solid #4CAF50',
            width: '100%',
            maxWidth: '100%',
            resize: 'vertical', // Allow user to resize vertically
            marginBottom: '15px',
          }}
        />
        <br></br>
        <label style={{ color: 'white' }}>Why are you praying? Share the purpose behind your prayer.</label>
        <br></br>
        <textarea
          placeholder="My reason"
          value={newReason}
          onChange={(e) => setNewReason(e.target.value)}
          style={{
            padding: '8px',
            marginRight: '5px',
            borderRadius: '5px',
            border: '1px solid #4CAF50',
            width: '100%', // Make input take up full width
            maxWidth: '100%', // Max width to prevent it from becoming too wide
            marginBottom: '15px', // Spacing between inputs
          }}
        />
        <br></br>
        <button
          onClick={handleAddPrayer}
          style={{
            padding: '8px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            width: '100%', // Make button take up full width
            maxWidth: '600px', // Max width to match input
            cursor: 'pointer',


          }}
        >
          Add Prayer
        </button>
</div>
<div>


        <br></br>
        <br></br>
        <h1 style={{ textAlign: 'center' }}>Prayer List</h1>
      </div>

      <ul
  style={{
    display: 'flex', // Flexbox for row layout
    flexWrap: 'wrap', // Allows wrapping to the next line if there isn't enough space
    gap: '10px', // Adds spacing between items
    padding: 0, // Removes default padding of <ul>
    listStyle: 'none', // Removes default bullet points
  }}
>

        {prayers.slice().reverse().map((prayerItem) => (
          <li
            key={prayerItem.id}
            style={{
              marginBottom: '10px',
              padding: '10px',
              border: '1px solid white', /* Thin white border */
              borderRadius: '8px', /* Rounded corners */
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              background: 'rgba(0, 0, 0, 0.3)', // Translucent background
              color: 'white',

              // backgroundColor: '#A5D6A7',
              // borderRadius: '5px',
            }}
          >
            {editingPrayer === prayerItem.id ? (
              <div>
                <input
                  type="text"
                  value={editPrayerText}
                  onChange={(e) => setEditPrayerText(e.target.value)}
                  style={{
                    padding: '8px',
                    marginRight: '5px',
                    borderRadius: '5px',
                    border: '1px solid #4CAF50',
                  }}
                />
                <input
                  type="text"
                  value={editReason}
                  onChange={(e) => setEditReason(e.target.value)}
                  style={{
                    padding: '8px',
                    marginRight: '5px',
                    borderRadius: '5px',
                    border: '1px solid #4CAF50',
                  }}
                />
                <button
                  onClick={() => handleUpdate(prayerItem.id)}
                  style={{
                    padding: '8px',
                    backgroundColor: '#66BB6A',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    marginRight: '5px',
                  }}
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingPrayer(null)}
                  style={{
                    padding: '8px',
                    backgroundColor: '#388E3C',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <p><strong>{prayerItem.prayer}</strong></p>
                <p><strong> {prayerItem.reason}</strong></p>
                <p>{prayerItem.date}</p>
                <button
                  onClick={() => {
                    setEditingPrayer(prayerItem.id);
                    setEditPrayerText(prayerItem.prayer);
                    setEditReason(prayerItem.reason);
                  }}
                  style={{
                    padding: '8px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    marginRight: '5px',
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(prayerItem.id)}
                  style={{
                    padding: '8px',
                    backgroundColor: '#388E3C',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Prayers;


