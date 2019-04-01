import React, {Component} from "react";
import {PRODUCTS} from "../context";
import {getPrice, getSectionFromProductId} from "../utils";
import PlusIcon from "../utils/plus-icon";
import MinusIcon from "../utils/minus-icon";
import AddProductToBagModal from "./modals/add-product-to-bag-modal";


export default class ProductDescription extends Component {
  constructor(props){
    super(props);

    this.state = {
      product: PRODUCTS.find(product=>product.id === parseInt(this.props.match.params.id)),
      selectedSize: null,
      selectedColor: null,
      showDescription: false,
      showItemDetails: false,
      showDelivery: false,
      showAddProductToBagModal: false
    };

    this.sizes = {
      'S': 'small_size',
      'M': 'medium_size',
      'L': 'large_size',
      'XS': 'extra_large_size'
    };

    this.changeSize = this.changeSize.bind(this);
    this.chooseColor = this.chooseColor.bind(this);
    this.sizeButton = this.sizeButton.bind(this);
    this.getProductSize = this.getProductSize.bind(this);
    this.renderColor = this.renderColor.bind(this);
    this.addModalProductToBag = this.addModalProductToBag.bind(this);
  }

  componentDidMount(){
    document.addEventListener('ChangeCurrency', ()=>this.setState({}));
  }

  changeSize(size){
    this.setState({selectedSize: size});
  }

  chooseColor(color){
    this.setState({selectedColor: color});
  }

  sizeButton(name){
    const {selectedSize} = this.state;

    return (
      <div onClick={()=>this.changeSize(name)} className={`btn size-btn ${selectedSize===name?'add-to-bag':''}`} key={name}>{name}</div>
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
    const {selectedColor} = this.state;

    return (
      <div className={`color-btn-container ${selectedColor===color.color?'active-color-container':''}`} key={color.color}>
        <div className={`btn color-btn`} title={color.name} style={{backgroundColor: color.color}} onClick={()=>this.chooseColor(color.color)}/>
      </div>
    )
  }

  addModalProductToBag(status){
    this.setState({showAddProductToBagModal: status})
  }

  render(){
    const { product, showDelivery, showDescription, showItemDetails, selectedColor, selectedSize, showAddProductToBagModal } = this.state;

    return (
      <div className={'product-container'}>
        {
          showAddProductToBagModal?<AddProductToBagModal product={product} selectedColor={selectedColor} selectedSize={selectedSize} closeModal={()=>this.addModalProductToBag(false)}/>:null
        }

        <div className={'product-image'}>
          <img src={product.main_image.image} title={product.main_image.name}/>
        </div>

        <div className={'product-description'}>
          <div className={'base-section'}>
            <div>{getSectionFromProductId(product.id).name}</div>
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

          <div className={'btn add-to-bag'} style={{margin: '20px 0'}} onClick={()=>this.addModalProductToBag(true)}>
            ADD TO MY BAG
          </div>
          <hr/>
          <div className={'additional-block'} onClick={()=>this.setState({showDescription: !showDescription})}>
            <div>DESCRIPTION</div>
            <div className={'icon'}>
              {showDescription?<MinusIcon/>:<PlusIcon/>}
            </div>
          </div>
          {
            showDescription?product.description:null
          }
          <hr/>
          <div className={'additional-block'} onClick={()=>this.setState({showItemDetails: !showItemDetails})}>
            <div>ITEM DETAILS</div>
            <div className={'icon'}>
              {showItemDetails?<MinusIcon/>:<PlusIcon/>}
            </div>
          </div>
          {
            showItemDetails?product.item_details:null
          }
          <hr/>
          <div className={'additional-block'} onClick={()=>this.setState({showDelivery: !showDelivery})}>
            <div>DELIVERY</div>
            <div className={'icon'}>
              {showDelivery?<MinusIcon/>:<PlusIcon/>}
            </div>
          </div>
          {
            showDelivery?product.delivery:null
          }
          <hr/>
        </div>
      </div>
    )
  }
}