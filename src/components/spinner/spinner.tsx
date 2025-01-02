import './spinner.css';

export default function Spinner() {
  return (
    <div className={'spinner-container'}>
      <div className={'spinner-spinner'}></div>
      <p className={'spinner-text'}>Loading...</p>
    </div>
  );
}

