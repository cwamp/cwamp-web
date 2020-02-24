export default function (state) {
  const ctx = state.get('ctx');
  const image = state.get('image');
  if (!ctx || !image) return;
  const fillText = state.get('fillText') || '此证件仅供办理XX业务使用, 其它用途无效';
  const colors = state.get('colors');
  const colorIndex = state.get('colorIndex');
  const opacity = state.get('opacity');
  const showAppName = state.get('showAppName');

  const { width, height } = image;
  ctx.drawImage(image, 0,0, width, height);

  ctx.font = '20px';
  ctx.fillStyle = `rgba(${colors.get(colorIndex).get('color')}, ${opacity})`;

  if (showAppName) {
    ctx.save();
    const title = '证件水印助手';
    ctx.fillText(title, (width - 70), (height - 20));
    ctx.restore();
  }

  const calHeight = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
  let nums = Math.ceil(calHeight / ctx.measureText(fillText).width);
  let content = '';
  while (nums > 0) {
    if (content !== '') {
      content += '  ';
    }
    content += fillText;
    nums--;
  }

  const lines = Math.floor(calHeight / 50);
  for (let i = 0; i < lines; i++) {
    ctx.save();
    ctx.translate(width / 2, -height / 2);
    ctx.rotate(45 * Math.PI / 180); //选择画布
    ctx.fillText(content, 0, 50 + 50 * i);
    ctx.restore();
  }
}
