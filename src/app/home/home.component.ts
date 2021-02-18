import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { fabric } from 'fabric';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //@ViewChild('canvas', { static: true })
  //canvas: any;

  img = new Image();
  outputImgSrc: any = undefined;
  imageForm: any = new FormControl();
  formCanvasWidth: any = new FormControl();
  formCanvasHeight: any = new FormControl();
  canvas: any

  constructor() { }

  ngOnInit(): void {
    this.imageForm.value = "http://fabricjs.com/assets/pug_small.jpg";
    this.canvas = new fabric.Canvas('canvas', {
                                    hoverCursor: 'pointer',
                                    selection: true,
                                    selectionBorderColor: 'blue'
                                  }
    );

  };

public loadImageFromUrl() {
    let canvas = this.canvas;
    let url = this.imageForm.value;

    fabric.Image.fromURL(url, (img) => {
      canvas.setDimensions({width:img.width, height:img.height});
      canvas.add(img);
      this.formCanvasWidth.setValue(img.width);
      this.formCanvasHeight.setValue(img.height)
    }, {crossOrigin:'anonymous'})
    return;
  };

  public removeElement() {
    let canvas = this.canvas;
    let activeElement = canvas.getActiveObject();
    canvas.remove(activeElement);
  }

  public addRect() {
    let canvas = this.canvas;
    var rect = new fabric.Rect({
                                left: 1,
                                top: 1,
                                fill: 'yellow',
                                width: 60,
                                height: 40,
    });
    canvas.add(rect);
    return canvas.bringToFront(rect);
  }

  public changeCanvasDims() {
    return this.canvas.setDimensions({
      width:this.formCanvasWidth.value, height:this.formCanvasHeight.value
    });
  };

  public saveAsImg() {
    let outputImgSrc = this.canvas.toDataURL({format: 'png',});
    return this.outputImgSrc = outputImgSrc;
  }

}
