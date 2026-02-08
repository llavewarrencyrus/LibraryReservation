import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';
import styles from './Activity.module.css';
import {
    FaSearch,
    FaCalendarAlt,
    FaClock,
    FaMapMarkerAlt,
} from 'react-icons/fa';
import { getImageUrl } from '../../utils';

const Activity = () => {
    const [activities, setActivities] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [itemOffset, setItemOffset] = useState(0);
    const searchInputRef = useRef(null);

    const itemsPerPage = 5;
    const [isLoading, setIsLoading] = useState(true); // Default to true while fetching

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetch(
                    'https://api.sheetbest.com/sheets/85a9d105-b3fc-44a1-9bb1-4709504cc01b'
                );
                if (response.ok) {
                    const data = await response.json();
                    setActivities(data);
                    setIsLoading(false); // Set to false when data is loaded
                } else {
                    console.error('Failed to fetch activities');
                    setIsLoading(false); // Set to false if there's an error
                }
            } catch (error) {
                console.error('Error fetching activities:', error);
                setIsLoading(false); // Set to false if there's an error
            }
        };

        fetchActivities();
    }, []);

    const filteredActivities = activities.filter((activity) => {
        const title = activity.title ? activity.title.toLowerCase() : '';
        const description = activity.description ? activity.description.toLowerCase() : '';
        return (
            title.includes(searchQuery.toLowerCase()) ||
            description.includes(searchQuery.toLowerCase())
        );
    });

    const currentItems = filteredActivities.slice(itemOffset, itemOffset + itemsPerPage);
    const pageCount = Math.ceil(filteredActivities.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % filteredActivities.length;
        setItemOffset(newOffset);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setItemOffset(0);
    };

    const handleSearchButtonClick = () => {
        if (!searchQuery.trim()) {
            searchInputRef.current.focus();
        }
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setItemOffset(0);
        searchInputRef.current.focus();
    };

    const openModal = (activity) => {
        setSelectedActivity(activity);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedActivity(null);
    };

    // Web3Form submission logic
    const onSubmit = async (event) => {
        event.preventDefault();
        Swal.fire({
            title: 'Sending...',
            text: 'Your request is being processed.',
            icon: 'info',
            showConfirmButton: false,
        });

        const formData = new FormData(event.target);
        formData.append("access_key", "99c912f3-385f-40fb-8bea-f10460151cdf"); // Add Web3Form API key

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (data.success) {
            Swal.fire({
                title: 'Success!',
                text: 'You have successfully joined the activity.',
                icon: 'success',
                confirmButtonText: 'OK',
            }).then(() => {
                closeModal();
            });
        } else {
            console.log("Error", data);
            Swal.fire({
                title: 'Error!',
                text: data.message || 'An error occurred. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <section className={styles.activitiesSection}>
            <div className={styles.header}>
                <h2 className={styles.title}>Activities</h2>
                <div className={styles.searchBar}>
                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search activities..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className={styles.searchInput}
                    />
                    {!searchQuery ? (
                        <button onClick={handleSearchButtonClick} className={styles.searchButton}>
                            <FaSearch />
                        </button>
                    ) : (
                        <button onClick={handleClearSearch} className={styles.clearButton}>
                            ✖
                        </button>
                    )}
                </div>
            </div>

            {/* Loading State */}
            {isLoading ? (
                <div className={styles.loadingContainer}>
                    <img src={getImageUrl('activities/loading.gif')} className={styles.loading} alt="Loading..." />
                </div>
            ) : (
                <div className={styles.activitiesContainer}>
                    {currentItems.length === 0 ? (
                        <div className={styles.noResults}>
                            <p>No activities found for "{searchQuery}". Try another keyword.</p>
                        </div>
                    ) : (
                        currentItems.map((activity, index) => (
                            <div
                                key={activity.id}
                                className={`${styles.card} ${index % 2 !== 0 ? styles.reverse : ''}`}
                            >
                                <div className={styles.textContainer}>
                                    <h3 className={styles.activityTitle}>{activity.title}</h3>
                                    <p className={styles.description}>{activity.description}</p>
                                    <button
                                        className={styles.joinButton}
                                        onClick={() => openModal(activity)}
                                    >
                                        Join
                                    </button>
                                </div>
                                <div className={styles.imageContainer}>
                                    <div className={styles.calendar}>
                                        <span className={styles.calendarDate}>{formatDate(activity.date)}</span>
                                        <span className={styles.calendarTime}>
                                            {activity.startTime} - {activity.endTime}
                                        </span>
                                    </div>
                                    <img
                                        src={activity.imageUrl || getImageUrl(activity.image)}
                                        alt={activity.title}
                                        className={styles.image}
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {filteredActivities.length > itemsPerPage && (
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="<"
                    containerClassName={styles.pagination}
                    pageClassName={styles.page}
                    pageLinkClassName={styles.pageLink}
                    activeClassName={styles.active}
                    previousClassName={styles.previous}
                    nextClassName={styles.next}
                />
            )}

{isModalOpen && selectedActivity && (
    <div className={styles.modalOverlay}>
        <div className={styles.modal}>
                <button className={styles.closeButton} onClick={closeModal}>
                    &times;
                </button>
                <div className={styles.modalFormContainer}>
                    <h3 className={styles.modalTitle}>Request to Join</h3>
                    <form onSubmit={onSubmit} className={styles.modalForm}>
                        {/* Hidden fields for activity data */}
                        <input
                            type="hidden"
                            name="activityTitle"
                            value={selectedActivity.title}
                        />
                        <input
                            type="hidden"
                            name="activityDate"
                            value={selectedActivity.date}
                        />
                        <input
                            type="hidden"
                            name="activityLocation"
                            value={selectedActivity.location}
                        />

                        <label>Full Name:</label>
                        <input
                            type="text"
                            className={styles.inputField}
                            name="name"
                            placeholder="Enter your full name"
                            required
                        />

                        <label>Email:</label>
                        <input
                            type="email"
                            className={styles.inputField}
                            name="email"
                            placeholder="Enter your email"
                            required
                        />

                        <label>Mobile Number:</label>
                        <input
                            type="tel"
                            className={styles.inputField}
                            name="mobile"
                            placeholder="Enter your mobile number"
                            required
                        />

                        <label>Gender:</label>
                        <select
                            className={styles.inputField}
                            name="gender"
                            required
                        >
                            <option value="" disabled selected>Select your gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>

                        <label>Age:</label>
                        <input
                            type="number"
                            className={styles.inputField}
                            name="age"
                            placeholder="Enter your age"
                            required
                            min="1"
                            max="120"
                        />

                    

                        <button type="submit" className={styles.submitButton}>
                            Submit
                        </button>
                    </form>
                </div>
                <div className={styles.modalImageContainer}>
                    <h3 className={styles.modalBookTitle}>{selectedActivity.title}</h3>
                    <p className={styles.modalDescription}>
                        {selectedActivity.description}
                    </p>
                    <p className={styles.modalDetails}>
                        <FaCalendarAlt className={styles.icon} /> Date:{' '}
                        {formatDate(selectedActivity.date)}
                    </p>
                    <p className={styles.modalDetails}>
                        <FaClock className={styles.icon} /> Time:{' '}
                        {selectedActivity.startTime} - {selectedActivity.endTime}
                    </p>
                    <p className={styles.modalDetails}>
                        <FaMapMarkerAlt className={styles.icon} /> Location:{' '}
                        {selectedActivity.location}
                    </p>
                    <img
                        src={selectedActivity.imageUrl || getImageUrl(selectedActivity.image)}
                        alt={selectedActivity.title}
                        className={styles.modalImage}
                    />
                </div>
        
        </div>
    </div>
)}

            
        </section>
    );
};

export default Activity;
