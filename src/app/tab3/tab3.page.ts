import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController } from '@ionic/angular';
import { Video } from '../video';
import { VIDEOS } from '../video-db';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  videos: Video[];

  constructor(public nav: NavController) { }

  ngOnInit(): void {
    this.getVideos();
  }

  getVideos(): void {
    this.videos = VIDEOS;
  }

  OpenNavVideoPlay(id: number) {
    this.nav.navigateForward("/videoplay/" + id);
    console.log("teste" + id);
  }
}
