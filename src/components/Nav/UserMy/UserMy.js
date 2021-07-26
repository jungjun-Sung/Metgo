import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

//STYLES
import styled from 'styled-components';

function UserMy() {
  const [isToggleHeight, setIsToggleHeight] = useState(false);
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const veiwGosuList = () => {
    setIsToggleHeight(prev => !prev);
  };

  return (
    <Container>
      <Box>
        <WelcomeName>안녕하세요, 성정준님</WelcomeName>
        <Estimation>받은 견적</Estimation>
        <GosuListBox onClick={veiwGosuList}>
          <GosuListText>요청한 고수 리스트</GosuListText>
          {isToggleHeight ? (
            <IoIosArrowUp className="listIcon" />
          ) : (
            <IoIosArrowDown className="listIcon" />
          )}
        </GosuListBox>
        <ListWrap className={isToggleHeight ? 'active' : null}>
          {/* test map */}
          {arr.map((el, i) => {
            return (
              <List key={i}>
                <ListImg src="/images/user_img1.jpg" alt="" />
                <ListName>성정준</ListName>
              </List>
            );
          })}
        </ListWrap>
      </Box>
    </Container>
  );
}

export default UserMy;

const Container = styled.div`
  ${({ theme }) => theme.flex('center', 'center', null)};
  position: absolute;
  top: 50px;
  right: 0;
  padding: 20px 30px;
  background-color: #fff;
  box-shadow: 0 5px 10px hsla(0, 0%, 0%, 0.4);
  z-index: 11;
`;

const Box = styled.div`
  ${({ theme }) => theme.flex('center', 'flex-start', 'column')};
`;

const WelcomeName = styled.h2`
  margin-bottom: 30px;
  padding: 0 20px;
  font-size: 15px;
  font-weight: bold;
`;

const Estimation = styled.p`
  margin-bottom: 30px;
  font-size: 15px;
  cursor: pointer;
`;

const GosuListBox = styled.div`
  ${({ theme }) => theme.flex('flex-start', 'center', 'row')};
  margin-bottom: 20px;
  cursor: pointer;

  .listIcon {
    margin-bottom: 3px;
  }
`;

const GosuListText = styled.p`
  padding-right: 5px;
  font-size: 15px;
  cursor: pointer;
`;

const ListWrap = styled.ul`
  width: 100%;
  height: 100px;
  overflow-y: hidden;

  &.active {
    height: auto;
  }
`;

const List = styled.li`
  ${({ theme }) => theme.flex('flex-start', 'center', null)};
  padding: 10px 0;
  border-bottom: 1px solid #eee;
`;

const ListImg = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;

const ListName = styled.p`
  ${({ theme }) => theme.flex('flex-start', 'center', null)};
  margin: 2px 0 0 10px;
  color: blue;
`;