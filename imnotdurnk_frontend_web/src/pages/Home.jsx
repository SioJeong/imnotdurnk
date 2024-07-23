import DropButton from '../components/common/DropButton';
import Navigation from '../components/common/Navigation';

const Home = () => {
    return (
        <>
            {/* <Navigation /> */}
            <Navigation icon1="address" title="메인" icon2="empty" />;
            <DropButton options={['오전', '오후']} />
        </>
    );

    /* 테스트용 */
    // <Navigation icon1="address" title="메인" icon2="empty" />;
};

export default Home;
