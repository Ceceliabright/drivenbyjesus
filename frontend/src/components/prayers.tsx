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
        position: 'relative',
        backgroundRepeat: 'no-repeat',
        paddingTop: '80px', // 👈 Add this line (adjust the number as needed)
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
            backgroundColor: 'rgba(42, 74, 62, 0.5)', // Similar translucent background
            color: 'white',
            marginBottom: '60px',
            animation: 'moveVerse 3s ease-in-out infinite', // Smooth animation for the verse
            padding: '10px',
            paddingTop: '900px',
            // backgroundColor: 'lightgreen',
            borderRadius: '5px',
          }}
        >

          {/* <blockquote style={{ fontStyle: 'italic', fontSize: '30px' }}> */}


          <blockquote
            style={{
              fontStyle: 'italic',
              fontSize: '30px',
              border: '1px solid white', /* Thin white border */
              borderRadius: '8px', /* Rounded corners */
              padding: '10px', /* Optional padding for better spacing */
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

      <div>
        <input
          type="text"
          placeholder="My prayer"
          value={newPrayer}
          onChange={(e) => setNewPrayer(e.target.value)}
          style={{
            padding: '8px',
            marginRight: '5px',
            borderRadius: '5px',
            border: '1px solid #4CAF50',
          }}
        />
        <input
          type="text"
          placeholder="My reason"
          value={newReason}
          onChange={(e) => setNewReason(e.target.value)}
          style={{
            padding: '8px',
            marginRight: '5px',
            borderRadius: '5px',
            border: '1px solid #4CAF50',
          }}
        />
        <button
          onClick={handleAddPrayer}
          style={{
            padding: '8px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          Add Prayer
        </button>
        <h1>Prayer List</h1>
      </div>

      <ul>
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


