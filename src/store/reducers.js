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
  canvas: null,
  ctx: null,
  imageUrl: '',
  filename: '',
  filetype: '',
  fileext: '',
  image: null,
  fillText: '',
  colors: [
    {text: '白色', color: '255, 255, 255'},
    {text: '灰色', color: '128, 128, 128'},
    {text: '黑色', color: '0, 0, 0'},
    {text: '红色', color: '255, 0, 0'},
    {text: '橙色', color: '255, 165, 0'},
    {text: '蓝色', color: '0, 0, 255'},
  ],
  colorIndex: 1,
  opacity: 1,
  showAppName: true,
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case CTX_CREATED:
      return state.set('canvas', action.canvas)
        .set('ctx', action.ctx);
    case IMAGE_CHANGED:
      return state.set('imageUrl', action.imageUrl)
        .set('filename', action.filename)
        .set('filetype', action.filetype)
        .set('fileext', action.fileext);
    case IMAGE_LOADED:
      return state.set('image', action.image);
    case TEXTAREA_CHANGED:
      return state.set('fillText', action.text);
    case COLOR_CHANGED:
      return state.set('colorIndex', action.colorIndex);
    case OPACITY_CHANGED:
      return state.set('opacity', action.opacity);
    case SHOW_APP_NAME_CHANGED:
      return state.set('showAppName', action.showAppName);
    case RENDER:
      render(state);
      return state;
    default:
      return state;
  }
}
