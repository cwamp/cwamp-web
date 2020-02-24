import * as actionTypes from './action-types';
import loadImage from '../utils/image';

const actionCreators = {
  [actionTypes.CTX_CREATED](ctx) {
    return {
      type: actionTypes.CTX_CREATED,
      ctx
    }
  },
  [actionTypes.IMAGE_CHANGED](imageUrl) {
    return (dispatch) => {
      loadImage(imageUrl).then(image => {
        dispatch({
          type: actionTypes.IMAGE_CHANGED,
          imageUrl
        });
        dispatch({
          type: actionTypes.IMAGE_LOADED,
          image
        });
        dispatch({
          type: actionTypes.RENDER,
        });
      }).catch(console.error)
    }
  },
  [actionTypes.TEXTAREA_CHANGED](text) {
    return {
      type: actionTypes.TEXTAREA_CHANGED,
      text
    }
  },
  [actionTypes.COLOR_CHANGED](colorIndex) {
    return {
      type: actionTypes.COLOR_CHANGED,
      colorIndex
    }
  },
  [actionTypes.OPACITY_CHANGED](opacity) {
    return {
      type: actionTypes.OPACITY_CHANGED,
      opacity
    }
  },
  [actionTypes.SHOW_APP_NAME_CHANGED](showAppName) {
    return (dispatch) => {
      dispatch({
        type: actionTypes.SHOW_APP_NAME_CHANGED,
        showAppName
      });
      // dispatch({
      //   type: actionTypes.RENDER,
      // })
    }
  }
};

export default actionCreators;
