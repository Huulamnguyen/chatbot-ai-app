import { useEffect, useState } from 'react';
import { Button } from './components/ui/button';

function App() {
   const [message, setMessage] = useState('');

   useEffect(() => {
      fetch('/api/hello')
         .then((res) => res.json())
         .then((data) => setMessage(data.message))
         .catch((err) => console.error('Error fetching message:', err));
   }, []);

   return (
      <div>
         <h1 className="text-3xl font-bold text-cyan-400 text-center p-4">
            {message || 'Loading...'}
         </h1>
         <Button className="mx-auto block">Click Me!</Button>
      </div>
   );
}

export default App;
