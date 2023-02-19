import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getTicket, closeTicket } from '../features/tickets/ticketSlice';
import { getNotes, reset as notesReset } from '../features/notes/noteSlice';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../Components/BackButton';
import Spinner from '../Components/Spinner';
import NoteItem from '../Components/NoteItem';

const Ticket = () => {
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
