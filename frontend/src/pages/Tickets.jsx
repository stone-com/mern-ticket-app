import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTickets, reset } from '../features/tickets/ticketSlice';
import Spinner from '../Components/Spinner';
import BackButton from '../Components/BackButton';
import TicketItem from '../Components/TicketItem';
import { useAuthStatus } from '../hooks/useAuthStatus';

const Tickets = () => {
  const { tickets, isLoading, isSuccess } = useSelector(
    (state) => state.ticket
  );
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url='/' />
      <h1>Tickets</h1>
      <div className='ticket-headings'>
        <div>Date</div>
        <div>Product</div>
        <div>Status</div>
        <div></div>
      </div>
      {tickets.map((ticket) => (
        <TicketItem key={ticket._id} ticket={ticket} />
      ))}
    </>
  );
};
export default Tickets;
