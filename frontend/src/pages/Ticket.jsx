import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { FaPlus } from 'react-icons/fa';
import { getTicket, closeTicket } from '../features/tickets/ticketSlice';
import { getNotes, reset as notesReset } from '../features/notes/noteSlice';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../Components/BackButton';
import Spinner from '../Components/Spinner';
import NoteItem from '../Components/NoteItem';

// Custom styles for the modal
const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
};

Modal.setAppElement('#root');

const Ticket = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState('');

  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.ticket
  );

  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.note
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ticketId } = useParams();

  // close ticket
  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success('Ticked Closed');
    navigate('/tickets');
  };

  // Open / close the modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  // Submit the note
  const onNoteSubmit = (e) => {
    e.preventDefault();
    console.log('Submit!');
    setNoteText('');
    closeModal();
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));
    // eslint-disable-next-line
  }, [isError, message, ticketId]);

  if (isLoading || notesIsLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Something went wrong!</h3>;
  }
  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton url='/tickets' />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-Us')}
        </h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className='ticket-desc'>
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>
      {/* Only show the add note button if the ticket is open */}
      {ticket.status !== 'closed' && (
        <button className='btn' onClick={openModal}>
          <FaPlus />
          Add Note
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Add Note'
      >
        <h2>Add Note</h2>
        <button className='btn-close' onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className='form-group'>
            <textarea
              name='noteText'
              id='noteText'
              className='form-control'
              placeholder='Note text'
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}
      {ticket.status !== 'closed' && (
        <button className='btn btn-block btn-danger' onClick={onTicketClose}>
          Close Ticket
        </button>
      )}
    </div>
  );
};
export default Ticket;
