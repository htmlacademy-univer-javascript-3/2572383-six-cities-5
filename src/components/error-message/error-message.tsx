import './error-message.css';
import {useAppSelector} from '../../store';

function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector((state) => state.user.error);

  return (error)
    ? <div className='error-message'>{error}</div>
    : null;

}

export default ErrorMessage;
