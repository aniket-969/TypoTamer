import React from 'react'

const About = () => {
    return (
        <main className='flex justify-center items-start px-10 mt-5 py-4 flex-col gap-5'>
            <article >
                <h1 className='text-[1.8rem] text-sub'>about</h1>
                <div className='flex flex-col gap-5'>
                    <p>Hey! I am Aniket Baranwal the creator of typoTamer.The app features many test modes, an account system to track your errors and generate lessons on basis of that ,an option to generate custom tests and many more. The website is heavely inspired by <span className='underline decoration-3 underline-offset-2'>monkeytype</span>, but with additional feature of personalized error typing tests. </p>
                    <p>Test yourself in various modes, track your progress and improve your speed.</p>
                </div>

            </article>

            <section>
                <h2 className='text-sub'>characters</h2>
                <p> You can click on characters to get tests containing characters ,numbers and words</p>
                <p>You can choose any of the three text , number or characters or two of them at once or all three together</p>
            </section>
            <section>
                <h2 className='text-sub'>personalized error tests</h2>
                You can click on your profile to get typing sessions based on your errors in previous tests. You have to take atleast one test to generate the tests based on your errors
                <p></p>
            </section>
            <section>
                <h2 className='text-sub'>leaderboard</h2>
                <p>The leaderboard displays a ranking of all participants based on their typing speed. In case of same typing speed, The one with better accuracy is given higher position. The leaderboard includes results from two specific time controls: 30 and 60 only. Also, the accuracy should be above 90 to get your name in the leaderboard section. You can access the leaderboard by clicking the crown symbol in navbar</p>
            </section>
            <section>
                <h2 className='text-sub'>keybinds</h2>
                <p>You can use <span className='bg-submain text-bg text-[0.9rem] px-[0.2rem]'>enter</span> or <span className='bg-submain text-bg text-[0.9rem]  px-[0.2rem]'>esc</span> to restart the typing test . By default, its <span className='bg-submain text-bg text-[0.9rem] px-[0.2rem]'>enter</span> but You can choose your preferred button in settings in system section</p>
            </section>
            <section>
                <h2 className='text-sub'>stats</h2>
                <p>wpm - total number of characters in the correctly typed words (including spaces), divided by 5 and normalised to 60 seconds.</p>
                <p>accuracy -  percentage of correctly pressed keys.</p>
                <p>typed-total correct characters / incorrect characters. Calculated after the test has ended.</p>

            </section>

            <section>
                <h2 className='text-sub text-[1.8rem]'>contact</h2>
                <p>All your feedback is welcome.</p>
                <p>aniketbaranwal8090@gmail.com</p>
            </section>
        </main>
    )
}

export default About