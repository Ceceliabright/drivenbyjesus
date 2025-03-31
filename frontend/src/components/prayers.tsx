import React, { useState, useEffect, useCallback } from 'react';
import { fetchData, saveData, updateData, deleteData } from './CrudService';

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

  // State for Bible verses related to prayers
  const [bibleVersesPrayers, setBibleVersesPrayers] = useState<any[]>([]);
  const [currentVerse, setCurrentVerse] = useState<any | null>(null);

  useEffect(() => {
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
    <div>


      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Random Bible Verse Display */}
      {currentVerse && (
        <div style={{ marginBottom: '20px', padding: '10px', paddingTop: '400px', backgroundColor: 'lightgreen', borderRadius: '5px' }}>
          <h2>What God says about prayer</h2>
          <blockquote style={{ fontStyle: 'italic', fontSize: '18px' }}>
            "{currentVerse.verse}"
          </blockquote>
          <p>{currentVerse.reference}</p>
          <button onClick={reloadVerse} style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: '#4CAF90', color: 'white' }}>
            What else God says about prayer
          </button>
        </div>
      )}

      <div>

        <input
          type="text"
          placeholder="My prayer"
          value={newPrayer}
          onChange={(e) => setNewPrayer(e.target.value)}
          style={{ padding: '8px', marginRight: '5px', borderRadius: '5px', border: '1px solid #4CAF50' }}
        />
        <input
          type="text"
          placeholder="My reason"
          value={newReason}
          onChange={(e) => setNewReason(e.target.value)}
          style={{ padding: '8px', marginRight: '5px', borderRadius: '5px', border: '1px solid #4CAF50' }}
        />
        <button
          onClick={handleAddPrayer}
          style={{ padding: '8px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Add Prayer
        </button>
        <h1>Prayer List</h1>
      </div>

      <ul>
        {prayers.slice().reverse().map((prayerItem) => (
          <li key={prayerItem.id} style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#A5D6A7', borderRadius: '5px' }}>
            {editingPrayer === prayerItem.id ? (
              <div>
                <input
                  type="text"
                  value={editPrayerText}
                  onChange={(e) => setEditPrayerText(e.target.value)}
                  style={{ padding: '8px', marginRight: '5px', borderRadius: '5px', border: '1px solid #4CAF50' }}
                />
                <input
                  type="text"
                  value={editReason}
                  onChange={(e) => setEditReason(e.target.value)}
                  style={{ padding: '8px', marginRight: '5px', borderRadius: '5px', border: '1px solid #4CAF50' }}
                />
                <button
                  onClick={() => handleUpdate(prayerItem.id)}
                  style={{ padding: '8px', backgroundColor: '#66BB6A', color: 'white', border: 'none', borderRadius: '5px', marginRight: '5px' }}
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingPrayer(null)}
                  style={{ padding: '8px', backgroundColor: '#388E3C', color: 'white', border: 'none', borderRadius: '5px' }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <p><strong>Prayer:</strong> {prayerItem.prayer}</p>
                <p><strong>Reason:</strong> {prayerItem.reason}</p>
                <p><strong>Date:</strong> {prayerItem.date}</p>
                <button
                  onClick={() => {
                    setEditingPrayer(prayerItem.id);
                    setEditPrayerText(prayerItem.prayer);
                    setEditReason(prayerItem.reason);
                  }}
                  style={{ padding: '8px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', marginRight: '5px' }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(prayerItem.id)}
                  style={{ padding: '8px', backgroundColor: '#388E3C', color: 'white', border: 'none', borderRadius: '5px' }}
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





// import React, { useState, useEffect } from 'react';
// import { fetchData, saveData, updateData, deleteData } from './CrudService';

// interface Prayer {
//   id: number;
//   prayer: string;
//   reason: string;
//   date: string;
// }

// const Prayers: React.FC = () => {
//   const [prayers, setPrayers] = useState<Prayer[]>([]);
//   const [newPrayer, setNewPrayer] = useState('');
//   const [newReason, setNewReason] = useState('');
//   const [editingPrayer, setEditingPrayer] = useState<number | null>(null);
//   const [editPrayerText, setEditPrayerText] = useState('');
//   const [editReason, setEditReason] = useState('');
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const loadPrayers = async () => {
//       try {
//         const data = await fetchData('prayers');
//         setPrayers(data);
//       } catch (error) {
//         setError('Error fetching prayers');
//       }
//     };

//     loadPrayers();
//   }, []);

//   const handleAddPrayer = async () => {
//     if (!newPrayer || !newReason) {
//       setError('Prayer and reason cannot be empty');
//       return;
//     }

//     const newPrayerItem = {
//       prayer: newPrayer,
//       reason: newReason,
//       date: new Date().toLocaleString(),
//     };

//     try {
//       const savedPrayer = await saveData('prayers', newPrayerItem);
//       setPrayers([...prayers, savedPrayer]);
//       setNewPrayer('');
//       setNewReason('');
//       setError('');
//     } catch (error) {
//       setError('Error saving prayer');
//     }
//   };

//   const handleUpdate = async (id: number) => {
//     if (!editPrayerText || !editReason) {
//       setError('Prayer and reason cannot be empty');
//       return;
//     }

//     const updatedPrayer = {
//       prayer: editPrayerText,
//       reason: editReason,
//       date: new Date().toLocaleString(),
//     };

//     try {
//       const updated = await updateData('prayers', id, updatedPrayer);
//       setPrayers((prevPrayers) =>
//         prevPrayers.map((item) =>
//           item.id === id ? { ...item, ...updated } : item
//         )
//       );
//       setEditingPrayer(null);
//       setError('');
//     } catch (error) {
//       setError('Error updating prayer');
//     }
//   };

//   const handleDelete = async (id: number) => {
//     try {
//       await deleteData('prayers', id);
//       setPrayers(prayers.filter((item) => item.id !== id));
//     } catch (error) {
//       setError('Error deleting prayer');
//     }
//   };

//   return (
//     <div>
//       <h1>Prayer List</h1>

//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       <div>
//         <input
//           type="text"
//           placeholder="Enter prayer"
//           value={newPrayer}
//           onChange={(e) => setNewPrayer(e.target.value)}
//           style={{ padding: '8px', marginRight: '5px', borderRadius: '5px', border: '1px solid #4CAF50' }}
//         />
//         <input
//           type="text"
//           placeholder="Enter reason"
//           value={newReason}
//           onChange={(e) => setNewReason(e.target.value)}
//           style={{ padding: '8px', marginRight: '5px', borderRadius: '5px', border: '1px solid #4CAF50' }}
//         />
//         <button
//           onClick={handleAddPrayer}
//           style={{ padding: '8px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}
//         >
//           Add Prayer
//         </button>
//       </div>

//       <ul>
//         {prayers.map((prayerItem) => (
//           <li
//             key={prayerItem.id}
//             style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#A5D6A7', borderRadius: '5px' }}
//           >
//             {editingPrayer === prayerItem.id ? (
//               <div>
//                 <input
//                   type="text"
//                   value={editPrayerText}
//                   onChange={(e) => setEditPrayerText(e.target.value)}
//                   style={{ padding: '8px', marginRight: '5px', borderRadius: '5px', border: '1px solid #4CAF50' }}
//                 />
//                 <input
//                   type="text"
//                   value={editReason}
//                   onChange={(e) => setEditReason(e.target.value)}
//                   style={{ padding: '8px', marginRight: '5px', borderRadius: '5px', border: '1px solid #4CAF50' }}
//                 />
//                 <button
//                   onClick={() => handleUpdate(prayerItem.id)}
//                   style={{ padding: '8px', backgroundColor: '#66BB6A', color: 'white', border: 'none', borderRadius: '5px', marginRight: '5px' }}
//                 >
//                   Save
//                 </button>
//                 <button
//                   onClick={() => setEditingPrayer(null)}
//                   style={{ padding: '8px', backgroundColor: '#388E3C', color: 'white', border: 'none', borderRadius: '5px' }}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <p><strong>Prayer:</strong> {prayerItem.prayer}</p>
//                 <p><strong>Reason:</strong> {prayerItem.reason}</p>
//                 <p><strong>Date:</strong> {prayerItem.date}</p>
//                 <button
//                   onClick={() => {
//                     setEditingPrayer(prayerItem.id);
//                     setEditPrayerText(prayerItem.prayer);
//                     setEditReason(prayerItem.reason);
//                   }}
//                   style={{ padding: '8px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', marginRight: '5px' }}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(prayerItem.id)}
//                   style={{ padding: '8px', backgroundColor: '#388E3C', color: 'white', border: 'none', borderRadius: '5px' }}
//                 >
//                   Delete
//                 </button>
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Prayers;


