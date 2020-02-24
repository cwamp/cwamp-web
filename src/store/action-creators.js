import * as actionTypes from './action-types';
import loadImage from '../utils/image';

const actionCreators = {
  [actionTypes.CTX_CREATED](canvas, ctx) {
    return {
      type: actionTypes.CTX_CREATED,
      canvas,
      ctx
    }
  },
  [actionTypes.IMAGE_CHANGED](imageUrl, filename, filetype, fileext) {
    return (dispatch) => {
      loadImage(imageUrl).then(image => {
        dispatch({
          type: actionTypes.IMAGE_CHANGED,
          imageUrl,
          filename,
          filetype,
          fileext
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
    return (dispatch) => {
      dispatch({
        type: actionTypes.TEXTAREA_CHANGED,
        text
      });
      dispatch({
        type: actionTypes.RENDER,
      })
    }
  },
  [actionTypes.COLOR_CHANGED](colorIndex) {
    return (dispatch) => {
      dispatch({
        type: actionTypes.COLOR_CHANGED,
        colorIndex
      });
      dispatch({
        type: actionTypes.RENDER,
      })
    }
  },
  [actionTypes.OPACITY_CHANGED](opacity) {
    return (dispatch) => {
      dispatch({
        type: actionTypes.OPACITY_CHANGED,
        opacity
      });
      dispatch({
        type: actionTypes.RENDER,
      })
    }
  },
  [actionTypes.SHOW_APP_NAME_CHANGED](showAppName) {
    return (dispatch) => {
      dispatch({
        type: actionTypes.SHOW_APP_NAME_CHANGED,
        showAppName
      });
      dispatch({
        type: actionTypes.RENDER,
      })
    }
  }
};

export default actionCreators;
