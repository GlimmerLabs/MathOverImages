import {valueStyle} from './styles.js';

export default function(
  funBarSaveImGroup,
  state,
  isRenderable,
  enableWorkTool,
  openSavePopUp,
  funBarLayer,
) {
  funBarSaveImGroup.on('mouseup', function(){
    if (state.currShape && isRenderable(state.currShape)) {
      enableWorkTool();
      openSavePopUp();
      funBarSaveImGroup.children[0].setAttr('shadowEnabled', false);
      funBarLayer.draw();
    }
  });

  funBarSaveImGroup.on('mousedown', function(){
    if (state.currShape && isRenderable(state.currShape)) {
      funBarSaveImGroup.children[0].setAttr('shadowEnabled', true);
      funBarLayer.draw();
    }
  });

  funBarSaveImGroup.on('mouseover', function(){
    if (state.currShape && isRenderable(state.currShape)) {
      funBarSaveImGroup.children[0].setAttr('fill', valueStyle.menuColorLight);
      funBarLayer.draw();
    }
  });

  funBarSaveImGroup.on('mouseout', function(){
    if (state.currShape && isRenderable(state.currShape)) {
      funBarSaveImGroup.children[0].setAttrs({
        fill: valueStyle.menuColor,
        shadowEnabled: false
      });
      funBarLayer.draw();
    }
  });
};
