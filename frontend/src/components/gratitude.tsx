import React, { useState, useEffect } from 'react';

const Gratitude: React.FC = () => {
  const [gratitudes, setGratitudes] = useState<any[]>([]);
  const [bibleVersesGratitude, setBibleVersesGratitude] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [item, setItem] = useState('');
  const [reason, setReason] = useState('');
  const [formError, setFormError] = useState<string | null>(null); // State for form error


  // State for the random gratitude Bible verse
  const [currentVerse, setCurrentVerse] = useState<any>(null);

  useEffect(() => {
    setLoading(true);

    fetch('http://localhost:5000/gratitudes')
      .then((response) => response.json())
      .then((data) => setGratitudes(data))
      .catch((error) => {
        setError('Error fetching gratitudes');
        console.error('Error fetching gratitudes:', error);
      });

    fetch('http://localhost:5000/bibleVersesGratitude')
      .then((response) => response.json())
      .then((data) => {
        setBibleVersesGratitude(data);
        if (data.length > 0) {
          setCurrentVerse(getRandomVerse(data));
        }
      })
      .catch((error) => {
        setError('Error fetching Bible verses');
        console.error('Error fetching Bible verses:', error);
      })
      .finally(() => setLoading(false));
  }, []);

  const getRandomVerse = (verses: any[]) => {
    const randomIndex = Math.floor(Math.random() * verses.length);
    return verses[randomIndex];
  };

  const reloadVerse = () => {
    setCurrentVerse(getRandomVerse(bibleVersesGratitude));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

  // Validation: Ensure both fields are filled
  if (!item.trim() || !reason.trim()) {
    setFormError('Both fields are required.');
    return;
  }

  setFormError(null); // Clear any previous errors


    const newGratitude = {
      item,
      reason,
      date: new Date().toLocaleString(),
    };

    try {
      const response = await fetch('http://localhost:5000/gratitudes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGratitude),
      });

      if (!response.ok) {
        throw new Error('Failed to save gratitude');
      }

      const savedGratitude = await response.json();

      setGratitudes((prevGratitudes) => [...prevGratitudes, savedGratitude]);
      setItem('');
      setReason('');
    } catch (error) {
      setError('Error saving gratitude');
      console.error('Error saving gratitude:', error);
    }
  };

  // Function to delete a gratitude item
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/gratitudes/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete gratitude');
      }

      setGratitudes((prevGratitudes) =>
        prevGratitudes.filter((gratitude) => gratitude.id !== id)
      );
    } catch (error) {
      setError('Error deleting gratitude');
      console.error('Error deleting gratitude:', error);
    }
  };

  return (
    <div style={{ backgroundColor: '#E8F5E9', padding: '20px' }}>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {currentVerse && (
        <div
          style={{
            marginBottom: '20px',
            padding: '15px',
            backgroundColor: '#A5D6A7', // Muted green background
            borderRadius: '10px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h2 style={{ color: '#388E3C' }}>Gratitude Verse</h2>
          <blockquote
            style={{
              fontStyle: 'italic',
              fontSize: '18px',
              color: '#2C6B2F', // Slightly darker green for readability
            }}
          >
            "{currentVerse.verse}"
          </blockquote>
          <p style={{ color: '#388E3C' }}>
            <strong>Reference:</strong> {currentVerse.reference}
          </p>
          <button
            onClick={reloadVerse}
            style={{
              padding: '10px 20px',
              cursor: 'pointer',
              backgroundColor: '#4CAF50', // Soft green button
              color: 'white',
              border: 'none',
              borderRadius: '5px',
            }}
          >
            Reload Verse
          </button>
        </div>
      )}

      <h1 style={{ color: '#388E3C' }}>Gratitude List</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={{ color: '#388E3C' }}>Item:</label>
          <input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            style={{
              padding: '8px',
              borderRadius: '5px',
              border: '1px solid #4CAF50',
              backgroundColor: '#F1F8E9',
            }}
          />
        </div>

        {formError && (
  <p style={{ color: 'red', marginTop: '10px' }}>{formError}</p>
)}


        <div>
          <label style={{ color: '#388E3C' }}>Reason:</label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            style={{
              padding: '8px',
              borderRadius: '5px',
              border: '1px solid #4CAF50',
              backgroundColor: '#F1F8E9',
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            cursor: 'pointer',
            backgroundColor: '#66BB6A', // Soft green submit button
            color: 'white',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          Add Gratitude
        </button>
      </form>

      <ul>
        {gratitudes.length > 0 ? (
          gratitudes.slice().reverse().map((gratitude) => (
            <li
              key={gratitude.id}
              style={{
                marginBottom: '10px',
                padding: '10px',
                backgroundColor: '#A5D6A7',
                borderRadius: '5px',
              }}
            >
              <p><strong>Item:</strong> {gratitude.item}</p>
              <p><strong>Reason:</strong> {gratitude.reason}</p>
              <p><strong>Date:</strong> {gratitude.date}</p>
              <button
                onClick={() => handleDelete(gratitude.id)}
                style={{
                  padding: '5px 10px',
                  cursor: 'pointer',
                  backgroundColor: '#388E3C',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                }}
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No gratitudes found</p>
        )}
      </ul>
    </div>
  );
};

export default Gratitude;

