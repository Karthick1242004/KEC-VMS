import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Ho from './Home.module.css';
import Table from './components/Table';
import Loader from './components/Loader';
import Bus from './assets/bus1.png';
import gsap from 'gsap';
import SplitText from 'gsap-trial/SplitText';
import busHonkSound from './assets/bus-honk.mp3'; // பஸ் ஹான்க் சதுரம் கேளுங்கள்
import { Link } from 'react-router-dom';
import Tamilnav from './components/Tamilnav';

function Tamil() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
       // கட்டுப்படுத்தும் பஸ் ஹான்க் சதுரம் இயக்குங்கள் போன்றது
    }, 1500);
  }, []);
  //  setTimeout(()=>{
  //   playBusHonkSound();
  //  },4000)
  const animateHeader = () => {
    const header = document.querySelector('.animateheader');
    const splitText = new SplitText(header, { type: 'chars, words' });
    const chars = splitText.chars;

    gsap.from(chars, {
      yPercent: 130,
      stagger: 0.05,
      ease: 'back.out',
      duration: 1,
    });
  };

  const playBusHonkSound = () => {
    console.log('பஸ் ஹான்க் சதுரம் இயக்குகின்றது...');
    const audio = new Audio(busHonkSound);
    audio.play();
  };

  return (
    <div>
  {loading ? (
    <Loader loading={loading} size={100} />
  ) : (
    <div className={Ho.main1}>
      <Tamilnav />
      <img src={Bus} alt='bus' className={Ho.img1}/>
      <div className={Ho.main}>
        <h1 className={Ho.animateheader}>
          <span3 className={Ho.span1}>கொங்கு</span3> பொறியியல் கல்லூரி வாகன <span6>மேலாண்மை</span6> அமைப்பு
        </h1>
        <p>கொங்கு பொறியியல் கல்லூரியில் உள்ள அனைத்து வாகனங்களின் விபரங்களைக் காண்க</p>
        {/* <Table filters={filters} /> */}
        <Link className={Ho.drive} to='/Driver'>ஓட்டுநர் விவரங்கள்</Link>
        <div className={Ho.busd}>
          <h1>கொங்கு பொறியியல் கல்லூரி <span3>மொத்த</span3> வாகன <span3>விபரங்கள்</span3></h1>
          <p>பெருந்துறை, ஈரோடு பரப்பில் உள்ள அமைதியற்ற காட்சிகளுடன் சேர்ந்த கொங்கு பொறியியல் கல்லூரி, கல்லூரி உயிர்தூக்க மற்றும் உயர்ந்த கல்லூரி உண்மையில் நிகழ்ந்து வருகின்றது. அதற்குப் பின், விவிகள் மற்றும் பேட்டி உடல்நிலை விநாடிகளைப் பூர்த்தி செய்ய முடியும் விவசாய வாகனங்கள், கல்லூரி பாதுகாப்பான பாதைகளை வேகமாக செல்லும் நிகழ்வினை பெற்றுக்கொள்ளும், செயற்கையான நேர்த்தியில் பகுப்பாய்வு செய்யும் கொங்கு பொறியியல் கல்லூரியின் உடல் நடைகளைப் பொறுத்துக்கொள்ளும் முறையில் கட்டமைக்கப்பட்டுள்ளது. கொங்கு பொறியியல் கல்லூரியில் உள்ள வாகனங்களின் இன்னும் ஒரு பொருளாதாரம் உயர்வுகளில் உள்ள நீர் லாரிகள் என்பவை மேலும் நிற்கும், அவர்கள் நிறைய உற்பத்தி காரணங்களை போல அதிக நீர் மீது நிற்கின்றன. வாகனங்களின் ஒவ்வொருவருக்கும் கொங்கு பொறியியல் கல்லூரியின் வாழ்க்கையின் தினசரி ரிதம் விதிக்கும், அதிகாரப்பூர்வ சுவாச்சியமாக அமைக்கும், செயற்குழுக்களின் நடுவயது, அக்கறை மற்றும் மீதுகளின் நிறைவுகளில் முன்னெச்சரிக்கை காணப்படுகின்றன.</p>
          <div className={Ho.bud1}>
            <div className={Ho.bud2}>
              <h3>மொத்த பஸ்</h3>
              <h1>72</h1>
            </div>
            <div className={Ho.bud2}>
              <h3>மொத்த கார்</h3>
              <h1>36</h1>
            </div>
            <div className={Ho.bud2}>
              <h3>மொத்த வான்</h3>
              <h1>13</h1>
            </div>
            <div className={Ho.bud2}>
              <h3>மொத்த லாரி</h3>
              <h1>6</h1>
            </div>
          </div>
        </div>
      </div>
      <div className={Ho.deg}>
        <p>வடிகட்டியின் மற்றும் மேம்படுத்தியது <a href='https://calibertech.netlify.app/'>கலிபர் டெக்</a> உருவாக்கப்பட்டது</p>
      </div>
    </div>
  )}
</div>
  );
}

export default Tamil;
