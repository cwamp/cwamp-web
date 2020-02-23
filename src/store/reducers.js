import { fromJS } from 'immutable';
import render from '../utils/canvas';
import {
  CTX_CREATED,
  IMAGE_CHANGED,
  IMAGE_LOADED,
  TEXTAREA_CHANGED,
  COLOR_CHANGED,
  OPACITY_CHANGED,
  SHOW_APP_NAME_CHANGED,
  RENDER
} from './action-types';

const defaultState = fromJS({
  ctx: null,
  imageUrl: '',
  image: null,
  fillText: '',
  color: 'red',
  opacity: 1,
  showAppName: true,
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case CTX_CREATED:
      return state.set('ctx', action.ctx);
    case IMAGE_CHANGED:
      return state.set('imageUrl', action.imageUrl);
    case IMAGE_LOADED:
      return state.set('image', action.image);
    case TEXTAREA_CHANGED:
      return state.set('fillText', action.text);
    case COLOR_CHANGED:
      return state.set('color', action.color);
    case OPACITY_CHANGED:
      return state.set('opacity', action.opacity);
    case SHOW_APP_NAME_CHANGED:
      return state.set('showAppName', action.showAppName);
    case RENDER:
      console.log('rerender')
      render(state);
      return state;
    default:
      return state;
  }
}
