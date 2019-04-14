import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-misstep',
  templateUrl: './misstep.component.html',
  styleUrls: ['./misstep.component.css']
})
export class MisstepComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public message: {message: string}) { }

  ngOnInit() {
  }

}
