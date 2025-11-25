import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Nav.css";

export default function Nav() {
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowInput(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };


  function HoverMenu({ trigger, contentClass, children }) {
    const [active, setActive] = useState(false);

    const handleEnter = () => setActive(true);
    const handleLeave = (e) => {
      const related = e.relatedTarget;
      if (related && related.closest && related.closest(`.${contentClass}`)) return;
      setActive(false);
    };

    return (
      <div className={`${contentClass}__wrapper`}>
        <div onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
          {trigger}
        </div>
        <div
          className={`${contentClass} ${active ? "show" : ""}`}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          {children}
        </div>
      </div>
    );
  }


  return (
    <nav className={`nav ${show ? "nav__black" : ""}`}>
      <img
        alt="Netflix logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png"
        className="nav__logo"
        onClick={() => (window.location.href = "/")}
      />

      <div className="nav__info">
        <a href="#">홈</a>
        <a href="#">시리즈</a>
        <a href="#">영화</a>
        <a href="#">게임</a>
        <a href="#">NEW! 요즘 대세 콘텐츠</a>
        <a href="#">내가 찜한 리스트</a>
        <a href="#">언어별로 찾아보기</a>
      </div>

      <HoverMenu
        contentClass="nav__info2"
        trigger={
          <a href="#" className="nav__info2__menu">메뉴</a>
        }
      >
        <a href="#">홈</a>
        <a href="#">시리즈</a>
        <a href="#">영화</a>
        <a href="#">게임</a>
        <a href="#">NEW! 요즘 대세 콘텐츠</a>
        <a href="#">내가 찜한 리스트</a>
        <a href="#">언어별로 찾아보기</a>
      </HoverMenu>

      <div className="nav__right" ref={inputRef}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          role="img"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className={`nav__search ${showInput ? "hide" : "show"}`}
          onClick={() => setShowInput(!showInput)}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10ZM15.6177 17.0319C14.078 18.2635 12.125 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 12.125 18.2635 14.078 17.0319 15.6177L22.7071 21.2929L21.2929 22.7071L15.6177 17.0319Z"
            fill="white"
          />
        </svg>

        <div className={`nav__input ${showInput ? "show" : "hide"}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            role="img"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10ZM15.6177 17.0319C14.078 18.2635 12.125 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 12.125 18.2635 14.078 17.0319 15.6177L22.7071 21.2929L21.2929 22.7071L15.6177 17.0319Z"
              fill="white"
            />
          </svg>
          <input
            value={searchValue}
            onChange={handleChange}
            type="text"
            placeholder="제목, 사람, 장르"
          />
        </div>

        <a href="#" className="nav__kids">
          키즈
        </a>

        <HoverMenu
          contentClass="nav__bell__content"
          trigger={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              role="img"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="nav__bell"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.0002 4.07092C16.3924 4.55624 19 7.4736 19 11V15.2538C20.0489 15.3307 21.0851 15.4245 22.1072 15.5347L21.8928 17.5232C18.7222 17.1813 15.4092 17 12 17C8.59081 17 5.27788 17.1813 2.10723 17.5232L1.89282 15.5347C2.91498 15.4245 3.95119 15.3307 5.00003 15.2538V11C5.00003 7.47345 7.60784 4.55599 11.0002 4.07086V2H13.0002V4.07092ZM17 15.1287V11C17 8.23858 14.7614 6 12 6C9.2386 6 7.00003 8.23858 7.00003 11V15.1287C8.64066 15.0437 10.3091 15 12 15C13.691 15 15.3594 15.0437 17 15.1287ZM8.62593 19.3712C8.66235 20.5173 10.1512 22 11.9996 22C13.848 22 15.3368 20.5173 15.3732 19.3712C15.3803 19.1489 15.1758 19 14.9533 19H9.0458C8.82333 19 8.61886 19.1489 8.62593 19.3712Z"
                fill="white"
              />
            </svg>
          }
        >
          <div className="nav__bell__content_inner">
            <div className="nav__new">
              <img
                alt="Netflix logo"
                src="https://assets.nflxext.com/us/email/gem/comingsoon/csInapp_265x149.png"
              />
            </div>
            <div>
              <div className="nav__bell__title">
                넷플릭스 '신규 콘텐츠 가이드'<br />
                공개 예정작을 살펴보세요.
              </div>
              <div className="nav__bell__date">9일</div>
            </div>
          </div>
        </HoverMenu>

        <HoverMenu
          contentClass="nav__account__content"
          trigger={
            <img
              alt="User logged"
              src="https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41"
              className="nav__avatar"
            />
          }
        >
          <div className="nav__account__dropdown">
            <div className="nav__drop__kids">
              <a href="#">
                <img className="kids-icon" src="https://occ-0-4796-993.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABdTeFDWGGsM48NmQvPPwI9VDJ_aeLDk_7U5sowYemKcU_IW57cQR5Vn1fJU8F2tlp9Atv3V13C6rQ4-AT88O_8asZcow4xY.png?r=15b" alt=""></img>
                키즈
              </a>
            </div>
            <div className="nav__drop__profile">
              <a href="#">
                <svg viewBox="0 0 24 24" width="24" height="24" data-icon="PencilMedium" data-icon-id=":r32:" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" role="img">
                  <path clipRule="evenodd" clipRule="evenodd" d="M19.1213 1.7071C17.9497 0.535532 16.0503 0.53553 14.8787 1.7071L13.2929 3.29289L12.5858 4L1.58579 15C1.21071 15.3751 1 15.8838 1 16.4142V21C1 22.1046 1.89543 23 3 23H7.58579C8.11622 23 8.62493 22.7893 9 22.4142L20 11.4142L20.7071 10.7071L22.2929 9.12132C23.4645 7.94975 23.4645 6.05025 22.2929 4.87868L19.1213 1.7071ZM15.5858 7L14 5.41421L3 16.4142L3 19C3.26264 19 3.52272 19.0517 3.76537 19.1522C4.00802 19.2527 4.2285 19.4001 4.41421 19.5858C4.59993 19.7715 4.74725 19.992 4.84776 20.2346C4.94827 20.4773 5 20.7374 5 21L7.58579 21L18.5858 10L17 8.41421L6.70711 18.7071L5.29289 17.2929L15.5858 7ZM16.2929 3.12132C16.6834 2.73079 17.3166 2.73079 17.7071 3.12132L20.8787 6.29289C21.2692 6.68341 21.2692 7.31658 20.8787 7.7071L20 8.58578L15.4142 4L16.2929 3.12132Z" fill="gray"></path>
                </svg>
                프로필 관리
              </a>
              <a href="#">
                <svg viewBox="0 0 24 24" width="24" height="24" data-icon="ProfileArrowMedium" data-icon-id=":r3b:" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" role="img">
                  <path fillRule="evenodd" clipRule="evenodd" d="M6 1C3.79086 1 2 2.79086 2 5V17C2 19.2091 3.79086 21 6 21H9.58579L8.29289 22.2929L9.70711 23.7071L12.7071 20.7071C13.0976 20.3166 13.0976 19.6834 12.7071 19.2929L9.70711 16.2929L8.29289 17.7071L9.58579 19H6C4.89543 19 4 18.1046 4 17V5C4 3.89543 4.89543 3 6 3H18C19.1046 3 20 3.89543 20 5V17C20 18.1046 19.1046 19 18 19H15V21H18C20.2091 21 22 19.2091 22 17V5C22 2.79086 20.2091 1 18 1H6ZM7.5 10C8.32843 10 9 9.32843 9 8.5C9 7.67157 8.32843 7 7.5 7C6.67157 7 6 7.67157 6 8.5C6 9.32843 6.67157 10 7.5 10ZM18 8.5C18 9.32843 17.3284 10 16.5 10C15.6716 10 15 9.32843 15 8.5C15 7.67157 15.6716 7 16.5 7C17.3284 7 18 7.67157 18 8.5ZM16.402 12.1985C15.7973 12.6498 14.7579 13 13.5 13C12.2421 13 11.2027 12.6498 10.598 12.1985L9.40195 13.8015C10.4298 14.5684 11.9192 15 13.5 15C15.0808 15 16.5702 14.5684 17.598 13.8015L16.402 12.1985Z" fill="gray"></path>
                </svg>
                프로필 이전
              </a>
              <a href="#">
                <svg viewBox="0 0 24 24" width="24" height="24" data-icon="UserMedium" data-icon-id=":r3s:" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" role="img">
                  <path fillRule="evenodd" clipRule="evenodd" d="M15 5C15 6.65685 13.6569 8 12 8C10.3431 8 9 6.65685 9 5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5ZM17 5C17 7.76142 14.7614 10 12 10C9.23858 10 7 7.76142 7 5C7 2.23858 9.23858 0 12 0C14.7614 0 17 2.23858 17 5ZM4 21C4 16.5817 7.58172 13 12 13C16.4183 13 20 16.5817 20 21V21.5136C19.5678 21.5667 18.9844 21.6327 18.2814 21.6988C16.6787 21.8495 14.461 22 12 22C9.53901 22 7.32131 21.8495 5.71861 21.6988C5.01564 21.6327 4.43224 21.5667 4 21.5136V21ZM21.1508 23.3775C21.1509 23.3774 21.151 23.3774 21 22.3889L21.151 23.3774C21.6393 23.3028 22 22.8829 22 22.3889V21C22 15.4772 17.5228 11 12 11C6.47715 11 2 15.4772 2 21V22.3889C2 22.8829 2.36067 23.3028 2.84897 23.3774L3 22.3889C2.84897 23.3774 2.84908 23.3774 2.8492 23.3775L2.84952 23.3775L2.85043 23.3776L2.85334 23.3781L2.86352 23.3796L2.90103 23.3852C2.93357 23.3899 2.98105 23.3968 3.04275 23.4055C3.16613 23.4228 3.3464 23.4472 3.57769 23.4765C4.04018 23.535 4.7071 23.6126 5.5314 23.6901C7.1787 23.8449 9.461 24 12 24C14.539 24 16.8213 23.8449 18.4686 23.6901C19.2929 23.6126 19.9598 23.535 20.4223 23.4765C20.6536 23.4472 20.8339 23.4228 20.9573 23.4055C21.0189 23.3968 21.0664 23.3899 21.099 23.3852L21.1365 23.3796L21.1467 23.3781L21.1496 23.3776L21.1505 23.3775L21.1508 23.3775Z" fill="gray"></path>
                </svg>
                계정
              </a>
              <a href="#">
                <svg viewBox="0 0 24 24" width="24" height="24" data-icon="CircleQuestionMarkMedium" data-icon-id=":r41:" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" role="img">
                  <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0ZM12 8C10.6831 8 10 8.74303 10 9.5H8C8 7.25697 10.0032 6 12 6C13.9968 6 16 7.25697 16 9.5C16 10.8487 14.9191 11.7679 13.8217 12.18C13.5572 12.2793 13.3322 12.4295 13.1858 12.5913C13.0452 12.7467 13 12.883 13 13V14H11V13C11 11.5649 12.1677 10.6647 13.1186 10.3076C13.8476 10.0339 14 9.64823 14 9.5C14 8.74303 13.3169 8 12 8ZM13.5 16.5C13.5 17.3284 12.8284 18 12 18C11.1716 18 10.5 17.3284 10.5 16.5C10.5 15.6716 11.1716 15 12 15C12.8284 15 13.5 15.6716 13.5 16.5Z" fill="gray"></path>
                </svg>
                고객 센터
              </a>
            </div>
            <div className="divide"></div>
            <div className="nav__drop__logout">
              <a href="#">넷플릭스에서 로그아웃</a>
            </div>
          </div>
        </HoverMenu>
      </div>
    </nav>
  );
}
