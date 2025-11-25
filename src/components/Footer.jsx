import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import styled from 'styled-components'
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";


const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0px;
  border-top: 1px solid rgb(25, 25, 25);
  width: 100%;
  position: relative;
  z-index: 100;

  @media (max-width: 768px) {
    padding: 20px 20px;
    padding-bottom: 30px;
  }
`;

const FooterContent = styled.div`
  width: 520px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FooterLinkTitle = styled.h1`
  color: rgba(230, 230, 230, 1);
  font-size: 1.3rem;
  font-weight: 200;
  display:flex;
  gap: 1.5rem;
`;

const FooterTitlelisks = styled.a`
 color: rgba(220, 220, 220, 1);
  font-size: 1.3rem;
  text-decoration:none;
  margin-bottom: 0.3rem;
  
  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const FooterLinkContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 768px) {
  }
`;

const FooterLink = styled.a`
  width: 7rem;     
  color: gray;
  font-size: 0.8rem;
  font-weight: 400;

  margin-bottom: 1rem;
  text-decoration:none;
  
  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    width: 15rem;
    font-size: 0.7rem;
    margin-bottom: 1.2rem;
   
  }
`;

const FooterDescContainer = styled.div`
  margin-top: 1.2rem;
  color:white;
  @media (max-width: 768px) {
   
  }
`;

const FooterDescRights = styled.div`
  font-size: 0.6rem;
  text-align: left;
  font-weight:100;
  letter-spacing: 0.02rem;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        
        <FooterLinkTitle>
          <FooterTitlelisks href="https://www.facebook.com/NetflixKR" target="_blank"><FaFacebookF /></FooterTitlelisks>
          <FooterTitlelisks href="https://www.instagram.com/netflixkr/" target="_blank"><FaInstagram /></FooterTitlelisks>
          <FooterTitlelisks href="https://twitter.com/netflixkr" target="_blank"><FaTwitter /></FooterTitlelisks>
          <FooterTitlelisks href="https://www.youtube.com/channel/UCiEEF51uRAeZeCo8CJFhGWw/featured" target="_blank"><FaYoutube /></FooterTitlelisks>
        </FooterLinkTitle>
        <FooterLinkContent>
          <FooterLink href="https://www.netflix.com/browse/audio-description">화면해설</FooterLink>
          <FooterLink href="https://help.netflix.com/">고객 센터</FooterLink>
          <FooterLink href="https://www.netflix.com/redeem">기프트카드</FooterLink>
          <FooterLink href="https://media.netflix.com/">미디어센터</FooterLink>
          <FooterLink href="http://ir.netflix.com/y">투자 정보(IR)</FooterLink>
          <FooterLink href="https://jobs.netflix.com/">입사 정보</FooterLink>
          <FooterLink href="https://help.netflix.com/legal/termsofuse">이용 약관</FooterLink>
          <FooterLink href="https://help.netflix.com/legal/privacy">개인정보</FooterLink>
          <FooterLink href="https://help.netflix.com/legal/notices">법적 고지</FooterLink>
          <FooterLink href="https://www.netflix.com/Cookies">쿠키 설정</FooterLink>
          <FooterLink href="https://help.netflix.com/legal/corpinfo">회사 정보</FooterLink>
          <FooterLink href="https://help.netflix.com/contactus">문의하기</FooterLink>
        </FooterLinkContent>
        <FooterDescContainer>
          <FooterDescRights>넷플릭스서비스코리아 유한회사 통신판매업신고번호: 제2018-서울종로-0426호 전화번호:00-308-321-0161 (수신자부담)</FooterDescRights>
            <FooterDescRights>대표: 레지널드 숀 톰프슨</FooterDescRights>
            <FooterDescRights>이메일 주소: korea@netflix.com</FooterDescRights>
            <FooterDescRights>주소: 대한민국 서울특별시 종로구 우정국로 26, 센트로폴리스 A동 20층 우편번호 03161</FooterDescRights>
            <FooterDescRights>사업자등록번호: 165-87-00119</FooterDescRights>
            <FooterDescRights>클라우드 호스팅: Amazon Web Services Inc.</FooterDescRights>
            <FooterDescRights>공정거래위원회 웹사이트</FooterDescRights>
          <FooterDescRights>© Netflix RIGHTS RESERVED.</FooterDescRights>
        </FooterDescContainer>
      </FooterContent>
    </FooterContainer>
  );
}