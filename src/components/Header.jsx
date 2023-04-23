import myIcon from '../images/chat-bubbles.png';

const Header = () => {
    return (
        <>
            <div className="App-header">
                <img className='My-icon' src={myIcon} alt="logo" />
                <h1>MatChatApp</h1>
            </div>
        </>
    );
};

export default Header;


