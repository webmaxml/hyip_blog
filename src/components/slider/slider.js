import React from 'react';
import Slider from 'react-slick';
import { render } from 'react-dom';

class PrevSliderBtn extends React.Component {
	constructor( props ) {
		super( props );
		this.clickHandle = this.clickHandle.bind( this );
	}

	clickHandle( e ) {
		this.props.movePrev();
	}

	render() {
		return(
			<button className="slider__prev-btn" type="button" onClick={ this.clickHandle }>
				<i className="fa fa-chevron-left slider__btn-icon"></i>
			</button>
		);
	}
}

class NextSliderBtn extends React.Component {
	constructor( props ) {
		super( props );
		this.clickHandle = this.clickHandle.bind( this );
	}

	clickHandle( e ) {
		this.props.moveNext();
	}

	render() {
		return(
			<button className="slider__next-btn" type="button" onClick={ this.clickHandle }>
				<i className="fa fa-chevron-right slider__btn-icon"></i>
			</button>
		);
	}
}

class HyipSliderItem extends React.Component {

	constructor( props ) {
		super( props );
	}

	render() {
		let { href, imgSrc, title, ourDeposit, investorDeposit, insurance } = this.props;

		return(
			<div className="sliderItem">
				<a className="sliderItem__link" href={ href }>
					<img className="sliderItem__img" src={ imgSrc } />
					<div className="sliderItem__popup">
						<h2 className="sliderItem__header">{ title }</h2>
						<ul className="sliderItem__info">
							<li className="sliderItem__info-item">
								<span className="sliderItem__info-title">Ваш вклад</span>
								<span className="sliderItem__info-value sliderItem__info-value--investor"
								>{ `${investorDeposit}$` }</span>
							</li>
							<li className="sliderItem__info-item">
								<span className="sliderItem__info-title">Наш вклад</span>
								<span className="sliderItem__info-value">{ `${ourDeposit}$` }</span>
							</li>
							<li className="sliderItem__info-item">
								<span className="sliderItem__info-title">Страховка</span>
								<span className="sliderItem__info-value">{ `${insurance}$` }</span>
							</li>
						</ul>
					</div>
				</a>
			</div>
		);
	}
}


class HyipSlider extends React.Component {
	constructor( props ) {
		super( props );
		this.movePrev = this.movePrev.bind( this );
		this.moveNext = this.moveNext.bind( this );
	}

	movePrev() {
		this.slider.slickPrev();
	}

	moveNext() {
		this.slider.slickNext();
	}

	render() {
		let settings = {
			dots: false,
			infinite: true,
			arrows: false,
			speed: 500,
			slidesToShow: 4,
			slidesToScroll: 1,
		}

		return (
			<div className="slider__wrap">
				<PrevSliderBtn movePrev={ this.movePrev }/>
				<div className="slider__item-box">
					<Slider { ...settings } ref={ ref => this.slider = ref }>
						<div>
							<HyipSliderItem imgSrc={ require( '../../img/slider_1.jpg' ) }
											title="MEETFREEMAN"
											investorDeposit={ 320 }
											ourDeposit={ 720 }
											insurance={ 1000 }
											href='/'/>
						</div>
						<div>
							<HyipSliderItem imgSrc={ require( '../../img/slider_2.jpg' ) }
											title="BLUE2000"
											investorDeposit={ 320 }
											ourDeposit={ 720 }
											insurance={ 1000 }
											href='/'/>
						</div>
						<div>
							<HyipSliderItem imgSrc={ require( '../../img/slider_3.jpg' ) }
											title="BITCOIN WORLD"
											investorDeposit={ 320 }
											ourDeposit={ 720 }
											insurance={ 1000 }
											href='/'/>
						</div>
						<div>
							<HyipSliderItem imgSrc={ require( '../../img/slider_4.jpg' ) }
											title="MEXEER"
											investorDeposit={ 320 }
											ourDeposit={ 720 }
											insurance={ 1000 }
											href='/'/>
						</div>
					</Slider>
				</div>
				<NextSliderBtn moveNext={ this.moveNext }/>
			</div>
		);
	}
}


render(
	<HyipSlider />,
	document.getElementById( 'slider' )
	);