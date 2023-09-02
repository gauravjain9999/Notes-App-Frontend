import { Component, OnInit } from '@angular/core';
import { ThemePalette } from "@angular/material/core";
import { ProgressSpinnerMode } from "@angular/material/progress-spinner";
import { Router } from "@angular/router";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit{
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 10;
  event: any;
  status = 'Loading';
  progressRadius = 180;
  isExpand: any;
  viewModeStatus: any;

  constructor(public router: Router) {
  }


  ngOnInit(): void {
    this.startSpinner();
  }

  startSpinner() {
    this.value = 1;
    const progressTimeBar = 2000;
    const progressBar = setInterval(() => {

      /* istanbul ignore next */
      if (this.value >= 97) {
        clearInterval(progressBar);
        setTimeout(() =>{
          this.spinnerStart();
        },5000);
      }
      else {
        this.spinnerStart();
      }
    }, progressTimeBar);
  }

  spinnerStart(){

    this.status = 'Loading';
    /* istanbul ignore next */
    if(this.value === 97){
      this.value += 3;
    }
    else{
      this.value += 4;
    }
  }
}
