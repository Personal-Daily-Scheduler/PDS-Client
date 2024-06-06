import styled from 'styled-components';

import Description from '../Description';

import mobileErrorImage from '../../assets/mobile_error_image.png';
import pdsLogo from '../../assets/pds_logo.png';

function MobileError() {
  return (
    <>
      <Header>
        <img className="logo" src={pdsLogo} alt="figci-logo-img" />
        <Description
          className="description"
          text="Today’s remarkable record \nthat will change your life"
        />
      </Header>
      <Container>
        <Image src={mobileErrorImage} alt="mobile-support-error" />
        <h1 className="title">Sorry, Mobile is Not Supported.</h1>
        <Description
          className="description"
          size="large"
          text="Mobile devices are not supported.\nPlease use a desktop browser."
        />
      </Container>
    </>
  );
}

const Header = styled.header`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
  margin-left: 30px;
  margin-top: 40px;

  .logo {
    background-size: cover;
    width: 60px;
    margin-right: 20px;
  }

  .description {
    color: black;
    font-weight: 800;
    text-align: left;
  }
`;

const Image = styled.img`
  width: 250px;
  height: 250px;
  margin-bottom: 40px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: calc(100vh - 150px);

  .title {
    margin-bottom: 20px;

    color: #000000;
    text-align: center;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 900;
    line-height: 20px;
  }

  .description {
    font-size: 1rem;
  }
`;

export default MobileError;
