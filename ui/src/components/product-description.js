import React, {Component} from "react";
import {SECTIONS, PRODUCTS} from "../context";
import {getPrice} from "../utils";


export default class ProductDescription extends Component {
  constructor(props){
    super(props);

    this.state = {
      product: PRODUCTS.find(product=>product.id === parseInt(this.props.match.params.id))
    };

    this.sizes = {
      'S': 'small_size',
      'M': 'medium_size',
      'L': 'large_size',
      'XS': 'extra_large_size'
    }
  }

  componentDidMount(){
    document.addEventListener('ChangeCurrency', ()=>this.setState({}));
  }

  changeSize(){

  }

  chooseColor(){

  }

  sizeButton(name){
    return (
      <div onClick={this.changeSize(name)} className={'btn size-btn'} key={name}>{name}</div>
    )
  }

  getProductSize(product){
    return (
      <div className={'size-section'}>
        {
          Object.keys(this.sizes).map(size=>product[this.sizes[size]]?this.sizeButton(size):null)
        }
      </div>
    )
  }

  renderColor(color){
    return (
      <div key={color.color} className={'btn color-btn'} title={color.name} style={{backgroundColor: color.color}} onClick={()=>this.chooseColor(color)}/>
    )
  }

  render(){
    const { product } = this.state;

    console.log(this.state);

    return (
      <div className={'product-container'}>
        <div className={'product-image'}>
          <img src={product.main_image.image} title={product.main_image.name}/>
        </div>

        <div className={'product-description'}>

          <div className={'base-section'}>
            <div>Section</div>
            <div>{product.name}</div>
            <div>{getPrice(product)}</div>
          </div>

          {this.getProductSize(product)}

          <div className={'color-section-container'}>
            <div style={{color: '#807F7F'}}>
              Color:
            </div>
            <div>
              White
            </div>
            <div className={'color-section'}>
              {
                product.colors.map(color=>this.renderColor(color))
              }
            </div>
          </div>

          <div className={'btn add-to-bag'} style={{margin: '20px 0'}}>
            ADD TO MY BAG
          </div>
          <hr/>
          <div>
            DESCRIPTION
          </div>
          <hr/>
          <div>
            ITEM DETAILS
          </div>
          <hr/>
          <div>
            DELIVERY
          </div>
          <hr/>
        </div>
      </div>
    )
  }
}