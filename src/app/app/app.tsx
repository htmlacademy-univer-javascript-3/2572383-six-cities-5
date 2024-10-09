import MainPage from '../../pages/main/main-page.tsx';

export default function App(props: {placesCount: number}){
  return (
    <MainPage placesCount={props.placesCount}/>
  );
}
