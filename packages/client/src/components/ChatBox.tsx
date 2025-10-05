import { Button } from './ui/button';
import { FaArrowUp } from 'react-icons/fa6';

const ChatBox = () => {
   return (
      <div className="flex flex-col gap-2 items-end p-4 border-2 rounded-3xl">
         <textarea
            placeholder="Ask Anything"
            className="w-full border-0 focus:outline-0 resize-none"
            maxLength={1000}
         />
         <Button className="rounded-full w-9 h-9">
            <FaArrowUp />
         </Button>
      </div>
   );
};

export default ChatBox;
