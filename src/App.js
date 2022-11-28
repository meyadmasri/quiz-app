import { useState } from 'react';
import './App.css';
import Quiz from './components/Quiz/Quiz';

const App = () => {
  const [startTest,setStartTest]= useState(true)
  const [showQustions,setShowQuistions]=useState(false)
  const [goBack, setChecked] = useState(true);


  const hideAndShow = ()=>{
    setStartTest((i)=>!i)
    setShowQuistions((j)=>!j)
  }

  return (
    <div className='app p-5 m-auto mt-5 d-flex justify-content-center'>
     {
     startTest &&
     <div className=' '>
      <div className='h2 pb-5'> <h2 >Welcome to our Test</h2></div>
      <div className='form-check-label'>
        <input className='form-check-input' type='checkbox' id='flexCheckDefault' onClick={()=>setChecked((x) => !x)}/> <label className='form-check-label' for='flexCheckDefault'>Disable go Back!</label>
      </div >
      <div className='pt-4'>
      <button className='btn btn-secondary' type='butotn' onClick={hideAndShow}>Start</button>
      </div>
     </div>
     }
     <div>{showQustions&& <Quiz goBack={goBack}/>}</div>
    </div>
  );
}

export default App;
