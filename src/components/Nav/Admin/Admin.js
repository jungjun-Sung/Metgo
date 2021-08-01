/* eslint-disable*/

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';

// COMPONENTS
import UserFormInputs from '../UserInput/UserInput';
import UserFormBtns from '../UserButton/UserFormBtn';
import UserRadioBtns from '../UserRadioBtns/UserFormRadio';

// STYLES
import * as S from './AdminEle';

import { BASE_URL } from '../../../config';

const { Kakao } = window;

function Admin({
  form,
  modalClose,
  setIsLoggedIn,
  checkRadioValue,
  checkName,
}) {
  const history = useHistory();
  const [radio, setRadio] = useState('');
  const [inputValues, setInputValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = e => {
    e.preventDefault();
  };

  const setInputValue = e => {
    const { name, value } = e.target;

    setInputValues(prev => ({ ...prev, [name]: value }));
  };

  const setRadioValue = e => {
    setRadio(e.target.value);
  };

  const handleClickButton = e => {
    const { name } = e.target;
    if (
      name === 'email' &&
      inputValues.email &&
      inputValues.password &&
      radio
    ) {
      fetchLogin();
      setInputValues({ name: '', email: '', password: '' });
      setRadio('');
    } else if (
      name === 'signup' &&
      inputValues.name &&
      inputValues.email &&
      inputValues.password &&
      radio
    ) {
      fetchSignup();
      setInputValues({ name: '', email: '', password: '' });
      setRadio('');
    } else {
      alert('작성하신 내용을 확인해주세요');
    }
  };
  const goToMasterPage = () => {
    console.log(`:"hihih`, 'hihih');
    radio === 'masters' && history.push('/gosumain');
  };

  const fetchLogin = () => {
    {
      radio &&
        fetch(`${BASE_URL}/${radio}/signin`, {
          method: 'POST',
          body: JSON.stringify({
            email: inputValues.email,
            password: inputValues.password,
          }),
        })
          .then(res => res.json())
          .then(res => {
            localStorage.setItem('access_token', res.access_token);
            setIsLoggedIn(true);
            checkRadioValue(radio);
            modalClose();
            alert('로그인에 성공했습니다');
            return goToMasterPage()
          })
          .catch(err => console.log(`arr`, err));
    }
  };

  const fetchSignup = () => {
    {
      radio &&
        fetch(`${BASE_URL}/${radio}/signup`, {
          method: 'POST',
          body: JSON.stringify({
            name: inputValues.name,
            email: inputValues.email,
            password: inputValues.password,
          }),
        })
          .then(res => res.json())
          .then(res => {
            modalClose();
            history.push('/');
            checkName(inputValues.name);
            alert('회원가입에 성공하였습니다 로그인을 해주세요');
          })
          .catch(err => console.log(`err`, err));
    }
  };

  const kakaoLogin = () => {
    {
      radio
        ? Kakao.Auth.login({
            success: function (authObj) {
              fetch(`${BASE_URL}/${radio}/kakao/signin`, {
                method: 'POST',
                headers: {
                  Authorization: authObj.access_token,
                },
              })
                .then(res => res.json())
                .then(res => {
                  if (res.message === 'SUCCESS') {
                    localStorage.setItem('access_token', res.access_token);
                    modalClose();
                    goToMasterPage();
                    alert('로그인되었습니다');
                    setRadio('');
                    setIsLoggedIn(true);
                    checkName(res.name);
                    checkRadioValue(radio);
                  }
                });
            },
            fail: function (err) {
              alert(JSON.stringify(err));
            },
          })
        : alert('고객 고수 버튼중 하나를 선택해주새요');
    }
  };

  return (
    <S.FormBox paddingBig={form.paddingBig} onSubmit={handleSubmit}>
      <S.Logo>
        <S.LogoImg src="/images/metgo.png" alt="UserFormImg" />
      </S.Logo>
      <S.Text>{form.status}</S.Text>
      <UserFormInputs
        form={form}
        inputValues={inputValues}
        setInputValue={setInputValue}
      />
      <UserRadioBtns form={form} setRadioValue={setRadioValue} />
      <UserFormBtns
        form={form}
        handleClickButton={handleClickButton}
        kakaoLogin={kakaoLogin}
      />
      {form.status === '로그인' && (
        <S.AskAccount>{form.bottomText}</S.AskAccount>
      )}
      <S.CloseBtn onClick={modalClose}>
        <IoMdClose />
      </S.CloseBtn>
    </S.FormBox>
  );
}

export default Admin;
