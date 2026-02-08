import React, { useState, useRef, useEffect } from 'react';
import { booksData } from './BookData';
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';

import { FaTh, FaList, FaAngleLeft, FaAngleRight, FaSearch, FaTrash } from 'react-icons/fa';
import { LuBookCopy } from "react-icons/lu";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './BookLists.module.css';
import { getImageUrl } from "../../utils";

const BookLists = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isListModalOpen, setIsListModalOpen] = useState(false);

    const [selectedBook, setSelectedBook] = useState(null);

    const [itemOffset, setItemOffset] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef(null);
    const [isGridView, setIsGridView] = useState(true);
    const itemsPerPage = 10;

    const [isLoading, setIsLoading] = useState(false);

    const [bookListData, setBookListData] = useState([]);

    const STORAGE_KEY = 'selected_books';

    const [selectedBooks, setSelectedBooks] = useState(() => {
        const storedBooks = localStorage.getItem(STORAGE_KEY);
        return storedBooks ? JSON.parse(storedBooks) : [];
    });

    const getBookList = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('https://api.sheetbest.com/sheets/288fce7e-70da-4558-b018-d9e3e3470d84');
            const data = await res.json();
            setBookListData(data || []);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getBookList();
    }, []);

    useEffect(() => {
        setItemOffset(0); // Reset pagination when new data is loaded
    }, [bookListData]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedBooks));
    }, [selectedBooks]);

    const openModal = (book) => {
        setSelectedBook(book);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedBook(null);
    };
    // Filter books based on search query
    const filteredBooks = bookListData.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    const currentItems = filteredBooks.slice(itemOffset, itemOffset + itemsPerPage);
    const pageCount = Math.ceil(filteredBooks.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % filteredBooks.length; // Remove modulo operation
        setItemOffset(newOffset);

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setItemOffset(0); // Reset pagination on new search
    };

    const handleSearchButtonClick = () => {
        if (!searchQuery.trim()) {
            // Focus on the input if no search query
            searchInputRef.current.focus();
        } else {
            // Submit the search query
            console.log('Search submitted:', searchQuery);
        }
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setItemOffset(0);
        searchInputRef.current.focus();
    };

    const handleMultiReserve = (book, e) => {
        const books = Array.isArray(selectedBooks) ? selectedBooks : [];

        if (books.some((b) => b.title === book.title)) {
            notifyAlreadyExists();
            return;
        }
        if (books.length >= 5) {
            notifyPolicy();
            return;
        }
        notifyAdded();
        setSelectedBooks([...books, book]);
    };


    const handleRemoveList = (book) => {
        if (selectedBooks.length < 2) {
            setIsListModalOpen(false);
        }
        setSelectedBooks(prevBooks =>
            prevBooks.filter(books => books.title !== book.title)
        );

    }

    const notifyAdded = () => toast.success('Added to Reserve List');

    const notifyAlreadyExists = () => toast.warning('Already added in Reserve List');

    const notifyPolicy = () => toast.info('You can only reserve 5 books at a time');

    const BookModal = ({ book, closeModal }) => {
        return (
            <div className={styles.modalOverlay}>
                <div className={styles.modal}>
                    <button className={styles.closeButton} onClick={closeModal}>×</button>
                    <div className={styles.bookDetails}>
                        <div className={styles.modalImageContainer}>
                            {book.imageUrl ? (<img src={book.imageUrl} alt={book.title} className={styles.modalImage} />) : (
                                <img src={getImageUrl("books/book-cover-placeholder.png")} alt={book.title} className={styles.modalImage} />
                            )}
                        </div>

                        <div className={styles.bookAttr}>
                            <div className={styles.bookModalTitle}>
                                <h2>{book.title}</h2>
                            </div>
                            <div className={styles.bookDetailsGrid}>
                                {book.author ? (<div><p>Author</p> {book.author}</div>) : null}
                                {book.section ? (<div><p>Section</p> {book.section}</div>) : null}
                                {book.publisher ? (<div><p>Publisher</p> {book.publisher}</div>) : null}
                                {book.placeOfPublication ? (<div><p>Place of Publication</p> {book.placeOfPublication}</div>) : null}
                                {book.callNumber ? (<div><p>Call Number</p> {book.callNumber}</div>) : null}
                                {book.status ? (<div><p>Status</p> {book.status}</div>) : null}
                            </div>
                            <hr />
                            {book.description ? (
                                <>
                                    <div className={styles.modalDetails}><h3>Description</h3></div>
                                    <div className={styles.modalDescription}>{book.description}</div>
                                </>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const BookCard = ({ book }) => {
        const [isModalOpen, setIsModalOpen] = useState(false);

        const openViewModal = () => setIsModalOpen(true);
        const closeViewModal = () => setIsModalOpen(false);
        return (
            <>
                <div className={styles.card} >
                    <div className={styles.imageContainer} onClick={openViewModal}>
                        {book.imageUrl ? (<img src={book.imageUrl} alt={book.title} className={styles.image} />) : (
                            <img src={getImageUrl("books/book-cover-placeholder.png")} alt={book.title} className={styles.image} />
                        )}
                    </div>
                    <h3 className={styles.bookTitle} onClick={openViewModal}>{book.title}</h3>
                    <p className={styles.author} onClick={openViewModal}>{book.author}</p>
                    <p className={styles.description}>{book.description}</p>
                    <div className={styles.hiddenButton}>
                        {(book.status && book.status.toLowerCase() === 'available') ? (
                            <>
                                <button className={styles.reserveButton} onClick={() => openModal(book)}>Reserve Now</button>
                                <button className={styles.reserveButton} onClick={() => handleMultiReserve(book)}>Add to Reserve List</button>
                            </>
                        ) : (
                            <div className={styles.unavailable}><p>{book.status}</p></div>
                        )}

                    </div>
                </div>
                {isModalOpen && <BookModal book={book} closeModal={closeViewModal} />}
            </>
        );
    };

    const BookList = ({ books, type }) => {
        return (
            <div>
                {/* Header for the entire list */}
                <div className={styles.listHeader} data-type={type}>
                    <div className={styles.listColumn} data-label="Cover"><strong>Cover</strong></div>
                    <div className={styles.listColumn} data-label="Title"><strong>Title</strong></div>
                    <div className={styles.listColumn} data-label="Author/s"><strong>Author/s</strong></div>
                    <div className={styles.listColumn} data-label="Subject"><strong>Subject</strong></div>
                    {type === 'reserve' && (
                        <>
                            <div className={styles.listColumn} data-label="Edition"><strong>Edition</strong></div>
                            <div className={`${styles.listColumn} ${styles.responsiveDescription}`} data-label="Description"><strong>Description</strong></div>
                            <div className={styles.listColumn}><strong></strong></div>
                        </>
                    )}
                </div>

                {/* List items */}
                <div className={styles.listContainer}>
                    {books.map((book, index) => (
                        <BookListItem
                            key={book.id || `${index}-${book.title}`}
                            book={book}
                            type={type}
                        />
                    ))}
                </div>
            </div>
        );
    };

    const BookListItem = ({ book, type }) => {
        const [isModalOpen, setIsModalOpen] = useState(false);

        const openViewModal = () => setIsModalOpen(true);
        const closeViewModal = () => setIsModalOpen(false);
        return (
            <div className={styles.listItemContainer}>
                <button className={styles.listItem} onClick={openViewModal}>
                    <div className={styles.listAttributes} data-type={type}>
                        <div className={styles.listColumn}>
                            <img
                                src={book.imageUrl || getImageUrl("books/book-cover-placeholder.png")}
                                alt={book.title}
                                className={styles.listImage}
                            />
                        </div>

                        <div className={styles.listColumn}>
                            <p>{book.title}</p>
                        </div>

                        <div className={styles.listColumn}>
                            <p>{book.author}</p>
                        </div>

                        <div className={styles.listColumn}>
                            <p>{book.subjects || "N/A"}</p>
                        </div>

                        {type === 'reserve' && (
                            <>
                                <div className={styles.listColumn}>
                                    <p>{book.edition || "Unknown"}</p>
                                </div>

                                <div className={`${styles.listColumn} ${styles.responsiveDescription}`}>
                                    <div className={styles.description}>
                                        <p>{book.description}</p>
                                    </div>
                                </div>

                                <div className={styles.listColumn} data-label="Status">
                                    {(book.status && book.status.toLowerCase() === 'available') ? (
                                        <>
                                            <button
                                                className={styles.reserveButton}
                                                onClick={(e) => openModal(book)}
                                            >
                                                Reserve Now
                                            </button>
                                            <button
                                                className={styles.reserveButton}
                                                onClick={(e) => handleMultiReserve(book)}
                                            >
                                                Add to Reserve List
                                            </button>
                                        </>
                                    ) : (
                                        <div className={styles.unavailable}>
                                            <p>{book.status}</p>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>

                    <div className={styles.listMobile}>
                        <div>
                            <img
                                src={book.imageUrl || getImageUrl("books/book-cover-placeholder.png")}
                                alt={book.title}
                                className={styles.listImage}
                            />
                        </div>
                        <div className={styles.listMobileDetails}>
                            <h3>{book.title}</h3>
                            <div>
                                <h5>{book.author}</h5>
                                <p>{book.edition}</p>
                            </div>
                            <div className={styles.listMobileBtn}>
                                {(book.status && book.status.toLowerCase() === 'available') ? (
                                    <>
                                        <button
                                            className={`${styles.reserveButton} ${styles.listReserveBtn}`}
                                            onClick={(e) => openModal(book)}
                                        >
                                            Reserve Now
                                        </button>
                                        <button
                                            className={`${styles.reserveButton} ${styles.listReserveBtn}`}
                                            onClick={(e) => handleMultiReserve(book)}
                                        >
                                            Add to Reserve List
                                        </button>
                                    </>
                                ) : (
                                    <div className={styles.unavailable}>
                                        <p>{book.status}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </button>
                {isModalOpen && <BookModal book={book} closeModal={closeViewModal} />}
            </div>
        );
    };

    const BookForm = () => {
        const [formData, setFormData] = useState({
            name: '',
            contact: '',
            address: '',
            school: '',
            company: '',
            course_Or_Grade: '',
            pickUpDate: '',
        });
        const [userType, setUserType] = useState('student');
        const [submitBooks, setSubmitBooks] = useState([]);
        const [formatBooks, setFormatBooks] = useState('');

        const [errorNameMessage, setErrorNameMessage] = useState('');
        const [errorContactMessage, setErrorContactMessage] = useState('');

        useEffect(() => {
            setSubmitBooks(selectedBook ? [selectedBook] : selectedBooks);
        }, [])

        useEffect(() => {
            setFormatBooks(submitBooks
                .map((book, index) =>
                    `${index + 1}. Title: ${book.title}\n   Author: ${book.author}\n   Publisher: ${book.publisher}\n   Edition: ${book.edition}`
                )
                .join("\n\n")
            );
        }, [submitBooks]);

        // Handle input changes
        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
        };

        // Handle user type change
        const handleUserTypeChange = (e) => {
            setUserType(e.target.value);
        };

        const handleContactChange = (e) => {
            const value = e.target.value;

            if (!/^\d*$/.test(value)) {
                // If the input is not numeric
                setErrorContactMessage('Only numbers are accepted.');
            } else if (value.length > 11) {
                // If the input length exceeds 11
                setErrorContactMessage('Input length should not exceed 11 characters.');
            } else if (value.length < 11) {
                // If the input length is less than 11
                setErrorContactMessage('Input length should be 11 characters.');
            } else {
                // If input is valid
                setErrorContactMessage('');
            }

            // Allow only valid numeric input
            if (/^\d*$/.test(value) && value.length <= 11) {
                setFormData((prev) => ({ ...prev, contact: value }));
            }
        };

        // Submit the form
        const handleSubmit = async (e) => {
            e.preventDefault();
            Swal.fire({
                title: 'Sending...',
                text: 'Submitting your reservation.',
                icon: 'info',
                showConfirmButton: false,
            });

            const formData = new FormData(e.target);
            formData.append('selected_books', formatBooks);
            formData.append('access_key', '99c912f3-385f-40fb-8bea-f10460151cdf');

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();

                if (data.success) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Reservation successfully submitted.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    }).then(() => {
                        e.target.reset();
                        setSelectedBooks([]);
                        setSubmitBooks([]);
                        setIsListModalOpen(false);
                    });
                } else {
                    console.log('Error:', data);
                    Swal.fire({
                        title: 'Error!',
                        text: data.message || 'An error occurred. Please try again later.',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                }
            } catch (error) {
                console.error('Submission Error:', error);
                Swal.fire({
                    title: 'Error!',
                    text: data.message || 'An error occurred. Please try again later.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        };

        const handleNameChange = (e) => {
            const value = e.target.value;

            // Only allow letters (a-z, A-Z) and spaces
            if (/^[a-zA-Z\s]*$/.test(value) || value === '') {
                setFormData((prev) => ({ ...prev, name: value }));
                setErrorNameMessage('');
            } else {
                setErrorNameMessage('Name can only contain letters and spaces.');
            }
        };

        return (
            <div className={styles.modalFormContainer}>
                <h3 className={styles.modalTitle}>Reserve Book</h3>
                <form onSubmit={handleSubmit} className={styles.modalForm}>
                    <label>User Type:</label>
                    <select
                        name="User Type"
                        className={styles.inputField}
                        value={userType}
                        onChange={handleUserTypeChange}
                        required
                    >
                        <option value="student">Student</option>
                        <option value="non-student">Non-Student</option>
                    </select>

                    <div className={styles.compactForm}>
                        <div className={styles.compactFormLabel}>
                            <label>Name:</label>
                            {errorNameMessage && <p style={{ color: 'red' }}>{errorNameMessage}</p>}
                            <input
                                type="text"
                                name="name"
                                className={styles.inputField}
                                value={formData.name}
                                onChange={handleNameChange}
                                onBlur={() => setErrorNameMessage('')}
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                        <div className={styles.compactFormLabel}>
                            <label>Contact Number:</label>
                            {errorContactMessage && <p style={{ color: 'red' }}>{errorContactMessage}</p>}
                            <input
                                type="text"
                                name="contact"
                                className={styles.inputField}
                                value={formData.contact}
                                onChange={handleContactChange}
                                onBlur={() => setErrorContactMessage('')}
                                placeholder="Enter your contact number"
                                required
                                maxLength={11}
                                minLength={11}
                            />

                        </div>
                    </div>

                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        className={styles.inputField}
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter your address"
                        required
                    />

                    {userType === 'student' ? (
                        <div className={styles.compactForm}>
                            <div className={styles.compactFormLabel}>
                                <label>School:</label>
                                <input
                                    type="text"
                                    name="school"
                                    className={styles.inputField}
                                    value={formData.school}
                                    onChange={handleInputChange}
                                    placeholder="Enter your school name"
                                    required
                                />
                            </div>
                            <div className={styles.compactFormLabel}>
                                <label>Course/Grade:</label>
                                <input
                                    type="text"
                                    name="course_Or_Grade"
                                    className={styles.inputField}
                                    value={formData.course_Or_Grade}
                                    onChange={handleInputChange}
                                    placeholder="Enter your course or grade"
                                    required
                                />
                            </div>
                        </div>
                    ) : (
                        <>
                            <label>Company/Organization:</label>
                            <input
                                type="text"
                                name="company"
                                className={styles.inputField}
                                value={formData.company}
                                onChange={handleInputChange}
                                placeholder="Enter your company or organization name"
                                required
                            />
                        </>
                    )}

                    <label>Pick Up Date:</label>
                    <input
                        type="date"
                        name="pickUpDate"
                        className={styles.inputField}
                        value={formData.dueDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]} // Ensures no past dates
                        required
                    />

                    <button type="submit" className={styles.submitButton}>
                        Confirm Reservation
                    </button>
                </form>
            </div>
        );
    };

    const BookReservedList = ({ book, onDelete }) => {
        return (
            <div className={styles.listItemReservedContainer}>
                <div className={styles.listItemReserved}>
                    <div className={styles.listImageColumnReserved}>
                        {book.imageUrl ? (
                            <img src={book.imageUrl} alt={book.title} className={styles.listImageReserved} />
                        ) : (
                            <img src={getImageUrl("books/book-cover-placeholder.png")} alt={book.title} className={styles.listImageReserved} />
                        )}
                    </div>
                    <div className={styles.listTitleColumnReserved}>
                        <p>{book.title}</p>
                    </div>
                    <div className={styles.deleteColumnReserved}>
                        <button className={styles.deleteButtonReserved} onClick={() => onDelete(book)}>
                            <FaTrash />
                        </button>
                    </div>
                </div>
            </div>
        );
    };


    const BookReserved = ({ book }) => {
        return (
            <div className={styles.listItemReservedContainer}>
                <div className={styles.listItemReserved}>
                    <div className={styles.listImageColumnReserved}>
                        {book.imageUrl ? (
                            <img src={book.imageUrl} alt={book.title} className={styles.listImageReserved} />
                        ) : (
                            <img src={getImageUrl("books/book-cover-placeholder.png")} alt={book.title} className={styles.listImageReserved} />
                        )}
                    </div>
                    <div className={styles.listTitleColumnReserved}>
                        <p>{book.title}</p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section className={styles.booksSection}>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="light"
                transition:Bounce
            />
            <h2 className={styles.title}>Book List</h2>
            {isLoading ? (<img src={getImageUrl('books/loading.gif')} className={styles.loading} />) : (
                <>
                    {/* Search Bar */}
                    <div className={styles.searchBar}>
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search by title, author, or description..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className={styles.searchInput}
                        />
                        {!searchQuery ? (
                            <button
                                onClick={handleSearchButtonClick}
                                className={styles.searchButton}
                                title={searchQuery.trim() ? 'Submit search' : 'Focus search'}
                            >
                                <FaSearch />
                            </button>
                        ) : (
                            <button
                                onClick={handleClearSearch}
                                className={styles.clearButton}
                                title="Clear search"
                            >
                                ✖
                            </button>
                        )}
                    </div>

                    {/* View Toggle */}
                    <div className={styles.viewToggle}>
                        <button
                            className={`${styles.toggleButton} ${isGridView ? styles.active : ''}`}
                            onClick={() => setIsGridView(true)}
                        >
                            <FaTh /> Grid View
                        </button>
                        <button
                            className={`${styles.toggleButton} ${!isGridView ? styles.active : ''}`}
                            onClick={() => setIsGridView(false)}
                        >
                            <FaList /> List View
                        </button>
                    </div>

                    {filteredBooks.length === 0 ? searchQuery ? (
                        <div className={styles.noResults}>
                            <p>No results found for "{searchQuery}". Please try again with a different keyword.</p>
                        </div>
                    ) : (
                        <div className={styles.noResults}>
                            <p>No Books Found.</p>
                        </div>
                    ) : (
                        <>
                            {/* Books View */}
                            {isGridView ? (
                                <div className={styles.booksGrid}>
                                    {currentItems.map((book) => (
                                        <BookCard key={book.id || `${book.title}-${book.author}`} book={book} />
                                    ))}
                                </div>
                            ) : (
                                <BookList books={currentItems} type='reserve' />
                            )}

                            <ReactPaginate
                                breakLabel="..."
                                nextLabel={<FaAngleRight size={26} />}
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={5}
                                pageCount={pageCount}
                                previousLabel={<FaAngleLeft size={26} />}
                                renderOnZeroPageCount={null}
                                containerClassName={styles.pagination}
                                pageLinkClassName={styles.page}
                                previousLinkClassName={styles.previous}
                                nextLinkClassName={styles.next}
                                activeLinkClassName={styles.active}
                                breakClassName={styles.breakLine}
                            />
                        </>
                    )}
                </>
            )}


            <div className={`${styles.multipleReserveContainer} ${selectedBooks.length > 0 && styles.showReserve}`} onClick={() => setIsListModalOpen(true)}>
                <div className={styles.numOfReserve}>
                    <p>{selectedBooks.length}</p>
                </div>
                <LuBookCopy size={30} color='white' />
            </div>

            {isModalOpen && selectedBook && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <button className={styles.closeButton} onClick={closeModal}>
                            &times;
                        </button>
                        <div className={styles.modalContent}>
                            <div className={styles.modalListReserve}>
                                <BookReserved key={selectedBook.title} book={selectedBook} />
                            </div>
                            <div className={styles.modalFormReserve}>
                                <BookForm />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isListModalOpen && selectedBooks.length > 0 && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <button className={styles.closeButton} onClick={() => setIsListModalOpen(false)}>
                            &times;
                        </button>
                        <div className={styles.modalContent}>
                            <div className={styles.modalListReserve}>
                                {selectedBooks.map((book) => (
                                    <BookReservedList
                                        key={book.title + book.author}
                                        book={book}
                                        onDelete={handleRemoveList}
                                    />
                                ))}
                            </div>
                            <div className={styles.modalFormReserve}>
                                <BookForm />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default BookLists;
