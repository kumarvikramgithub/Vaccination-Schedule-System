import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
      <div class="bg-light p-3">

        <p class="text-center p-5 mt-5 text-warning display-4">
          <img src="../../assets/images/page-not-founds.jpeg" alt="">
        </p>
      </div>
  `,
  styles: [
  ]
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
