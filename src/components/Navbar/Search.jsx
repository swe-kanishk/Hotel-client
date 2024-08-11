import React, { useState } from 'react';
import SearchModal from '../modals/SearchModal';
import useSearchModal from '../../hooks/useSearchModal';

export default function Search() {
    const [location, setLocation] = useState('Anywhere');
    const [week, setWeek] = useState('Any week');
    const [guests, setGuests] = useState('Add guests');

    const searchModal = useSearchModal();

    function getFromChild(newLocation, guestsCount) {
      const cleanedLocation = newLocation.label.split(' ').slice(1).join(' ');
      console.log(cleanedLocation)
    
      setLocation(cleanedLocation || 'Anywhere');
      setGuests(`${guestsCount} guests` || 'Add guests');
      setWeek('1 week');
    }
      

    return (
        <>
            <div 
                onClick={searchModal.open} 
                className='flex border border-gray-300 gap-3 justify-center rounded-full py-[0.4rem] px-4 shadow-sm shadow-gray-200 text-[15px] hover:shadow-md hover:shadow-gray-300 cursor-pointer md:w-auto'
            >
                <div className='self-center'>{location}</div>
                <div className="border-l border-gray-300 tiny:hidden"></div>
                <div className='self-center tiny:hidden'>{week}</div>
                <div className="border-l border-gray-300 tiny:hidden"></div>
                <div className='text-gray-500 font-light self-center xs:hidden'>{guests}</div>
                <button className='bg-primary text-white rounded-full p-2 self-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
            </div>

            <SearchModal 
                isOpen={searchModal.isOpen}
                onClose={searchModal.close}
                getFromChild={getFromChild}
            />
        </>
    );
}
