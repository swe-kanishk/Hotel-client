import React from 'react'
import { FaCakeCandles } from "react-icons/fa6";
import { FaLocationArrow } from "react-icons/fa6";
import { HiAcademicCap } from "react-icons/hi2";


export default function OwnerCard() {
  return (
    <div className='flex gap-8 flex-col bg-red'>
      <div className='text-xl font-[500]'>Meet your Host</div>
      <div className='py-6 grid grid-cols-2 border bg-[#edaf7b] rounded-2xl'>
        <div className='flex flex-col gap-6 px-6'>
            <div className='bg-white rounded-xl w-2/5 grid grid-cols-2 pt-1 py-4 shadow-host'>
                    <div className='flex items-center justify-center'>
                        <div className='flex flex-col gap-1 items-center justify-center'>
                            <img className='h-20 w-20 rounded-full object-cover' src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1720915200&semt=sph" alt="" />
                            <div className='font-semibold text-lg'>Nishant</div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-start items-center gap-1'>
                        <div className='border-1 flex flex-col items-center py-1 border-b border-gray-300'>
                            <div className='font-semibold text-lg'>649</div>
                            <div className='text-[14px] text-gray-500'>Reviews</div>
                        </div>
                        <div className='border-1 flex flex-col items-center py-1 border-b border-gray-300'>
                            <div className='font-semibold text-lg'>4.75 </div>
                            <div className='text-[14px] text-gray-500'>Rating</div>
                        </div>
                        <div className='border-1 flex flex-col items-center py-1'>
                            <div className='font-semibold text-lg'>3</div>
                            <div className='text-[14px] text-gray-500'>Years Hosting</div>
                        </div>
                    </div>
            </div>
            <div className='py-4'>
                <div className='flex gap-4 items-center text-md font-medium'>
                    <div><FaCakeCandles /></div>
                    <div>oct 13, 1996</div>
                </div>
                <div className='flex gap-4 items-center text-md font-medium'>
                    <div><FaLocationArrow /></div>
                    <div>Rishikesh, uttarakhand</div>
                </div>
                <div className='flex gap-4 items-center text-md font-medium'>
                    <div><HiAcademicCap /></div>
                    <div>Lovely profesional university</div>
                </div>
                <div className='flex gap-4 items-center text-md font-medium'>
                    <div><i class="fa-solid fa-suitcase"></i></div>
                    <div>My work: Lifeline Villas</div>
                </div>
            </div>
        <div>
            <div className='text-xl font-semibold'>Bio</div>
            <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque non dolorem atque eum quaerat quos illum explicabo ipsam tenetur eos minima quo vel, quasi ut perferendis vitae, tempora veritatis blanditiis.</div>
        </div>
        </div>
        <div className='px-6 flex flex-col gap-3'>
            <div className='text-lg font-semibold'>Host details</div>
            <div>Languages -Hindi, English etc..</div>
            <div className='flex flex-col items-start mb-4'>
                <div>Response rate: 90%</div>
                <div>Responds within a day</div>
                <button className='rounded-lg text-lg bg-purple-700 mt-8 hover:bg-purple-600 text-white py-1 px-3'>Message Host</button>
            </div>
            <hr />
            <div className='mt-3 flex gap-4 items-center justify-start'>
                <div><i className="fa-solid fa-user-shield text-2xl text-gray-800"></i></div>
                <p className='text-gray-800'>To protect your payment, never transfer money or communicate outside of the Airbnb website or app.</p>
            </div>
        </div>
      </div>
    </div>
  )
}
