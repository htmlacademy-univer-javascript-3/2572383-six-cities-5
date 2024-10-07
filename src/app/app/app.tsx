import MainPage from '../../pages/main/main-page.tsx';

export default function App(props: {places_count: number}){
  return (
    <MainPage places_count={props.places_count}/>
  );
}
