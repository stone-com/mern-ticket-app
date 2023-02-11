import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <section className='heading'>
        {user && <h1>Hello {user.name.split(' ')[0]}</h1>}
        <h1>What do you need help with?</h1>
        <p>Please choose from an option below</p>
      </section>

      <Link to='/new-ticket' className='btn btn-reverse btn-block'>
        <FaQuestionCircle /> Create New Ticket
      </Link>
      <Link to='/tickets' className='btn btn-block'>
        <FaTicketAlt /> View my tickets
      </Link>
    </>
  );
};
export default Home;
