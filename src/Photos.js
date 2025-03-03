import './Photos.css';

const images = [
  { src: 'pic1.jpg', caption: 'starting off strong with cute bunny pic – cant tell which one i want more hehe and this photo reminds me of the fact that you ARE a softie' },
  { src: 'pic2.jpg', caption: 'another softie pic with the doggy from our favorite class that admittedly liked you more... also a reminder that we will have a dog one day' },
  { src: 'pic3.jpg', caption: 'no words. just too handsome. sparkly eyes. beautiful smile. and a little stigmatism from my camera' },
  { src: 'pic4.jpg', caption: 'the favorite place that we\'ve been to together! i think about it from time to time and miss how we were in our own world for a bit' },
  { src: 'pic5.png', caption: 'you had way too much fun breaking these icicles but such a fun hike!' },
  { src: 'pic6.jpg', caption: 'this pic is cute but goofy bc of the clown shoes and the dude hunched over in the back' },
  { src: 'pic7.jpg', caption: 'who bought you that shirttttt' },
  { src: 'pic8.jpg', caption: 'softie is painting clouds <3 you look so petite' },
  { src: 'pic9.jpg', caption: 'pretty boy in a field of pretty flowers :)' },
  { src: 'pic10.jpg', caption: 'MY LEMON PEEEEEEL' },
  { src: 'pic11.jpg', caption: 'this is the type of pic you show to your kids' },
  { src: 'pic12.jpg', caption: 'ending off with a picture that you hate but a picture that i love because it shows the way you look at me and care about me' }
];

function Photos() {
  return (
    <div className="photos-home-container">
      {/* Starry Background */}
      <div className="stars">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              top: `${Math.random() * 100}vh`,
              left: `${Math.random() * 100}vw`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Title */}
      <h1 className="title">my favorite photos of sid (when he was 20)</h1>

      {/* Images with alternating captions */}
      <div className="photos-section">
        {images.map((item, index) => (
          <div key={index} className={`photo-container ${index % 2 === 0 ? 'left' : 'right'}`}>
            <img src={item.src} alt={`Photo ${index + 1}`} className="photo" />
            <p className="caption">{item.caption}</p>
          </div>
        ))}
      </div>
      <div>
        <p className="ending-letter">happy 21st my siddy baby boy! i have seen you grow so much in this past year 
          and i'm so excited to take on 21 with you (i'll be there in a month to go to the bars with you). you make
          life so fun and i can't wait for all the silly little adventures we go on now that you're #legal. i admire
          you so much and i'm so proud of all that you have accomplished in these past 21 years. you are an amazing
          boyfriend, friend, family member, student, and person in general. i love you all the way to the moon 
          and back. happy birthday my love &lt;3!
        </p>
      </div>
      <button className="photos-button" onClick={() => window.location.href = '/gifts'}>click here for prezzies</button>
    </div>
  );
}

export default Photos;
