import assets from '@/assets'
import React from 'react'

const OnlineResources = () => {
  return (
    <section className='flex flex-col justify-start items-center dark:text-darkModeTextClr'>
        <div className='flex flex-col max-w-[800px] gap-7 px-10 pb-24'>
        <div className='flex flex-col gap-2'>
        <h1 className='main_subheading'>Extra Material and Case Studies</h1>
        <p className='text-xl'>Extra Material to extend and suport the book</p>
        <p className='text-xl'>More Coming</p>
        <p className='text-xl'>Online</p>
        </div>

        <div className='text-lg'>
            <ul className='list-disc flex flex-col gap-6'>
                <li>
                    <a 
                    href="https://hcibook.com/e3/online/why-study-hci/" 
                    target="_blank" 
                    className='underline flex gap-3 hover:text-blue-800 cursor-pointer' > 
                    why study human–computer interaction? 
                    <img className='w-6 dark:invert' src={assets.video} />
                    </a>
                    <p className='mx-6'>This video looks at a variety of examples to 
                        explore the different reasons why human-computer 
                        interaction is an important and exciting area to study.</p>
                </li>
                <li>
                    <a 
                    href="https://www.hcibook.com/e3/plain/online/stakeholder-interviews/" 
                    target="_blank" 
                    className='underline flex gap-3 hover:text-blue-800 cursor-pointer' > 
                    making the most of stakeholder interviews
                    </a>
                    <p className='mx-6'>Working with stakehoders takes a lot of organising
                         and consumes both your tmem and theirs. Make the most of the precious time 
                         you have with them.</p>
                </li>
                <li>
                    <a 
                    href="https://www.hcibook.com/e3/online/act-it-out/" 
                    target="_blank" 
                    className='underline flex gap-3 hover:text-blue-800 cursor-pointer' > 
                    act it out 
                    </a>
                    <p className='mx-6'>Reading a scenario can be helpful, as can talking 
                        through a user's activities in an interview. However, sometimes 
                        physically acting things out adds an extra dimension.</p>
                </li>
                <li>
                    <a 
                    href="https://hcibook.com/e3/online/how-many-computers/" 
                    target="_blank" 
                    className='underline flex gap-3 hover:text-blue-800 cursor-pointer' > 
                    early lessons: it's not all about technology
                    </a>
                    <p className='mx-6'>see exercise page 60. How many 
                        computers do you have in your home? How many 
                        computers do you normally carry with you in your pockets 
                        or bags?</p>
                </li>
                <li>
                    <a 
                    href="https://hcibook.com/e3/online/how-many-computers/" 
                    target="_blank" 
                    className='underline flex gap-3 hover:text-blue-800 cursor-pointer' > 
                    how many computer?
                    <img className='w-6 dark:invert' src={assets.video} />
                    </a>
                    <p className='mx-6'>
                    see exercise page 60. How many computers do you have in your 
                    home? How many computers do you normally carry with you in your 
                    pockets or bags?
                    </p>
                </li>
                <li>
                    <a 
                    href="https://hcibook.com/e3/online/desire-and-disaster/" 
                    target="_blank" 
                    className='underline flex gap-3 hover:text-blue-800 cursor-pointer' > 
                    desire and disaster
                    </a>
                    <p className='mx-6'>There are always more things you would like to do 
                        when creating or updating a system: problems to fix, new features 
                        to add, ways to make what you have easier to use, more slick, more 
                        appealing. How do you choose which to do first?</p>
                </li>
                <li>
                    <a 
                    href="https://hcibook.com/e3/online/are-five-users-enough/" 
                    target="_blank" 
                    className='underline flex gap-3 hover:text-blue-800 cursor-pointer' > 
                    are five users enough?
                    </a>
                    <p className='mx-6'>Along with Fitts’ Law and Miller’s 7+/-2 this 
                        “five is enough” must be among the most widely cited, 
                        and most widely misunderstood and misused aphorisms of HCI 
                        and usability.</p>
                </li>
            </ul>
        </div>
        </div>
    </section>
  )
}

export default OnlineResources