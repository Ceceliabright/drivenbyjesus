import React, { useEffect, useState, useCallback } from 'react';

const Prayers: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newPrayer, setNewPrayer] = useState<string>(''); // State for new prayer input
  const [editingPrayer, setEditingPrayer] = useState<any | null>(null); // State for the prayer being edited
  const [answers, setAnswers] = useState<{ [key: number]: string }>({}); // State to manage answers

  // State for the random Bible verse about prayers
  const [bibleVersesPrayers, setBibleVersesPrayers] = useState<any[]>([]);
  const [currentVerse, setCurrentVerse] = useState<any>(null);

  // Fetch prayers and Bible verses from the backend
  useEffect(() => {
    fetch('http://localhost:5000/prayers')
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setPosts(sortedData);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching data');
        setLoading(false);
        console.error('Error fetching posts:', error);
      });

    fetch('http://localhost:5000/bibleVersesPrayers')
      .then((response) => response.json())
      .then((data) => {
        setBibleVersesPrayers(data);
      })
      .catch((error) => {
        console.error('Error fetching Bible verses:', error);
      });
  }, []);

  // Stable function to get a random Bible verse
  const getRandomVerse = useCallback(() => {
    if (bibleVersesPrayers.length > 0) {
      const randomIndex = Math.floor(Math.random() * bibleVersesPrayers.length);
      return bibleVersesPrayers[randomIndex];
    }
    return null;
  }, [bibleVersesPrayers]);

  // Display a random Bible verse when the component is loaded
  useEffect(() => {
    if (bibleVersesPrayers.length > 0) {
      setCurrentVerse(getRandomVerse());
    }
  }, [bibleVersesPrayers, getRandomVerse]);

  // Function to reload a new verse
  const reloadVerse = () => {
    setCurrentVerse(getRandomVerse());
  };

  // Delete prayer function
  const deletePrayer = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/prayers/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete prayer');
      }

      // Update state by filtering out the deleted prayer
      setPosts((prevPosts) => prevPosts.filter((prayer) => prayer.id !== id));
    } catch (error) {
      setError('Error deleting prayer');
      console.error('Error deleting prayer:', error);
    }
  };

  // Function to handle saving or updating a prayer
  const handleSavePrayer = () => {
    if (!newPrayer.trim()) {
      alert('Please enter a prayer before saving!');
      return;
    }

    const prayerData = {
      title: `Prayer ${posts.length + 1}`,
      content: newPrayer,
      date: new Date().toLocaleString(),
      id: posts.length + 1,
    };

    if (editingPrayer) {
      const updatedPrayer = { ...editingPrayer, content: newPrayer };

      // Update the prayer on the backend
      fetch(`http://localhost:5000/prayers/${editingPrayer.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPrayer),
      })
        .then((response) => response.json())
        .then((updatedData) => {
          setPosts((prevPosts) =>
            prevPosts.map((prayer) =>
              prayer.id === updatedData.id ? updatedData : prayer
            )
          );
          setEditingPrayer(null); // Reset editing state
          setNewPrayer(''); // Reset newPrayer field
        })
        .catch((error) => {
          console.error('Error updating prayer:', error);
          setError('Error updating prayer');
        });
    } else {
      // Save a new prayer
      fetch('http://localhost:5000/prayers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prayerData),
      })
        .then((response) => response.json())
        .then((savedPrayer) => {
          setPosts((prevPosts) => [savedPrayer, ...prevPosts]); // Add the new prayer to the top
          setNewPrayer(''); // Clear input field
        })
        .catch((error) => {
          console.error('Error saving prayer:', error);
          setError('Error saving prayer');
        });
    }
  };

  // Function to handle submitting an answer to a prayer
  const handleAnswerSubmit = (id: number) => {
    const answer = answers[id]?.trim();
    if (!answer) {
      alert('Please enter an answer before submitting!');
      return;
    }

    const prayer = posts.find((prayer) => prayer.id === id);
    if (prayer) {
      const updatedPrayer = {
        ...prayer,
        answers: [...(prayer.answers || []), answer], // Add the new answer to the prayer
      };

      fetch(`http://localhost:5000/prayers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPrayer),
      })
        .then((response) => response.json())
        .then((updatedData) => {
          setPosts((prevPosts) =>
            prevPosts.map((prayer) =>
              prayer.id === updatedData.id ? updatedData : prayer
            )
          );
          setAnswers({ ...answers, [id]: '' }); // Clear the answer input field
        })
        .catch((error) => {
          console.error('Error submitting answer:', error);
          setError('Error submitting answer');
        });
    }
  };

  return (
    <div>
      <h1>Prayer Tracker</h1>

      {/* Display Random Bible Verse */}
      {currentVerse && (
        <div
          style={{
            marginBottom: '20px',
            padding: '10px',
            backgroundColor: 'lightgreen',
            borderRadius: '5px',
          }}
        >
          <h2>Prayer Verse</h2>
          <blockquote style={{ fontStyle: 'italic', fontSize: '18px' }}>
            "{currentVerse.verse}"
          </blockquote>
          <p>
            <strong>Reference:</strong> {currentVerse.reference}
          </p>
          <button
            onClick={reloadVerse}
            style={{
              padding: '5px 10px',
              cursor: 'pointer',
              backgroundColor: '#4CAF90',
              color: 'white',
            }}
          >
            Reload Verse
          </button>
        </div>
      )}

      {/* Input field and Save/Update button */}
      <div>
        <input
          type="text"
          value={newPrayer}
          onChange={(e) => setNewPrayer(e.target.value)}
          placeholder="Enter your prayer"
          style={{
            padding: '10px',
            width: '300px',
            marginRight: '10px',
            borderRadius: '5px',
          }}
        />
        <button
          onClick={handleSavePrayer}
          style={{
            padding: '10px',
            backgroundColor: editingPrayer ? '#FFA500' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {editingPrayer ? 'Update Prayer' : 'Save Prayer'}
        </button>
      </div>

      {/* Display prayers */}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {posts.length > 0 ? (
          posts.reverse().map((prayer) => (
            <li key={prayer.id} style={{ margin: '10px 0' }}>
              <h3>{prayer.title}</h3>
              <p>
                <strong>Content:</strong> {prayer.content}
              </p>
              <p>
                <strong>Date:</strong> {prayer.date}
              </p>

              {/* Delete Button */}
              <button
                onClick={() => deletePrayer(prayer.id)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: 'green',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>

              {/* Answer Input */}
              <div>
                <input
                  type="text"
                  value={answers[prayer.id] || ''}
                  onChange={(e) =>
                    setAnswers({ ...answers, [prayer.id]: e.target.value })
                  }
                  placeholder="Enter how & when prayer was answered"
                  style={{
                    padding: '5px',
                    width: '250px',
                    marginRight: '10px',
                    borderRadius: '5px',
                  }}
                />
                <button
                  onClick={() => handleAnswerSubmit(prayer.id)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Submit Answer
                </button>
              </div>

              {/* Display Answers */}
              {prayer.answers && prayer.answers.length > 0 && (
                <div>
                  <strong>Answers:</strong>
                  <ul>
                    {prayer.answers.map((answer: string, index: number) => (
                      <li key={index}>{answer}</li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))
        ) : (
          <p>No prayers available</p>
        )}
      </ul>
    </div>
  );
};

export default Prayers;

