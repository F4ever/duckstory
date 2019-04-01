import React, {Component} from 'react';
import {SECTIONS} from "../context";
import {getCurrency, setCurrency, slugify} from "../utils";
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {push} from "react-router-redux";


const INHERIT = 'header-inherit';
const WHITE_ANIMATION = 'header-white-animation';
const WHITE = 'header-white';


class Header extends Component {
  constructor(props) {
    super(props);

    this.checkScroll = this.checkScroll.bind(this);
    this.setCurrency = this.setCurrency.bind(this);

    this.state = {
      header: window.location.pathname==='/'?INHERIT:WHITE,
      showLangMenu: false,
      showCurrencyMenu: false
    };
  }

  componentWillReceiveProps(nextProps){
    if (window.location.pathname==='/'){
      this.setState({
        header: INHERIT
      });
      if (nextProps.routing.location.hash){
        document.addEventListener('MainPageHasBeenRendered', ()=>this.scrollTo(nextProps.routing.location.hash.substr(1)));
      }
    }else{
      this.setState({
        header: WHITE
      })
    }
  }

  componentDidMount(){
    if (window.location.pathname==='/'){
      document.addEventListener('scroll', this.checkScroll, true);
    }
  }

  checkScroll(event){
    const {header} = this.state;

    if (window.pageYOffset > window.innerHeight - 106 && header === INHERIT){
      this.setState({header: WHITE_ANIMATION});
    }

    if (window.pageYOffset < window.innerHeight - 106 && header === WHITE_ANIMATION){
      this.setState({header: INHERIT});
    }
  }

  scrollTo(section){
    if (window.location.pathname==='/') {
      scroller.scrollTo(section, {
        duration: 800,
        smooth: true,
        offset: -106
      });
    }else{
      this.props.redirectToHome(section);
    }
  }

  setCurrency(currency){
    document.dispatchEvent(new Event('ChangeCurrency'));
    setCurrency(currency);
  }

  renderLogo(){
    return (
      <div className={'logo'}>
        <svg width="93" height="85" viewBox="0 0 93 85" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50.3428 84.2295H0V0H50.3428C73.5979 0 92.4575 18.8596 92.4575 42.1147C92.4575 65.3699 73.5979 84.2295 50.3428 84.2295Z" fill="#E74724"/>
          <path d="M12.6436 62.4895C13.5467 62.9886 15.353 63.4639 17.183 63.4639C21.5799 63.4639 23.6476 61.1823 23.6476 58.4966C23.6476 56.2388 22.3167 54.7652 19.4884 53.7195C17.4207 52.9352 16.5176 52.4836 16.5176 51.4616C16.5176 50.6298 17.2781 49.9168 18.8467 49.9168C20.4153 49.9168 21.5561 50.3684 22.1978 50.6773L23.0059 47.754C22.0552 47.3262 20.7243 46.9459 18.918 46.9459C15.1391 46.9459 12.8575 49.0374 12.8575 51.7706C12.8575 54.0997 14.5924 55.5733 17.2543 56.5002C19.1794 57.1894 19.94 57.7598 19.94 58.7581C19.94 59.8038 19.0606 60.493 17.3969 60.493C15.8521 60.493 14.3548 59.9939 13.3803 59.4948L12.6436 62.4895Z" fill="white"/>
          <path d="M28.3201 63.2262H31.9564V50.2495H36.3295V47.2074H24.0183V50.2495H28.3201V63.2262Z" fill="white"/>
          <path d="M44.8301 46.9459C40.1005 46.9459 37.0346 50.5347 37.0346 55.3356C37.0346 59.8989 39.8153 63.4877 44.5687 63.4877C49.2508 63.4877 52.4355 60.3029 52.4355 55.0504C52.4355 50.6298 49.7499 46.9459 44.8301 46.9459ZM44.7351 49.8217C47.2306 49.8217 48.6091 52.2935 48.6091 55.1693C48.6091 58.2827 47.2068 60.6119 44.7588 60.6119C42.3346 60.6119 40.8611 58.4016 40.8611 55.2643C40.8611 52.1509 42.2871 49.8217 44.7351 49.8217Z" fill="white"/>
          <path d="M54.5909 63.2262H58.1797V56.928H59.2729C60.7465 56.9518 61.4357 57.4984 61.8635 59.4948C62.3389 61.4675 62.7191 62.7747 62.9806 63.2262H66.6882C66.3792 62.6083 65.8801 60.5168 65.381 58.7105C64.977 57.237 64.359 56.1675 63.242 55.7159V55.6446C64.6205 55.1455 66.0703 53.7432 66.0703 51.6993C66.0703 50.2257 65.5474 49.1087 64.5967 48.3482C63.4559 47.445 61.7922 47.0885 59.4155 47.0885C57.4904 47.0885 55.7554 47.2311 54.5909 47.4213V63.2262ZM58.1797 49.893C58.4411 49.8455 58.9402 49.7742 59.8196 49.7742C61.4832 49.7979 62.4815 50.5347 62.4815 52.0083C62.4815 53.4105 61.4119 54.3136 59.6057 54.3136H58.1797V49.893Z" fill="white"/>
          <path d="M74.9089 63.2262V56.5477L80.1851 47.2074H76.121L74.5048 51.0576C74.0295 52.1984 73.6492 53.1253 73.2927 54.1235H73.2452C72.8411 53.0778 72.5084 52.2222 72.0093 51.0576L70.3694 47.2074H66.2339L71.2963 56.6666V63.2262H74.9089Z" fill="white"/>
          <path d="M32.7331 25.231L31.3784 28.8673H31.3308L29.9999 25.231L27.8846 26.4431L30.4039 29.4377L30.3802 29.4852L26.6963 28.7485V31.1489L30.4277 30.4597V30.5072L27.8846 33.4781L29.9286 34.7139L31.3071 31.0538L31.3546 31.0301L32.7093 34.7139L34.8246 33.4781L32.234 30.5547L32.2577 30.4834L36.0604 31.1489V28.7485L32.2815 29.509L32.2577 29.4377L34.8246 26.4193L32.7331 25.231Z" fill="white"/>
          <path d="M37.8876 25.4924V34.4287C37.8876 39.5386 40.2643 41.7727 44.3047 41.7727C48.4877 41.7727 50.9832 39.4198 50.9832 34.4763V25.4924H47.3706V34.7139C47.3706 37.5422 46.3249 38.8731 44.4235 38.8731C42.5697 38.8731 41.524 37.4709 41.524 34.7139V25.4924H37.8876Z" fill="white"/>
          <path d="M64.8968 38.2314C64.1838 38.5166 62.9717 38.7543 61.8784 38.7543C58.6461 38.7543 56.7448 36.7341 56.7448 33.5256C56.7448 29.9606 58.9788 28.2256 61.8546 28.2256C63.138 28.2256 64.16 28.5108 64.8968 28.8198L65.6336 25.944C64.9919 25.6112 63.5658 25.231 61.6883 25.231C56.8398 25.231 52.9421 28.2731 52.9421 33.7395C52.9421 38.3027 55.7941 41.7489 61.3318 41.7489C63.2806 41.7489 64.778 41.3924 65.4434 41.0597L64.8968 38.2314Z" fill="white"/>
          <path d="M67.3806 41.5113H70.9694V36.2826L72.3478 34.5951L76.2694 41.5113H80.4999L74.9147 32.3135L80.2147 25.4924H75.7703L72.1339 30.8162C71.7774 31.3866 71.3972 31.957 71.0407 32.5749H70.9694V25.4924H67.3806V41.5113Z" fill="white"/>
        </svg>
      </div>
    )
  }

  render(){
    const {header, showCurrencyMenu, showLangMenu} = this.state;

    let currency = getCurrency();

    return (
      <header className={'header ' + header}>
        <div className={'header-background'}/>
        {
          window.location.pathname!=='/'?
            <NavLink to={'/'}>
              {this.renderLogo()}
            </NavLink>:
            <div onClick={()=>scroll.scrollToTop()}>
              {this.renderLogo()}
            </div>
        }
        <div className={'sections'}>
          {
            SECTIONS.filter(section=>section.is_menu).map(section=>
              <a key={section.id} className={'section'} onClick={()=>this.scrollTo(slugify(section.name))}>
                { section.name }
              </a>
            )
          }
        </div>
        <div className={'right-menu'}>
          {/*<div className={'setting'}>*/}
          {/*Eng*/}
          {/*<span className={`arrow ${showLangMenu?'arrow-up':'arrow-down'} ${header===INHERIT?'arrow-white':'arrow-black'}`}/>*/}
          {/*</div>*/}
          <div className={'setting'} onClick={()=>this.setState({showCurrencyMenu: !showCurrencyMenu})}>
            {currency}
            <span className={`arrow ${showCurrencyMenu?'arrow-up':'arrow-down'} ${header===INHERIT?'arrow-white':'arrow-black'}`}/>
            {
              showCurrencyMenu?
                <div className={`setting-menu ${header===INHERIT?'':'setting-menu-black'}`}>
                  <div>{currency} <span className={`arrow ${showCurrencyMenu?'arrow-up':'arrow-down'} ${header===INHERIT?'arrow-white':'arrow-black'}`}/></div>
                  <div onClick={()=>this.setCurrency('USD')}><span className={`orange-dot ${currency!=='USD'?'hide':''}`} style={{margin: '8px 5px 8px 0'}} />USD</div>
                  <div onClick={()=>this.setCurrency('EUR')}><span className={`orange-dot ${currency!=='EUR'?'hide':''}`} style={{margin: '8px 5px 8px 0'}} />EUR</div>
                  <div onClick={()=>this.setCurrency('BYN')}><span className={`orange-dot ${currency!=='BYN'?'hide':''}`} style={{margin: '8px 5px 8px 0'}} />BYN</div>
                </div>:
                null
            }
          </div>
          {/*<div className={'setting'} style={{height: 22}}>*/}
          {/*<svg width="25" height="22" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
          {/*<path d="M22.2241 2.78218C19.8479 0.405941 16.1035 0.405941 13.7273 2.78218L12.5032 4.0063L11.279 2.78218C8.90279 0.405941 5.15842 0.405941 2.78218 2.78218C0.405941 5.15842 0.405941 8.90279 2.78218 11.279L4.07831 12.5752L12.5032 21H12.5752L22.2961 11.279C24.6004 8.90279 24.6004 5.08641 22.2241 2.78218Z" strokeWidth="1.5" strokeMiterlimit="22.9256" strokeLinejoin="round"/>*/}
          {/*</svg>*/}
          {/*</div>*/}
          <div className={'setting'} style={{height: 28}}>
            <svg width="23" height="25" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.83221 5.72144H20.1678C20.6611 5.72144 21.0134 6.14425 21.0839 6.63754L22 22.9161C22 23.4094 21.5772 23.8322 21.0839 23.8322H1.91611C1.42282 23.8322 1 23.4094 1 22.9161L1.91611 6.63754C1.98658 6.07378 2.33893 5.72144 2.83221 5.72144Z" strokeWidth="1.5" strokeMiterlimit="22.9256"/>
              <path d="M7.5533 7.62415C8.18753 7.62415 8.68081 8.11743 8.68081 8.75166C8.68081 9.38589 8.18753 9.87918 7.5533 9.87918C6.91907 9.87918 6.42578 9.38589 6.42578 8.75166C6.49625 8.11743 6.98954 7.62415 7.5533 7.62415ZM15.4459 7.62415C16.0801 7.62415 16.5734 8.11743 16.5734 8.75166C16.5734 9.38589 16.0801 9.87918 15.4459 9.87918C14.8117 9.87918 14.3184 9.38589 14.3184 8.75166C14.3184 8.11743 14.8117 7.62415 15.4459 7.62415Z" fill="black"/>
              <path d="M15.3061 8.18792V4.80537C15.3061 2.69127 13.6148 1 11.5007 1C9.38659 1 7.69531 2.69127 7.69531 4.80537V8.11745" strokeWidth="1.5" strokeMiterlimit="22.9256"/>
            </svg>
          </div>
        </div>
      </header>
    );
  }
}

export default connect(
  state=>({
    routing: state.routing
  }),
  dispatch=>({
    redirectToHome: (anchor) => {dispatch(push(`/#${slugify(anchor)}`))}
  })
)(Header);