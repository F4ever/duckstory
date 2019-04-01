import React, {Component} from 'react';
import CloseIcon from "../../utils/close-icon";
import ProductProvider from "../../providers/product";
import PropTypes from 'prop-types';
import {connect} from "react-redux";


class AddProductToBagModal extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    closeModal: PropTypes.func.isRequired,

    selectedColor: PropTypes.string,
    selectedSize: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render(){
    const {closeModal} = this.props;

    return (
      <div className={'modal-container'}>
        <div className={'modal'}>
          <div className={'icon'} onClick={closeModal}>
            <CloseIcon/>
          </div>

        </div>
      </div>
    )
  }
}

export default connect(
  state=>({

  }),
  dispatch=>({
    productProvider: new ProductProvider(dispatch)
  })
)(AddProductToBagModal)