import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { deleteData, updateData } from './CrudService'; // Import the CRUD functions

// Functional component to display and manage the gratitude list
const Gratitude: React.FC = () => {
  // State hooks for managing gratitude list and other states
  const [gratitudes, setGratitudes] = useState<any[]>([]); // Stores the list of gratitude entries
  const [bibleVersesGratitude, setBibleVersesGratitude] = useState<any[]>([]); // Stores Bible verses related to gratitude
  const [loading, setLoading] = useState(true); // Loading state for API requests
  const [error, setError] = useState<string | null>(null); // Error state for API requests
  const [item, setItem] = useState(''); // State for storing gratitude item
  const [reason, setReason] = useState(''); // State for storing gratitude reason
  const [formError, setFormError] = useState<string | null>(null); // Validation error for form inputs
  const [currentVerse, setCurrentVerse] = useState<any>(null); // Current Bible verse to display
  const [editMode, setEditMode] = useState<boolean>(false); // Flag to check if the component is in edit mode
  const [editingGratitude, setEditingGratitude] = useState<any | null>(null); // Stores the gratitude being edited
  const [animate, setAnimate] = useState<boolean>(false); // Animation flag for additional effects

  // useEffect to load data when the component mounts
  useEffect(() => {
    AOS.init({ duration: 2000, once: false }); // Initialize AOS (Animate on Scroll) for animations

    setLoading(true); // Set loading to true while fetching data
    fetch('http://localhost:5000/gratitudes') // Fetch gratitude list from API
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => setGratitudes(data)) // Update state with the fetched gratitude data
      .catch((error) => setError('Error fetching gratitudes')) // Handle any errors during fetching
      .finally(() => setLoading(false)); // Set loading to false after fetch is complete

    // Fetch Bible verses related to gratitude
    fetch('http://localhost:5000/bibleVersesGratitude')
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        setBibleVersesGratitude(data); // Update Bible verses state
        if (data.length > 0) setCurrentVerse(getRandomVerse(data)); // Set a random verse from the fetched list
      })
      .catch((error) => setError('Error fetching Bible verses')) // Handle any errors during fetching Bible verses
      .finally(() => setLoading(false)); // Set loading to false after Bible verses are fetched
  }, []);

  // Function to select a random Bible verse from the list
  const getRandomVerse = (verses: any[]) => verses[Math.floor(Math.random() * verses.length)];

  // Function to reload a new random Bible verse
  const reloadVerse = () => setCurrentVerse(getRandomVerse(bibleVersesGratitude));

  // Handle form submission to add a new gratitude
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (!item.trim() || !reason.trim()) { // Check if fields are empty
      setFormError('Both fields are required.'); // Set error if any field is empty
      return; // Exit if validation fails
    }
    setFormError(null); // Clear any previous errors

    const newGratitude = { item, reason, date: new Date().toLocaleString() }; // Prepare the new gratitude object

    try {
      const response = await fetch('http://localhost:5000/gratitudes', { // Make API request to add new gratitude
        method: 'POST', // POST method to create a new resource
        headers: { 'Content-Type': 'application/json' }, // Set the header to indicate JSON content
        body: JSON.stringify(newGratitude), // Convert the new gratitude object to JSON and send it in the body
      });

      if (!response.ok) throw new Error('Failed to save gratitude'); // Handle failure response

      const savedGratitude = await response.json(); // Parse the saved gratitude data
      setGratitudes((prev) => [...prev, savedGratitude]); // Update the gratitude list with the new item
      setItem(''); // Clear the item input field
      setReason(''); // Clear the reason input field
    } catch (error) {
      setError('Error saving gratitude'); // Set an error if the request fails
    }
  };

  // Handle edit button click to enable editing mode
  const handleEdit = (gratitude: any) => {
    setEditMode(true); // Set edit mode to true
    setItem(gratitude.item); // Populate the input fields with the gratitude item to edit
    setReason(gratitude.reason);
    setEditingGratitude(gratitude); // Store the gratitude being edited
  };

  // Handle update button click to save the edited gratitude
  const handleUpdate = async () => {
    if (!item.trim() || !reason.trim()) { // Check if the edited fields are empty
      setFormError('Both fields are required.'); // Show an error if any field is empty
      return; // Exit if validation fails
    }

    try {
      const updatedGratitude = { item, reason, date: new Date().toLocaleString() }; // Prepare the updated gratitude object
      const updatedData = await updateData('gratitudes', editingGratitude.id, updatedGratitude); // Make API request to update the gratitude

      setGratitudes(gratitudes.map((gratitude) =>
        gratitude.id === editingGratitude.id ? updatedData : gratitude // Update the list with the edited gratitude
      ));

      setEditMode(false); // Exit edit mode
      setItem(''); // Clear the item input field
      setReason(''); // Clear the reason input field
      setEditingGratitude(null); // Reset the editing gratitude
    } catch (error) {
      setError('Error updating gratitude'); // Show error if the update fails
    }
  };

  // Handle cancel button click to exit edit mode without saving
  const handleCancelEdit = () => {
    setEditMode(false); // Exit edit mode
    setItem(''); // Clear the item input field
    setReason(''); // Clear the reason input field
    setEditingGratitude(null); // Reset the editing gratitude
  };

  // Handle delete button click to remove a gratitude
  const handleDelete = async (id: number) => {
    try {
      await deleteData('gratitudes', id); // Make API request to delete the gratitude
      setGratitudes(gratitudes.filter((gratitude) => gratitude.id !== id)); // Remove the deleted gratitude from the list
    } catch (error) {
      setError('Error deleting gratitude'); // Show error if deletion fails
    }
  };

  return (
    <div
      style={{
        paddingTop: "1840px",
        backgroundImage: 'url("/images/sunrise.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        width: '100vw',
        position: 'relative',
      }}
    >
      <div
        className="gratitude-card p-4 rounded shadow-lg"
        style={{
          fontStyle: 'italic',
          fontSize: '2.1em',
          textAlign: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          background: 'rgba(0, 0, 0, 0.3)', // Translucent background
          color: 'white',
          marginBottom: '60px',
          width: '100vw',
          // maxWidth: '1200px',
          animation: 'moveCard 3s ease-in-out infinite',
        }}
        data-aos="slide-up"
      >
        {currentVerse && (
          <div
            className="p-4 rounded"
            style={{
              fontStyle: 'italic', fontSize: '1.1em',
              backgroundColor: 'rgba(42, 74, 62, 0.5)',
              color: 'white',
              width: 'wv100',
              marginBottom: '60px',
              animation: 'moveVerse 3s ease-in-out infinite', //Smooth animation for the verse
            }}
            data-aos="slide-up"
          >
            {/* <h3>Click Here to See What God Says About Gratitude</h3> */}
            <blockquote style={{ fontStyle: 'italic', fontSize: '1.1em' }}>"{currentVerse.verse}"</blockquote>
            <p>{currentVerse.reference}</p>
            <button
              type="submit"
              className="btn btn-secondary"
              onClick={reloadVerse}
              style={{
                padding: '12px',
                backgroundColor: '#445b48', //  color
                color: 'white',
                border: '1px solid white',
                borderRadius: '5px',
                fontSize: '1.1rem',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                marginTop: '10px',
              }}
            >Click Here To See What else God says about gratitude
            </button>
          </div>
        )}
        <form onSubmit={handleSubmit}
          data-aos="flip-up"
          style={{
            width: '90vw',
            margin: '20px auto', // Optional: Centers the form
            // padding: '20px', // Optional: Adds some padding
          }}
        >
          <div className="mb-3">
            <label className="form-label">I am grateful to God for:</label>
            <textarea
              placeholder="I am grateful for:"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              className="form-control"
              style={{
                backgroundColor: '#F1F8E9',
                border: '2px solid #4CAF50'
              }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">I am grateful because:</label>
            <input
              type="text"
              placeholder="Because:"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="form-control"
              style={{
                backgroundColor: '#F1F8E9',
                border: '2px solid #4CAF50'
              }}
            />
          </div>
          {formError && <p className="text-secondary">{formError}</p>}

          <button
            type="submit"
            className="btn btn-secondary"
            onClick={reloadVerse}
            style={{
              padding: '12px',
              backgroundColor: '#445b48', // Blue color
              color: 'white',
              border: '1px solid white',
              borderRadius: '5px',
              fontSize: '1.1rem',
              cursor: 'pointer',
              // width: '80vw',
              transition: 'background-color 0.3s',
              marginTop: '10px',
            }}
          >
            Add Gratitude
          </button>
        </form>

        <h1 className="display-4" data-aos="fade-down">Gratitude List</h1>

        <div className="container mt-4">
          <div className="row">
            {gratitudes.length > 0 ? (
              gratitudes.slice().reverse().map((gratitude) => (
                <div key={gratitude.id} className="col-md-6 col-lg-4 mb-4">


                  {/* <div className="card bg-dark text-white h-100 shadow-lg border border-success rounded-4"> */}
                  <div
                    className="card h-100 shadow-lg"
                    style={{
                      backgroundColor: 'rgba(35, 26, 26, 0.1)',  // Translucent white background
                      backdropFilter: 'blur(10px)',                // Frosted-glass effect
                      border: '2px solid rgba(0, 128, 0, 0.5)',    // Semi-transparent green border
                      color: 'white',                              // White text color
                      boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)', // Glowing shadow effect
                      borderRadius: '12px',                        // Rounded corners
                      padding: '16px'                              // Padding for content inside the card
                    }}
                  >

                    <div className="card-body">
                      <p> <strong>{gratitude.item}</strong></p>
                      <p> <strong>{gratitude.reason}</strong></p>
                      <p> {gratitude.date}</p>

                      {editMode && editingGratitude?.id === gratitude.id ? (
                        <div>
                          <div className="mb-3">
                            <label className="form-label">Edit Gratitude:</label>
                            <input
                              type="text"
                              value={item}
                              onChange={(e) => setItem(e.target.value)}
                              className="form-control"
                              style={{ backgroundColor: '#F1F8E9', border: '2px solid #4CAF50' }}
                            />
                          </div>

                          <div className="mb-3">
                            <label className="form-label">Edit Reason:</label>
                            <input
                              type="text"
                              value={reason}
                              onChange={(e) => setReason(e.target.value)}
                              className="form-control"
                              style={{ backgroundColor: '#F1F8E9', border: '2px solid #4CAF50' }}
                            />
                          </div>

                          <button onClick={handleUpdate} className="btn btn-success me-2">Save Changes</button>
                          <button onClick={handleCancelEdit} className="btn btn-outline-light">Cancel</button>
                        </div>
                      ) : (
                        <div className="mt-3">
                          <button onClick={() => handleEdit(gratitude)} className="btn btn-outline-light me-2">Edit</button>
                          <button onClick={() => handleDelete(gratitude.id)} className="btn btn-outline-danger">Delete</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No gratitudes found.</p>

            )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gratitude;
